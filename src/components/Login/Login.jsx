import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const api = process.env.REACT_APP_API_URL || "http://localhost:1234";

function Login() {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${api}`, values)
      .then((res) => {
        if (res.data.Status === "User Authenticated!") {
          navigate("/home");
        } else {
          alert(res.data.Error);
        }
      })
      .then((err) => console.log(err));
  };
  return (
    <div className="login-main">
      <h1 className="login-title">Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-input-box">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            name="email"
            className="login-input"
            required
            onChange={(e) => setValues({ ...values, email: e.target.value })}
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
            onChange={(e) => setValues({ ...values, password: e.target.value })}
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
