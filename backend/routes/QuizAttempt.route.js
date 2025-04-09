import express from "express";
import QuizAttempt from "../models/QuizAttempt.model.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Save a quiz attempt
router.post("/attempt", verifyToken, async (req, res) => {
  try {
    const { quizId, score, totalQuestions } = req.body;
    const userId = req.user.userId;

    const attempt = new QuizAttempt({
      user: userId,
      quiz: quizId,
      score,
      totalQuestions,
    });
    await attempt.save();

    res.status(201).json({ success: true, attempt });
  } catch (error) {
    console.error("Quiz attempt error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get user's attempts
router.get("/my-attempts", verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const attempts = await QuizAttempt.find({ user: userId }).sort({
      attemptedAt: -1,
    });
    res.json(attempts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching attempts", error });
  }
});

export default router;
