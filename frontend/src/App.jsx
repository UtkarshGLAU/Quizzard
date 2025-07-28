import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
import Dashboard from "./DashBoard/Dashboard";
import NotFound from "./NodeFound/NotFound";
import Home from "./Home/Home";
import CreateQuiz from "./CreateQuiz/CreateQuiz";
import QuizPage from "./QuizPage/QuizPage";
import PublicRoute from "./Components/PublicRoute";
import ProtectedRoute from "./Components/ProtectedRoute";
import QuizLeaderboard from "./LeaderBoard/LeaderBoard";
import AdminPanel from "./AdminPanel/AdminPanel";
import About from "./About/About";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-quiz"
          element={
            <ProtectedRoute>
              <CreateQuiz />
            </ProtectedRoute>
          }
        />

        <Route path="/quiz/:id" element={<QuizPage />} />
        <Route path="/leaderboard/:quizId" element={<QuizLeaderboard />} />
        <Route path="/about" element={<About />} />
        
        {/* Correct the route for AdminPanel */}
        <Route path="/admin" element={<AdminPanel />} />  

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
