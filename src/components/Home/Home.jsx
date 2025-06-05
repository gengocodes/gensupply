import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:1234")
      .then((res) => {
        if (res.data.Status === "Correct Password!") {
          setAuth(true);
          setName(res.data.name);
        } else {
          setAuth(false);
          setMessage(res.data.Error);
          navigate("/");
        }
      })
      .then((err) => console.log(err));
  }, [auth, message, navigate]);

  const handleLogout = () => {
    axios
      .get("http://localhost:1234/logout")
      .then((res) => {
        if (res.data.Status === "Logged out!") {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="home-main">
      <div>
        <h3>You are Authorized, {name}</h3>
        <button className="logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Home;
