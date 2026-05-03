import React, { useState, useContext } from "react";
import { authAPI } from "../utils/api";
import { ChatContext } from "../context/ChatContext";
import "./Auth.css";

export const Register = ({ onSwitchToLogin, onAuthSuccess, addToast }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setUser } = useContext(ChatContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate password
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      addToast("Password must be at least 6 characters", "error", 3000);
      setLoading(false);
      return;
    }

    try {
      const response = await authAPI.register(formData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setUser(response.data.user);
      addToast("Account created successfully! Welcome! 🎉", "success", 2000);
      setTimeout(() => onAuthSuccess(), 500);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Registration failed";
      setError(errorMsg);
      addToast(errorMsg, "error", 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container glass-light">
      <div className="auth-content">
        <div className="auth-header">
          <h1>Create Account</h1>
          <p>Join our chat community</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
              disabled={loading}
              minLength="3"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password (min 6 chars)"
              required
              disabled={loading}
              minLength="6"
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? <span className="spinner"></span> : null}
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="link-btn"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
