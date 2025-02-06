const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
router.get('/quizzes', async (req, res) => {
    const quizzes = await Quiz.find();
    
    res.json(quizzes);
});
module.exports = router;