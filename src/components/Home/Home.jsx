import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../../slices/counterSlice.tsx";
import {
  setUser,
  updateUsername,
  logoutUser,
} from "../../slices/userSlice.tsx";
const api = process.env.BCK_HOST || "http://localhost:1234";

function Home() {
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const dispatch = useDispatch();
  const count = useSelector((state) => state.count.counter);

  const name = useSelector((state) => state.user.name);
  const email = useSelector((state) => state.user.email);
  const id = useSelector((state) => state.user.id);

  useEffect(() => {
    axios
      .get(`${api}`)
      .then((res) => {
        if (res.data.Status === "User Authenticated!") {
          dispatch(
            setUser({
              name: res.data.user.name,
              email: res.data.user.email,
              id: res.data.user.id,
            })
          );
        } else {
          setAuth(false);
          navigate("/");
        }
      })
      .then((err) => console.log(err));
  }, [auth, navigate, dispatch]);

  const [username, setUsername] = useState("");

  const handleLogout = () => {
    axios
      .get(`${api}/logout`)
      .then((res) => {
        if (res.data.Status === "Logged out!") {
          dispatch(logoutUser());
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateName = (event) => {
    event.preventDefault();
    axios
      .post(`${api}/updatename`, { username })
      .then((res) => {
        if (res.data.Status === "Username Updated!") {
          dispatch(updateUsername(username));
        } else {
          alert(res.data.Error);
        }
      })
      .then((err) => console.log(err));
  };
  const navigateDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="home-main">
      <h1>Home Page</h1>
      <div>
        <h3>
          You are Authorized, {name}, Email: {email}, ID:
          {id}
        </h3>
        <button className="logout" onClick={handleLogout}>
          Logout
        </button>
        Count: {count}{" "}
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
        <form onSubmit={handleUpdateName}>
          <label htmlFor="username">Change Username</label>
          <input
            type="text"
            name="username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
        <button onClick={navigateDashboard}>Dashboard</button>
      </div>
    </div>
  );
}

export default Home;
