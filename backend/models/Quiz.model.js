import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    questions: [
        {
            question: { type: String, required: true },
            options: [String],
            correctAnswer: { type: String, required: true }
        }
    ],
    hidden: {
        type: Boolean,
        default: true // If not present, it's hidden
    }
});

const Quiz = mongoose.model("Quiz", QuizSchema);
export default Quiz;
