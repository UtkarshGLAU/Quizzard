"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import "./AdminPanel.css"
import Header from "../Header/Header" // Import Header component for consistency

function AdminPanel() {
  const [quizzes, setQuizzes] = useState([])
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()
  const { user, loading: authLoading } = useAuth()

  // Check if user is admin
  useEffect(() => {
    if (!authLoading && (!user || !user.isAdmin)) {
      navigate("/", { replace: true });
    }
  }, [user, authLoading, navigate]);

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

    if (user && user.isAdmin) {
      loadQuizzes()
    }
  }, [user])

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

  // Function to delete a quiz
  const handleDeleteQuiz = async (quizId) => {
    if (!window.confirm("Are you sure you want to delete this quiz? This action cannot be undone.")) {
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/quizzes/${quizId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        const updatedQuizzes = quizzes.filter((quiz) => quiz._id !== quizId)
        setQuizzes(updatedQuizzes)
        alert("Quiz deleted successfully!")
      } else {
        alert("Failed to delete quiz")
      }
    } catch (err) {
      console.error("Error deleting quiz", err)
      alert("Error deleting quiz")
    }
  }

  if (authLoading) {
    return (
      <>
        <Header />
        <div className="admin-panel-container">
          <h1>Loading...</h1>
        </div>
      </>
    );
  }

  if (!user || !user.isAdmin) {
    return null;
  }

  return (
    <>
      <Header />
      <div className="admin-panel-container">
        <h1>Admin Panel</h1>
        <div className={`admin-quiz-list ${loading ? "loading" : ""}`}>
          {!loading &&
            quizzes.map((quiz) => (
              <div key={quiz._id} className="admin-card" data-hidden={quiz.hidden || false}>
                <h2>{quiz.title}</h2>
                <p>{quiz.description}</p>
                <div className="admin-button-group">
                  <button className="admin-visibility-button" onClick={() => handleToggleVisibility(quiz._id)}>
                    {quiz.hidden ? "Make Visible" : "Hide"}
                  </button>
                  <button className="admin-view-button" onClick={() => navigate(`/quiz/${quiz._id}`)}>
                    View Quiz
                  </button>
                  <button className="admin-delete-button" onClick={() => handleDeleteQuiz(quiz._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  )
}

export default AdminPanel
