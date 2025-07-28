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
          <p>
            Quizzard is a web application for creating and participating in quizzes.
            This platform allows users to test their knowledge on various topics and
            track their progress.
          </p>
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
