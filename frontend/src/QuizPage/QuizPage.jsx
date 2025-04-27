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
  const [shuffleQuestions, setShuffleQuestions] = useState(false); // NEW
  const [userAnswers, setUserAnswers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getQuiz = async () => {
      const data = await fetchQuizById(id);
      setQuiz(data);
    };
    getQuiz();
  }, [id]);

  useEffect(() => {
    let timer;
    if (quizStarted && !quizCompleted) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setQuizCompleted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [quizStarted, quizCompleted]);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    const currentQuestion = quiz.questions[currentQuestionIndex];

    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      {
        question: currentQuestion.question,
        correctAnswer: currentQuestion.correctAnswer,
        selectedAnswer: selectedAnswer,
        isCorrect: selectedAnswer === currentQuestion.correctAnswer,
      },
    ]);

    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex + 1 < quiz.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleStartQuiz = () => {
    if (shuffleQuestions) {
      const shuffled = [...quiz.questions].sort(() => Math.random() - 0.5);
      setQuiz((prev) => ({
        ...prev,
        questions: shuffled,
      }));
    }
    setQuizStarted(true);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

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

  if (!quiz) return <h2>Loading...</h2>;

  return (
    <>
      {quizCompleted ? <Header /> : null}
      <div className="quiz-page">
        {!quizStarted ? (
          <>
            <h1>{quiz.title}</h1>
            <p>{quiz.description}</p>

            <button className="quiz-page-btn" onClick={handleStartQuiz}>
              Start Quiz
            </button>
            {/* Shuffle toggle */}
            <div className="quiz-page-shuffle-toggle">
              <input
                type="checkbox"
                id="shuffle-questions"
                className="toggle-input"
                checked={shuffleQuestions}
                onChange={() => setShuffleQuestions(!shuffleQuestions)}
              />
              <label htmlFor="shuffle-questions" className="toggle-label">
                Shuffle
                <span className="toggle-slider"></span>
              </label>
            </div>
            {/* Timer input */}
            <div className="quiz-page-timer-input">
              <label htmlFor="timer">Set Timer (in seconds):</label>
              <input
                type="number"
                id="timer"
                min="1"
                max="600"
                value={secondsLeft}
                onChange={(e) => setSecondsLeft(e.target.value)}
              />
            </div>
          </>
        ) : (
          <>
            {quizCompleted ? (
              <>
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
                {userAnswers.some((ans) => !ans.isCorrect) && (
                  <div className="quiz-page-wrong-answers">
                    <h3>Review Your Mistakes:</h3>
                    {userAnswers
                      .filter((ans) => !ans.isCorrect)
                      .map((ans, index) => (
                        <div key={index} className="quiz-page-wrong-answer">
                          <p>
                            <strong>Question:</strong> {ans.question}
                          </p>
                          <p>
                            <strong>Your Answer:</strong> {ans.selectedAnswer}
                          </p>
                          <p>
                            <strong>Correct Answer:</strong> {ans.correctAnswer}
                          </p>
                          <hr />
                        </div>
                      ))}
                  </div>
                )}
              </>
            ) : (
              <div className="quiz-page-question-section">
                <div
                  className={`quiz-page-timer ${
                    secondsLeft < 60 ? "quiz-page-timer-warning" : ""
                  }`}
                >
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
