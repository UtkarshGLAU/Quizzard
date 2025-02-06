const mongoose = require('mongoose');
const quizSchema = new mongoose.Schema({
    title: String,
    questions: [
        {
            questionText: String,
            options: [String],
            correctAnswer: String,
        }
    ]
});