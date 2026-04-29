import React, { useEffect, useState } from "react";
import { fetchQuizzes } from "../api/QuizzesApi";
import { getMyQuizAttempts } from "../api/QuizAttemptApi";
import { useNavigate } from "react-router-dom";
import "./QuizList.css";

function QuizzesList() {
  const [quizzes, setQuizzes] = useState([]);
  const [attempts, setAttempts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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

  // Helper to check if image exists
  const getImageSource = (imageUrl) => {
    return imageUrl && imageUrl.trim() ? imageUrl : null;
  };

  // Filter quizzes based on search term
  const filteredQuizzes = quizzes.filter(
    (quiz) =>
      quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quiz.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="quizzes-container">
      <h1>Choose a Quiz</h1>
      <div className="search-wrapper">
        <input
          type="text"
          className="search-input"
          placeholder="🔍 Search quizzes by name or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {filteredQuizzes.length === 0 ? (
        <div className="no-results">
          {searchTerm ? "No quizzes found matching your search." : "No quizzes available."}
        </div>
      ) : (
        <div className="quizzes-grid">
          {filteredQuizzes.map((quiz) => (
            <div
              key={quiz._id}
              className="quiz-card"
              onClick={() => navigate(`/quiz/${quiz._id}`)}
            >
              <div className="quiz-image-wrapper">
                {getImageSource(quiz.image) ? (
                  <img src={quiz.image} alt={quiz.title} className="quiz-image" />
                ) : (
                  <div className="quiz-image-placeholder">
                    <span>QUIZ</span>
                  </div>
                )}
              </div>
              <div className="quiz-content">
                <h2>{quiz.title}</h2>
                <p className="quiz-description">{quiz.description}</p>
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default QuizzesList;
