import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Login from './Login/Login'
import Dashboard from './DashBoard/Dashboard'
import NotFound from './NodeFound/NotFound';
import Home from './Home/Home';
import CreateQuiz from './CreateQuiz/CreateQuiz';
import QuizPage from './QuizPage/QuizPage';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path="/quiz/:id" element={<QuizPage/>} />
        <Route path="/create-quiz" element={<CreateQuiz/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App