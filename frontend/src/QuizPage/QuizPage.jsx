import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchQuizById } from "../api/QuizzesApi";
import "./QuizPage.css";
import Header from "../Header/Header";
import { saveQuizAttempt } from "../api/QuizAttemptApi";

function QuizPage() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(600);
  const navigate = useNavigate();

  useEffect(() => {
    const getQuiz = async () => {
      const data = await fetchQuizById(id);
      setQuiz(data);
    };
    getQuiz();
  }, [id]);

  // Timer countdown
  useEffect(() => {
    let timer;
    if (quizStarted && !quizCompleted) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setQuizCompleted(true); // Auto-submit
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer); // Cleanup on unmount or stop
  }, [quizStarted, quizCompleted]);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === quiz.questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex + 1 < quiz.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
    }
  };

  // Format seconds to mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };
  // Save quiz result to backend
  useEffect(() => {
    const submitQuizAttempt = async () => {
      try {
        if (quizCompleted && quiz) {
          await saveQuizAttempt({
            quizId: quiz._id,
            score: score,
            totalQuestions: quiz.questions.length,
          });
        }
      } catch (error) {
        console.error("Error saving quiz attempt:", error.message);
      }
    };

    submitQuizAttempt();
  }, [quizCompleted]);
  useEffect(() => {
    if (quizCompleted && quiz) {
      saveQuizAttempt({
        quizId: quiz._id,
        score,
        totalQuestions: quiz.questions.length,
      });
    }
  }, [quizCompleted]);

  if (!quiz) return <h2>Loading...</h2>;

  return (
    <>
      {quizCompleted ? <Header /> : null}
      <div className="quiz-page">
        {!quizStarted ? (
          <>
            <h1>{quiz.title}</h1>
            <p>{quiz.description}</p>
            <button
              className="quiz-page-btn"
              onClick={() => setQuizStarted(true)}
            >
              Start Quiz
            </button>
          </>
        ) : (
          <>
            {quizCompleted ? (
              <div className="quiz-page-quiz-results">
                <h2>Quiz Completed!</h2>
                <p>
                  Your Score: {score} / {quiz.questions.length}
                </p>
                <br />
                <button
                  className="quiz-page-btn"
                  onClick={() => navigate("/dashboard")}
                >
                  DashBoard
                </button>
              </div>
            ) : (
              <div className="quiz-page-question-section">
                <div className="quiz-page-timer">
                  ⏳ Time Left: <strong>{formatTime(secondsLeft)}</strong>
                </div>
                <h2>Question {currentQuestionIndex + 1}:</h2>
                <p>{quiz.questions[currentQuestionIndex].question}</p>

                <div className="quiz-page-options">
                  {quiz.questions[currentQuestionIndex].options.map(
                    (option, index) => (
                      <button
                        key={index}
                        className={
                          selectedAnswer === option
                            ? "quiz-page-selected quiz-page-btn"
                            : "quiz-page-btn"
                        }
                        onClick={() => handleAnswerClick(option)}
                      >
                        {option}
                      </button>
                    )
                  )}
                </div>

                <button
                  className="quiz-page-btn"
                  onClick={handleNextQuestion}
                  disabled={selectedAnswer === null}
                >
                  {currentQuestionIndex + 1 === quiz.questions.length
                    ? "Finish Quiz"
                    : "Next"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default QuizPage;
