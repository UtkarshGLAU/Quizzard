"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./AdminPanel.css"
import Header from "../Header/Header" // Import Header component for consistency

function AdminPanel() {
  const [quizzes, setQuizzes] = useState([])
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    const loadQuizzes = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${import.meta.env.VITE_API_URL}/quizzes/admin`)
        const quizData = await response.json()
        setQuizzes(quizData)
      } catch (err) {
        console.error("Error fetching quizzes for admin panel", err)
      } finally {
        setLoading(false)
      }
    }

    loadQuizzes()
  }, [])

  // Function to toggle quiz visibility
  const handleToggleVisibility = async (quizId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/quizzes/${quizId}/toggle-hidden`, {
        method: "PATCH",
      })

      const data = await response.json()
      const updatedQuizzes = quizzes.map((quiz) => (quiz._id === quizId ? { ...quiz, hidden: !quiz.hidden } : quiz))
      setQuizzes(updatedQuizzes)

      console.log(data.message)
    } catch (err) {
      console.error("Error toggling quiz visibility", err)
    }
  }

  return (
    <>
      <Header />
      <div className="admin-panel-container">
        <h1>Admin Panel</h1>
        <div className={`quiz-list ${loading ? "loading" : ""}`}>
          {!loading &&
            quizzes.map((quiz) => (
              <div key={quiz._id} className="quiz-card" data-hidden={quiz.hidden || false}>
                <h2>{quiz.title}</h2>
                <p>{quiz.description}</p>
                <button className="visibility-button" onClick={() => handleToggleVisibility(quiz._id)}>
                  {quiz.hidden ? "Make Visible" : "Hide"}
                </button>
                <button className="view-quiz-button" onClick={() => navigate(`/quiz/${quiz._id}`)}>
                  View Quiz
                </button>
              </div>
            ))}
        </div>
      </div>
    </>
  )
}

export default AdminPanel
