import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="login-main">
      <h1 className="login-title">Login</h1>
      <form className="login-form">
        <div className="login-input-box">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            name="email"
            className="login-input"
            required
          />
        </div>
        <div className="login-input-box">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            className="login-input"
            required
          />
          <button type="submit" className="login-submit">
            Log In
          </button>
          <Link to="/register">
            <button className="login-signup">Sign Up</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
