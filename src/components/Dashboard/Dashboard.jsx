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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState({
    id: null,
    name: "",
    count: 0,
  });

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

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:1234/supply/delete/${id}`)
      .then((res) => {
        if (res.data.Status === "Supply Deleted!") {
          fetchSupplies();
        } else {
          alert(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };
  const handleUpdate = () => {
    axios
      .put(`http://localhost:1234/supply/update/${currentEdit.id}`, {
        name: currentEdit.name,
        count: currentEdit.count,
      })
      .then((res) => {
        if (res.data.Status === "Supply Updated!") {
          fetchSupplies();
          setIsModalOpen(false);
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

  const openEditModal = (supply) => {
    setCurrentEdit(supply);
    setIsModalOpen(true);
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
          <button onClick={() => handleDelete(supply.id)}>Delete</button>
          <button onClick={() => openEditModal(supply)}>Edit</button>
        </div>
      ))}
      {isModalOpen && (
        <div className="edit-modal-cont">
          <div className="edit-modal">
            <h3>Edit Supply</h3>
            <label>Name</label>
            <input
              type="text"
              value={currentEdit.name}
              onChange={(e) =>
                setCurrentEdit({ ...currentEdit, name: e.target.value })
              }
              required
            />
            <label>Count</label>
            <input
              type="number"
              value={currentEdit.count}
              onChange={(e) =>
                setCurrentEdit({
                  ...currentEdit,
                  count: parseInt(e.target.value),
                })
              }
              required
            />
            <div style={{ marginTop: "1rem" }}>
              <button onClick={handleUpdate}>Save</button>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ marginLeft: "1rem" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <button onClick={navHome}>Home</button>
    </div>
  );
}

export default Dashboard;
