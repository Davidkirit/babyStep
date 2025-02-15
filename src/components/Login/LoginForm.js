import React, { useState } from "react";
import "./LoginForm.css";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formFields.email,
          password: formFields.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);
        navigate("/convert");
      } else {
        alert("Login failed: " + data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Sign In</h2>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formFields.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formFields.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
        <p className="register-link">
          Don't have an account? <Link to="/">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
