import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Password reset link sent to " + email);
  };

  const handleGoogleLogin = () => {
    alert("Redirecting to Google OAuth");
    // Add Google OAuth login functionality here
  };

  const handleGithubLogin = () => {
    alert("Redirecting to GitHub OAuth");
    // Add GitHub OAuth login functionality here
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-left">
          <h2>Reset Your Password</h2>
        </div>
        <div className="auth-right">
          <h2>Forgot Password</h2>
          <form className="auth-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Registered Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Send Reset Link</button>
          </form>
          <div className="auth-links">
            <p>Remembered? <Link to="/login">Login</Link></p>
          </div>
          <div className="oauth-buttons">
            <button className="oauth-btn google" onClick={handleGoogleLogin}>
              Continue with Google
            </button>
            <button className="oauth-btn github" onClick={handleGithubLogin}>
              Continue with GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
