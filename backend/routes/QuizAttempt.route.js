import express from "express";
import QuizAttempt from "../models/QuizAttempt.model.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import User from "../models/User.model.js";
import mongoose from "mongoose";

const router = express.Router();

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
    res.status(500).json({ success: false, message: error.message });
  }
});

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

router.get("/leaderboard/:quizId", async (req, res) => {
  const { quizId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(quizId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid quiz ID format." });
    }

    const leaderboard = await QuizAttempt.aggregate([
      { $match: { quiz: new mongoose.Types.ObjectId(quizId) } },
      { $sort: { score: -1 } },
      {
        $group: {
          _id: "$user",
          maxScore: { $max: "$score" },
        },
      },
      { $sort: { maxScore: -1 } },
      { $limit: 10 },
    ]);

    const populatedLeaderboard = await Promise.all(
      leaderboard.map(async (entry) => {
        const user = await User.findById(entry._id).select("name");
        return {
          username: user ? user.name : "Unknown",
          score: entry.maxScore,
        };
      })
    );

    if (populatedLeaderboard.length === 0) {
      return res
        .status(200)
        .json({ success: false, message: "No leaderboard data available." });
    }

    res.status(200).json(populatedLeaderboard);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
