import React, { useEffect, useState } from "react";
import { fetchQuizzes } from "../api/QuizzesApi";
import { useNavigate } from "react-router-dom";
import "./QuizList.css";

function QuizzesList() {
    const [quizzes, setQuizzes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getQuizzes = async () => {
            const data = await fetchQuizzes();
            setQuizzes(data);
        };
        getQuizzes();
    }, []);

    return (
        <div className="quizzes-container">
            <h1>Choose a Quiz</h1>
            <div className="quizzes-grid">
                {quizzes.map((quiz) => (
                    <div key={quiz._id} className="quiz-card" onClick={() => navigate(`/quiz/${quiz._id}`)}>
                        <img src={quiz.image} alt={quiz.title} className="quiz-image" />
                        <h2>{quiz.title}</h2>
                        <p>{quiz.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default QuizzesList;
