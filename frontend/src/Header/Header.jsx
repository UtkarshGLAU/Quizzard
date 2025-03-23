import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css"; // Import the CSS file

function Header() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu toggle

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-logo" onClick={() => navigate("/")}>
          Quizzard
        </h1>

        <nav className="header-nav-links">
          <button onClick={() => navigate("/about")}>About</button>
          <button onClick={() => navigate("/contact")}>Contact</button>
        </nav>

        <button className="header-login-btn" onClick={() => navigate("/login")}>
          Login
        </button>

        <button className="header-menu-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {isOpen && (
        <nav className="header-mobile-menu">
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => navigate("/about")}>About</button>
          <button onClick={() => navigate("/contact")}>Contact</button>
          <button className="header-login-btn" onClick={() => navigate("/login")}>
            Login
          </button>
        </nav>
      )}
    </header>
  );
}

export default Header;
