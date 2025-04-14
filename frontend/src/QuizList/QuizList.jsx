import React, { useEffect, useState } from "react";
import { fetchQuizzes } from "../api/QuizzesApi";
import { getMyQuizAttempts } from "../api/QuizAttemptApi";
import { useNavigate } from "react-router-dom";
import "./QuizList.css";

function QuizzesList() {
  const [quizzes, setQuizzes] = useState([]);
  const [attempts, setAttempts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [quizData, attemptData] = await Promise.all([
          fetchQuizzes(),
          getMyQuizAttempts(),
        ]);
        setQuizzes(quizData);
        setAttempts(attemptData);
      } catch (err) {
        console.error("Failed to load quizzes or attempts", err);
      }
    };
    loadData();
  }, []);

  // Helper to find score for a quiz
  const getQuizScore = (quizId) => {
    const attempt = attempts.find((a) => String(a.quiz) === String(quizId));
    return attempt ? `${attempt.score} / ${attempt.totalQuestions}` : null;
  };

  return (
    <div className="quizzes-container">
      <h1>Choose a Quiz</h1>
      <div className="quizzes-grid">
        {quizzes.map((quiz) => (
          <div
            key={quiz._id}
            className="quiz-card"
            onClick={() => navigate(`/quiz/${quiz._id}`)}
          >
            <img src={quiz.image} alt={quiz.title} className="quiz-image" />
            <h2>{quiz.title}</h2>
            <p>{quiz.description}</p>
            {getQuizScore(quiz._id) && (
              <p className="quiz-score">Your Score: {getQuizScore(quiz._id)}</p>
            )}

            <button
              className="leaderboard-button"
              onClick={(e) => {
                e.stopPropagation(); 
                navigate(`/leaderboard/${quiz._id}`);
              }}
            >
              View Leaderboard
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuizzesList;
