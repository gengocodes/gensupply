import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [supplies, setSupplies] = useState([]);
  const [newSupply, setNewSupply] = useState({ name: "", count: 0 });
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const navHome = () => {
    navigate("/home");
  };

  useEffect(() => {
    fetchSupplies();
  }, []);

  const fetchSupplies = () => {
    axios
      .get("http://localhost:1234/supply")
      .then((res) => setSupplies(res.data))
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
        <p key={supply.id}>
          {supply.name}(id {supply.id})(Count: {supply.count})
        </p>
      ))}
      <button onClick={navHome}>Home</button>
    </div>
  );
}

export default Dashboard;
