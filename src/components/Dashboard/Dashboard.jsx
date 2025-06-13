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
      .then((res) => {
        console.log("Response: ", res.data);
        if (res.data.Status === "Supply Updated!") {
          fetchSupplies();
        } else {
          alert(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  const createSupply = () => {
    axios
      .post("http://localhost:1234/supply/create", newSupply)
      .then(() => {
        fetchSupplies();
        setNewSupply({ name: "", count: 0 });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <h2>Supplies</h2>
      <form className="new-supply-form" onSubmit={createSupply}>
        <label htmlFor="supplyName">Supply Name</label>
        <input
          type="text"
          name="supplyName"
          placeholder="Input Supply Name"
          required
          onChange={(e) => setNewSupply({ ...newSupply, name: e.target.value })}
        />
        <label htmlFor="supplyCount">Supply Count</label>
        <input
          type="number"
          name="supplyCount"
          placeholder="Input Supply Count"
          required
          onChange={(e) =>
            setNewSupply({ ...newSupply, count: e.target.value })
          }
        />
        <button type="submit">Create</button>
      </form>
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
