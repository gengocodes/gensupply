import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="landingpage-main">
      <h1>Landing Page</h1>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  );
}

export default LandingPage;
