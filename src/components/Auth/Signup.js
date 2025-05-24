import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./Auth.css";

const Signup = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState("student");
  const [signedUp, setSignedUp] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleGoogleLogin = () => {
    alert("Redirecting to Google OAuth");
    // Add Google OAuth login functionality here
  };

  const handleGithubLogin = () => {
    alert("Redirecting to GitHub OAuth");
    // Add GitHub OAuth login functionality here
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) {
        setError("Passwords do not match");
        return;
    }
    try {
        const res = await fetch("http://localhost:8080/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                fullName: form.fullName,
                email: form.email,
                password: form.password,
                role,
            }),
        });
        const text = await res.text(); // Get the response text
        console.log("Response Status:", res.status); // Log the response status
        console.log("Response Body:", text); // Log the response body
        if (!res.ok) {
            setError(text); // Set error message from response
            return;
        }
        setSignedUp(true);
    } catch (err) {
        setError("Signup failed. Please try again.");
        console.error("Error:", err); // Log any network errors
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
          <h2>Join Us Today!</h2>
        </div>
        <div className="auth-right">
          <h2>Sign Up</h2>
          {!signedUp ? (
            <form className="auth-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={form.fullName}
                onChange={handleChange}
                required
              />
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
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="admin">Admin</option>
                <option value="recruiter">Recruiter</option>
                <option value="student">Student</option>
              </select>
              {error && <div className="auth-error">{error}</div>}
              <button type="submit">Sign Up</button>
            </form>
          ) : (
            <div className="signup-success">
              <p>
                Signup successful! Please{" "}
                <Link to="/login">Login</Link> to continue.
              </p>
            </div>
          )}
          <div className="auth-links">
            <p>
              Already signed up? <Link to="/login">Login</Link>
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

export default Signup;