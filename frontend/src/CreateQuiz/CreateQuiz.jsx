import React, { useState } from "react";
import { createQuiz } from "../api/QuizzesApi";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import "./CreateQuiz.css";

function CreateQuiz() {
    const [quiz, setQuiz] = useState({
        title: "",
        description: "",
        image: "",
        questions: [{ question: "", options: ["", "", "", ""], correctAnswer: "" }],
    });

    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
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
        setError("");
        setSuccess(false);
        setIsSubmitting(true);
        
        const result = await createQuiz(quiz);
        setIsSubmitting(false);
        
        if (result?.success) {
            setSuccess(true);
            setTimeout(() => navigate("/dashboard"), 2000);
        } else {
            setError(result?.message || "Failed to create quiz. Please try again.");
        }
    };

    const handleReset = () => {
        setQuiz({
            title: "",
            description: "",
            image: "",
            questions: [{ question: "", options: ["", "", "", ""], correctAnswer: "" }],
        });
        setError("");
        setSuccess(false);
    };

    return (
        <>
            <Header />
            <div className="create-quiz-page">
                <div className="create-quiz-container">
                    <div className="quiz-header">
                        <h1>📝 Create a Quiz</h1>
                        <button 
                            type="button"
                            className="btn-dashboard" 
                            onClick={() => navigate("/dashboard")}
                            title="Go to Dashboard"
                        >
                            📊 Dashboard
                        </button>
                    </div>
                    <p className="quiz-subtitle">Build your own custom quiz with multiple questions</p>
                    
                    {error && (
                        <div className="error-message">
                            <p>{error}</p>
                            <button type="button" onClick={() => setError("")}>×</button>
                        </div>
                    )}

                    {success && (
                        <div className="success-message">
                            <p>✅ Quiz created successfully! Redirecting to dashboard...</p>
                        </div>
                    )}
                    
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

                <div className="quiz-actions">
                    <button type="button" onClick={addQuestion} className="btn-secondary">
                        + Add Question
                    </button>
                </div>

                <div className="form-actions">
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="btn-primary"
                    >
                        {isSubmitting ? "Creating..." : "Create Quiz"}
                    </button>
                    <button 
                        type="button" 
                        onClick={handleReset}
                        disabled={isSubmitting}
                        className="btn-secondary"
                    >
                        Reset Form
                    </button>
                </div>
            </form>
                </div>
            </div>
        </>
    );
}

export default CreateQuiz;
