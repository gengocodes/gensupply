import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const api = process.env.REACT_APP_BACK_HOST || "http://localhost:10000";

function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${api}/register`, values)
      .then((res) => {
        if (res.data.Status === "Registration Success!") {
          navigate("/login");
        } else if (res.data.Error) {
          alert(res.data.Error);
        } else {
          alert("Something went wrong with the request.");
        }
      })
      .then((err) => console.log(err));
  };
  return (
    <div className="register-main">
      <h1 className="regis-title">Register</h1>
      <form className="regis-form" onSubmit={handleSubmit}>
        <div className="regis-input-box">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Enter Name"
            name="name"
            className="regis-input"
            required
            onChange={(e) => setValues({ ...values, name: e.target.value })}
          />
        </div>
        <div className="regis-input-box">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            name="email"
            className="regis-input"
            required
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />
        </div>
        <div className="regis-input-box">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            className="regis-input"
            required
            onChange={(e) => setValues({ ...values, password: e.target.value })}
          />
          <button type="submit" className="regis-submit">
            Sign Up
          </button>
          <Link to="/login">
            <button className="register-login">Log In</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
