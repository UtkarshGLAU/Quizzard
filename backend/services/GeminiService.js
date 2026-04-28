import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateQuizWithGemini = async (topic, questionCount, difficulty) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not set in environment variables");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `You are a quiz generator. Create a quiz with exactly ${questionCount} questions on the topic "${topic}" with difficulty level "${difficulty}".

Return ONLY a valid JSON object with this exact structure (no markdown, no extra text):
{
  "title": "Quiz title based on the topic",
  "description": "A brief description of the quiz",
  "questions": [
    {
      "question": "Question text here?",
      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
      "correctAnswer": "The correct option text"
    }
  ]
}

Requirements:
- Each question must have exactly 4 options
- The correctAnswer must be one of the options
- Difficulty can be: beginner, intermediate, advanced
- Return ONLY the JSON, no other text`;

    let result;
    try {
      result = await model.generateContent(prompt);
    } catch (apiError) {
      console.error("Gemini API Error:", apiError);
      throw new Error(`Gemini API failed: ${apiError.message}`);
    }

    if (!result || !result.response) {
      throw new Error("Invalid response from Gemini API");
    }

    const responseText = result.response.text().trim();

    if (!responseText) {
      throw new Error("Empty response from Gemini API");
    }

    // Clean up response if it has markdown code blocks
    let jsonStr = responseText;
    if (jsonStr.includes("```json")) {
      jsonStr = jsonStr.split("```json")[1].split("```")[0].trim();
    } else if (jsonStr.includes("```")) {
      jsonStr = jsonStr.split("```")[1].split("```")[0].trim();
    }

    let quizData;
    try {
      quizData = JSON.parse(jsonStr);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      console.error("Response text:", responseText);
      throw new Error(`Failed to parse Gemini response as JSON: ${parseError.message}`);
    }

    // Validate the structure
    if (
      !quizData.title ||
      !quizData.description ||
      !Array.isArray(quizData.questions)
    ) {
      throw new Error("Invalid quiz structure from Gemini");
    }

    // Validate questions
    for (const q of quizData.questions) {
      if (
        !q.question ||
        !Array.isArray(q.options) ||
        q.options.length !== 4 ||
        !q.correctAnswer
      ) {
        throw new Error("Invalid question structure from Gemini");
      }
      
      // Ensure correctAnswer is one of the options
      if (!q.options.includes(q.correctAnswer)) {
        throw new Error(`Correct answer "${q.correctAnswer}" is not in the options`);
      }
    }

    return quizData;
  } catch (error) {
    console.error("Error generating quiz with Gemini:", error.message);
    throw error;
  }
};
