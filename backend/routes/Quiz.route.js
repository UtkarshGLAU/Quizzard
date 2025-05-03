import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Quiz from "../models/Quiz.model.js";

dotenv.config();
const router = express.Router();

// Parse allowed IDs from environment and convert to ObjectIds

router.get("/", async (req, res) => {
  try {
    const quizzes = await Quiz.find({ hidden: false });
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: "Error fetching quizzes" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const quiz = await Quiz.findById(id);

    if (!quiz) return res.status(404).json({ message: "Quiz not found" });
    if (quiz.hidden === true || quiz.hidden === undefined) {
      return res
        .status(403)
        .json({ message: "Access to this quiz is not allowed" });
    }

    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: "Error fetching quiz" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, description, image, questions, hidden } = req.body;

    if (!title || !questions || !questions.length) {
      return res
        .status(400)
        .json({ message: "Title and questions are required" });
    }

    const newQuiz = new Quiz({ title, description, image, questions, hidden });
    await newQuiz.save();

    res
      .status(201)
      .json({ message: "Quiz created successfully", quiz: newQuiz });
  } catch (error) {
    res.status(500).json({ error: "Error creating quiz" });
  }
});

export default router;
