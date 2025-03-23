import React, { useState } from "react";
import { createQuiz } from "../api/QuizzesApi";
import { useNavigate } from "react-router-dom";
import "./CreateQuiz.css";

function CreateQuiz() {
    const [quiz, setQuiz] = useState({
        title: "",
        description: "",
        image: "",
        questions: [{ question: "", options: ["", "", "", ""], correctAnswer: "" }],
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setQuiz({ ...quiz, [e.target.name]: e.target.value });
    };

    const handleQuestionChange = (index, field, value) => {
        const updatedQuestions = [...quiz.questions];
        updatedQuestions[index][field] = value;
        setQuiz({ ...quiz, questions: updatedQuestions });
    };

    const addQuestion = () => {
        setQuiz({
            ...quiz,
            questions: [...quiz.questions, { question: "", options: ["", "", "", ""], correctAnswer: "" }],
        });
    };

    const removeQuestion = (index) => {
        const updatedQuestions = quiz.questions.filter((_, i) => i !== index);
        setQuiz({ ...quiz, questions: updatedQuestions });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await createQuiz(quiz);
        if (result) navigate("/");
    };

    return (
        <div className="create-quiz-container">
            <h1>Create a Quiz</h1>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input type="text" name="title" value={quiz.title} onChange={handleChange} required />

                <label>Description:</label>
                <textarea name="description" value={quiz.description} onChange={handleChange}></textarea>

                <label>Image URL:</label>
                <input type="text" name="image" value={quiz.image} onChange={handleChange} />

                <h2>Questions</h2>
                {quiz.questions.map((q, index) => (
                    <div key={index} className="question-block">
                        <label>Question {index + 1}:</label>
                        <input
                            type="text"
                            value={q.question}
                            onChange={(e) => handleQuestionChange(index, "question", e.target.value)}
                            required
                        />

                        <label>Options:</label>
                        {q.options.map((opt, optIndex) => (
                            <input
                                key={optIndex}
                                type="text"
                                value={opt}
                                onChange={(e) => {
                                    const updatedOptions = [...q.options];
                                    updatedOptions[optIndex] = e.target.value;
                                    handleQuestionChange(index, "options", updatedOptions);
                                }}
                                required
                            />
                        ))}

                        <label>Correct Answer:</label>
                        <input
                            type="text"
                            value={q.correctAnswer}
                            onChange={(e) => handleQuestionChange(index, "correctAnswer", e.target.value)}
                            required
                        />

                        <button type="button" onClick={() => removeQuestion(index)}>Remove Question</button>
                    </div>
                ))}

                <button type="button" onClick={addQuestion}>Add Question</button>
                <button type="submit">Create Quiz</button>
            </form>
        </div>
    );
}

export default CreateQuiz;
