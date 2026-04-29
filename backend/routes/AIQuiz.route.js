import express from "express";
import { createAIQuiz, generateQuizPreview } from "../controller/AIQuiz.controller.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/ai-quizzes - Create and save an AI-generated quiz (requires authentication)
router.post("/", verifyToken, createAIQuiz);

// POST /api/ai-quizzes/preview - Generate a preview without saving (requires authentication)
router.post("/preview", verifyToken, generateQuizPreview);

export default router;
