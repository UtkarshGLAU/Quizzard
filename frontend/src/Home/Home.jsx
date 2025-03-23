import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';
import Header from '../Header/Header';

function Home() {
    const navigate = useNavigate();
    
    return (
        <div className="home-container">
            <Header/>
            <div className="content">
                <h1 className="title">Welcome to Quizzard</h1>
                <p className="subtitle">The Ultimate Quiz Experience</p>
                <button className="login-button" onClick={() => navigate('/login')}>Get Started</button>
            </div>
        </div>
    );
}

export default Home;
