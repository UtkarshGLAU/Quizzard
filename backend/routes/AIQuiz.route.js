import express from "express";
import { createAIQuiz, generateQuizPreview } from "../controller/AIQuiz.controller.js";

const router = express.Router();

// POST /api/ai-quizzes - Create and save an AI-generated quiz
router.post("/", createAIQuiz);

// POST /api/ai-quizzes/preview - Generate a preview without saving
router.post("/preview", generateQuizPreview);

export default router;
