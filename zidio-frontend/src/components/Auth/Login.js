import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./Auth.css";

const Login = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState("student");
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleGoogleLogin = () => {
    alert("Redirecting to Google OAuth");
  };

  const handleGithubLogin = () => {
    alert("Redirecting to GitHub OAuth");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      if (!res.ok) {
        const text = await res.text();
        setError(text);
        return;
      }
      const userData = await res.json();
      login(userData);
      if (userData.role === "admin") navigate("/admin-dashboard");
      else if (userData.role === "recruiter") navigate("/recruiter-dashboard");
      else navigate("/student-dashboard");
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  if (user) {
    return (
      <div className="auth-container">
        <div className="user-icon">{user.role.toUpperCase()}</div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-left">
          <h2>Welcome Back!</h2>
        </div>
        <div className="auth-right">
          <h2>Login</h2>
          <form className="auth-form" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="admin">Admin</option>
              <option value="recruiter">Recruiter</option>
              <option value="student">Student</option>
            </select>
            {error && <div className="auth-error">{error}</div>}
            <button type="submit">Login</button>
          </form>
          <div className="auth-links">
            <p>
              Not yet registered? <Link to="/signup">Sign Up</Link>
            </p>
            <p>
              <Link to="/forgot-password">Forgot Password?</Link>
            </p>
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

export default Login;