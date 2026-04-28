import Quiz from "../models/Quiz.model.js";
import { generateQuizWithGemini } from "../services/GeminiService.js";

export const createAIQuiz = async (req, res) => {
  try {
    const { topic, questionCount, difficulty, title, description, image } =
      req.body;

    // Validate input
    if (!topic || !questionCount || !difficulty) {
      return res.status(400).json({
        success: false,
        message: "Topic, question count, and difficulty are required",
      });
    }

    if (questionCount < 1 || questionCount > 20) {
      return res.status(400).json({
        success: false,
        message: "Question count must be between 1 and 20",
      });
    }

    if (!["beginner", "intermediate", "advanced"].includes(difficulty)) {
      return res.status(400).json({
        success: false,
        message: "Difficulty must be beginner, intermediate, or advanced",
      });
    }

    // Generate quiz using Gemini
    const quizData = await generateQuizWithGemini(topic, questionCount, difficulty);

    // Override title/description if provided by user
    if (title) quizData.title = title;
    if (description) quizData.description = description;
    if (image) quizData.image = image;

    // Set hidden to false by default for AI quizzes (make them public)
    quizData.hidden = false;

    // Save quiz to database
    const newQuiz = new Quiz(quizData);
    await newQuiz.save();

    res.status(201).json({
      success: true,
      message: "AI quiz created successfully",
      quiz: newQuiz,
    });
  } catch (error) {
    console.error("Error creating AI quiz:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Error creating quiz",
    });
  }
};

export const generateQuizPreview = async (req, res) => {
  try {
    const { topic, questionCount, difficulty } = req.body;

    // Validate input
    if (!topic || !questionCount || !difficulty) {
      return res.status(400).json({
        success: false,
        message: "Topic, question count, and difficulty are required",
      });
    }

    // Generate quiz using Gemini (without saving to DB)
    const quizData = await generateQuizWithGemini(topic, questionCount, difficulty);

    res.status(200).json({
      success: true,
      preview: quizData,
    });
  } catch (error) {
    console.error("Error generating quiz preview:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Error generating preview",
    });
  }
};
