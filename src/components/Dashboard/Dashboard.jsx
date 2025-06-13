import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../slices/userSlice.tsx";

function Dashboard() {
  const [auth, setAuth] = useState(false);
  const [supplies, setSupplies] = useState([]);
  const [newSupply, setNewSupply] = useState({ name: "", count: 0 });
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navHome = () => {
    navigate("/home");
  };

  useEffect(() => {
    axios
      .get("http://localhost:1234")
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

  useEffect(() => {
    fetchSupplies();
  }, []);

  const fetchSupplies = () => {
    axios
      .get("http://localhost:1234/supply")
      .then((res) => setSupplies(res.data))
      .catch((err) => console.log(err));
  };

  const handleUpdate = (id, updatedSupply) => {
    axios
      .put(`http://localhost:1234/supply/update/${id}`, updatedSupply)
      .then(() => fetchSupplies(), console.log(id, updatedSupply))
      .catch((err) => console.log(err));
  };

  const inputRef = useRef();
  const handleSubmit = () => {
    const inputValue = inputRef.current.value;
    setNewSupply({ name: inputValue });
  };
  return (
    <div>
      <h2>Supplies</h2>
      <input ref={inputRef} />
      <button onClick={handleSubmit}>Submit</button>
      {newSupply.name}
      {supplies.map((supply) => (
        <div key={supply.id}>
          <p>
            {supply.name}(id {supply.id})(Count: {supply.count})
          </p>
          <button
            onClick={() =>
              handleUpdate(supply.id, {
                name: prompt("New name:", supply.name),
                count: parseInt(prompt("New count:", supply.count)),
              })
            }
          >
            Edit
          </button>
        </div>
      ))}
      <button onClick={navHome}>Home</button>
    </div>
  );
}

export default Dashboard;
