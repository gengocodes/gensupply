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
        if (res.data.Status === "User Authenticated!") {
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

  const [username, setUsername] = useState({
    username: "",
  });

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

  const handleUpdateName = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:1234/updatename", username)
      .then((res) => {
        if (res.data.Status === "Username Updated!") {
          console.log(username);
        } else {
          alert(res.data.Error);
        }
      })
      .then((err) => console.log(err));
  };
  return (
    <div className="home-main">
      <h1>Home Page</h1>
      <div>
        <h3>You are Authorized, {name}</h3>
        <button className="logout" onClick={handleLogout}>
          Logout
        </button>
        <form onSubmit={handleUpdateName}>
          <label htmlFor="username">Change Username</label>
          <input
            type="text"
            name="username"
            required
            onChange={(e) =>
              setUsername({ ...username, username: e.target.value })
            }
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Home;
