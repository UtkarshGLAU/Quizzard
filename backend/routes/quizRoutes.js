const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
router.get('/quizzes', async (req, res) => {
    // const quizzes = await Quiz.find();
    const mockQuizzes = [
        { title: "Quizzerd 1" },
        { title: "Quizzerd 2" },
        { title: "Quizzerd 3" }
    ];

    res.json(mockQuizzes);
});
module.exports = router;