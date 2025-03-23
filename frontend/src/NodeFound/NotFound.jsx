import React from 'react';
import { useNavigate } from 'react-router-dom';
import './notfound.css';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <h1 className="notfound-title">404</h1>
      <p className="notfound-text">Oops! The page you are looking for does not exist.</p>
      <button className="notfound-button" onClick={() => navigate('/')}>
        Go Home
      </button>
      <div className="notfound-animation">
        <div className="ghost-1"></div>
      </div>
      <div className="notfound-animation">
        <div className="ghost-2"></div>
      </div>
    </div>
  );
}

export default NotFound;
