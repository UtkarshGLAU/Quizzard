import express from "express";
import Quiz from "../models/Quiz.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ error: "Error fetching quizzes" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) return res.status(404).json({ message: "Quiz not found" });
        res.json(quiz);
    } catch (error) {
        res.status(500).json({ error: "Error fetching quiz" });
    }
});
router.post("/", async (req, res) => {
    try {
        const { title, description, image, questions } = req.body;
        
        if (!title || !questions.length) {
            return res.status(400).json({ message: "Title and questions are required" });
        }

        const newQuiz = new Quiz({ title, description, image, questions });
        await newQuiz.save();
        
        res.status(201).json({ message: "Quiz created successfully", quiz: newQuiz });
    } catch (error) {
        res.status(500).json({ error: "Error creating quiz" });
    }
});

export default router;
