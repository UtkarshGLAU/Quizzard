import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { useAuth } from "../context/AuthContext";

function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleAuthAction = () => {
    if (user) {
      logout();
      navigate("/");
    } else {
      navigate("/login");
    }
    setIsOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-logo" onClick={() => handleNavigate("/")}>
          Quizzard
        </h1>

        <nav className="header-nav-links">
          <button onClick={() => handleNavigate("/about")}>About</button>
          <button onClick={() => handleNavigate("/contact")}>Contact</button>
        </nav>

        {user ? (
          <button className="header-logout-btn" onClick={handleAuthAction}>
            Logout
          </button>
        ) : (
          <button className="header-login-btn" onClick={handleAuthAction}>
            Login
          </button>
        )}

        <button className="header-menu-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      <nav className={`header-mobile-menu ${isOpen ? "open" : ""}`}>
        <button onClick={() => handleNavigate("/about")}>About</button>
        <button onClick={() => handleNavigate("/contact")}>Contact</button>
        <button
          className={`${user ? "header-logout-btn" : "header-login-btn"} mobile-only`}
          onClick={handleAuthAction}
        >
          {user ? "Logout" : "Login"}
        </button>
      </nav>
    </header>
  );
}

export default Header;
