import React from 'react';
import './Contact.css';
import Header from '../Header/Header';

const Contact = () => {
  return (
    <div className="contact-container">
      <Header />
      <div className="contact-content">
        <h1>Get In Touch</h1>
        
        <div className="contact-card">
          <div className="profile-section">
            <div className="profile-avatar">U</div>
            <div className="profile-info">
              <h2>Utkarsh Sharma</h2>
              <p className="profile-title">Full Stack Developer</p>
            </div>
          </div>

          <div className="contact-links">
            <p className="contact-intro">
              Feel free to reach out to me through any of these platforms:
            </p>

            <div className="links-grid">
              <a href="https://github.com/UtkarshGLAU" target="_blank" rel="noopener noreferrer" className="contact-link github-link">
                <span className="icon">🐙</span>
                <span className="label">GitHub</span>
                <span className="placeholder">UtkarshGLAU</span>
              </a>

              <a href="https://www.linkedin.com/in/utkarsh-sharma-8395a0315/" target="_blank" rel="noopener noreferrer" className="contact-link linkedin-link">
                <span className="icon">💼</span>
                <span className="label">LinkedIn</span>
                <span className="placeholder">Utkarsh Sharma</span>
              </a>

              <div className="contact-link personal-portfolio">
                <span className="icon">🌐</span>
                <span className="label">Personal Portfolio</span>
                <span className="placeholder">(Coming Soon!)</span>
              </div>
            </div>
          </div>

          <div className="contact-message">
            <p>
              I'm always interested in connecting with fellow developers, tech enthusiasts, and anyone interested in learning!
              Feel free to reach out for collaboration, feedback, or just a friendly chat.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
