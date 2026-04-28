import React from 'react';
import './About.css';
import Header from '../Header/Header';

const About = () => {
  return (
    <div className="about-container">
      <Header />
      <div className="about-content">
        <h1>About Quizzard</h1>
        <div className="about-section">
          <h2>Features</h2>
          <ul className="features-list">
            <li><strong>User Authentication:</strong> Secure signup and login functionality</li>
            <li><strong>Quiz Creation:</strong> Create custom quizzes with multiple question types</li>
            <li><strong>AI Quiz Generator:</strong> Generate quizzes instantly using Gemini AI - just specify a topic, question count, and difficulty level</li>
            <li><strong>Quiz Participation:</strong> Take quizzes created by others</li>
            <li><strong>Progress Tracking:</strong> Monitor performance and view scores</li>
            <li><strong>Leaderboards:</strong> See where you stand compared to others</li>
            <li><strong>Admin Panel:</strong> Manage quizzes and users (admin access only)</li>
          </ul>
        </div>

        <div className="about-section">
          <h2>Project Information</h2>
          <p>
            Quizzard is a personal project developed by Utkarsh Sharma. 
            You can find the source code on <a href="https://github.com/UtkarshGLAU/Quizzard" target="_blank" rel="noopener noreferrer">GitHub</a>.
          </p>
        </div>

        <div className="about-section">
          <h2>Technologies Used</h2>
          <div className="tech-stack">
            <div className="tech-category">
              <h3>Frontend</h3>
              <ul>
                <li>React.js</li>
                <li>Vite</li>
                <li>React Router</li>
                <li>CSS3</li>
              </ul>
            </div>
            <div className="tech-category">
              <h3>Backend</h3>
              <ul>
                <li>Node.js</li>
                <li>Express.js</li>
                <li>MongoDB</li>
                <li>JWT Authentication</li>
              </ul>
            </div>
            <div className="tech-category">
              <h3>Tools & Services</h3>
              <ul>
                <li>Git & GitHub</li>
                <li>Vercel (FrontEnd-Deployment)</li>
                <li>Render (BackEnd-Deployment)</li>
                <li>MongoDB Atlas</li>
              </ul>
            </div>
            <div className="tech-category">
              <h3>AI & ML</h3>
              <ul>
                <li>Google Gemini 2.5 Flash API</li>
                <li>Natural Language Processing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <footer className="about-footer">
        <p>&copy; {new Date().getFullYear()} Quizzard. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default About;
