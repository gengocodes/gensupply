import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../slices/userSlice.tsx";
import { setNewSupply, clearSupply } from "../../slices/supplySlice.tsx";
import "./Dashboard.css";
const api = process.env.REACT_APP_BACK_HOST || "http://localhost:10000";

function Dashboard() {
  const [auth, setAuth] = useState(false);
  const [supplies, setSupplies] = useState([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState({
    id: null,
    name: "",
    count: 0,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  axios.defaults.withCredentials = true;

  const newSupply = useSelector((state) => state.supply);

  const navHome = () => {
    navigate("/home");
  };

  useEffect(() => {
    axios
      .get(`${api}`, { withCredentials: true })
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
      .get(`${api}/supply`)
      .then((res) => setSupplies(res.data))
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`${api}/supply/delete/${id}`)
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
      .put(`${api}/supply/update/${currentEdit.id}`, {
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
      .post(`${api}/supply/create`, {
        name: newSupply.name,
        count: newSupply.count,
      })
      .then(() => {
        fetchSupplies();
        dispatch(setNewSupply(clearSupply()));
      })
      .catch((err) => console.log(err));
  };

  const openEditModal = (supply) => {
    setCurrentEdit(supply);
    setIsModalOpen(true);
  };

  const filteredSupplies = supplies.filter((supply) =>
    supply.name.toLowerCase().includes(search.toLowerCase())
  );

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
          value={newSupply.name}
          onChange={(e) =>
            dispatch(setNewSupply({ ...newSupply, name: e.target.value }))
          }
        />
        <label htmlFor="supplyCount">Supply Count</label>
        <input
          type="number"
          name="supplyCount"
          placeholder="Input Supply Count"
          required
          value={newSupply.count}
          onChange={(e) =>
            dispatch(
              setNewSupply({ ...newSupply, count: parseInt(e.target.value) })
            )
          }
        />
        <button type="submit">Create</button>
      </form>
      <input
        type="text"
        placeholder="Search Supples..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {filteredSupplies.length === 0 ? (
        <p>No supply found!</p>
      ) : (
        filteredSupplies.map((supply, index) => (
          <div key={supply.id} className="supply-cont">
            <p>
              {supply.name}(id {index + 1})(Count: {supply.count})
            </p>
            <button onClick={() => handleDelete(supply.id)}>Delete</button>
            <button onClick={() => openEditModal(supply)}>Edit</button>
          </div>
        ))
      )}
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
            <div className="modal-buttons">
              <button onClick={handleUpdate}>Save</button>
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      <button onClick={navHome}>Home</button>
    </div>
  );
}

export default Dashboard;
