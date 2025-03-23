import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchQuizById } from "../api/quizzesApi";
import "./QuizPage.css";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";

function QuizPage() {
    const { id } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [quizStarted, setQuizStarted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getQuiz = async () => {
            const data = await fetchQuizById(id);
            setQuiz(data);
        };
        getQuiz();
    }, [id]);

    if (!quiz) return <h2>Loading...</h2>;

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

    return (
        <>


            {quizCompleted ? <Header /> : <></>}
            <div className="quiz-page">
                {!quizStarted ? (
                    <>
                        <h1>{quiz.title}</h1>
                        <p>{quiz.description}</p>
                        <button className="quiz-page-btn" onClick={() => setQuizStarted(true)}>Start Quiz</button>
                    </>
                ) : (
                    <>
                        {quizCompleted ? (
                            <div className="quiz-page-quiz-results">
                                <h2>Quiz Completed!</h2>
                                <p>Your Score: {score} / {quiz.questions.length}</p>
                                <br />
                                <button className="quiz-page-btn" onClick={()=>navigate('/dashboard')}>DashBoard</button>
                            </div>
                        ) : (
                            <div className="quiz-page-question-section">
                                <h2>Question {currentQuestionIndex + 1}:</h2>
                                <p>{quiz.questions[currentQuestionIndex].question}</p>

                                <div className="quiz-page-options">
                                    {quiz.questions[currentQuestionIndex].options.map((option, index) => (
                                        <button
                                            key={index}
                                            className={selectedAnswer === option ? "quiz-page-selected quiz-page-btn" : "quiz-page-btn"} 
                                            onClick={() => handleAnswerClick(option)}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    className="quiz-page-btn"
                                    onClick={handleNextQuestion}
                                    disabled={selectedAnswer === null}
                                >
                                    {currentQuestionIndex + 1 === quiz.questions.length ? "Finish Quiz" : "Next"}
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
