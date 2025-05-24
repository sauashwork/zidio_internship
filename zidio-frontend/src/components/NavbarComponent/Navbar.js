import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";
import "./Navbar.css";

const NavbarComponent = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="navbar-component">
      <nav className="navbar">
        <div className="navbar-brand">
          <a href="/">Zidio Development</a>
        </div>
        <ul className="navbar-links">
          <li><a href="/">Home</a></li>
          <li><a href="/#job-match-section">Jobs</a></li>
          <li><a href="/#testimonial-section">Blog</a></li>
          <li><a href="/#newsletter-section">Contact Us</a></li>
        </ul>
        <div className="navbar-actions">
          {user ? (
            <div className="user-info" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                className="user-icon"
                style={{ cursor: "pointer", fontSize: "1.5rem" }}
                onClick={() => navigate("/dashboard")}
                title="Open Dashboard"
              >
                {user.photo ? (
                  <img
                    src={user.photo}
                    alt="Profile"
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      verticalAlign: "middle"
                    }}
                  />
                ) : (
                  "👤"
                )}
              </span>
              <span>
                {user.fullName ? user.fullName : user.role.toUpperCase()}
              </span>
              <button
                className="btn logout-btn"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <button className="btn login-btn" onClick={handleLogin}>Login</button>
              <button className="btn signup-btn" onClick={handleSignup}>Sign Up</button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavbarComponent;
