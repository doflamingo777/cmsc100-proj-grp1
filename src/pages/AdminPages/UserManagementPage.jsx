import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./UserManagement.css"; // Import the CSS file

export default function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [selectedSort, setSelectedSort] = useState('');

  const handleSelectChange = (event) => {
    setSelectedSort(event.target.value);
  };

  useEffect(() => {
    // Fetch users from the server when the component mounts
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users');
        const test = setUsers(response.data); // Update state with users data
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();

    // Clean up function
    return () => {
      // Optionally, perform cleanup or cancel any pending requests
    };
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  return (
    <div className="container">
      {/* header */}
      <div className="page-header">
        <h1> USERS </h1>
        <div className="searchBar">
          <input type="text" placeholder="Search a user" className="searchInput"></input>
          <i className="material-icons searchIcon">search</i>
        </div>
        <div className="searchBar">
          <select id="my-select" value={selectedSort} onChange={handleSelectChange} className="searchInput">
            <option value="">Sort by</option>
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="orders">Number of orders</option>
          </select>
          <i className="material-icons searchIcon">keyboard_arrow_down</i>
        </div>
        <h2 className="totalUsers"> TOTAL USERS: {users.length} </h2>
      </div>
      <p>Selected option: {selectedSort}</p>

      {/* user details */}
      <div className="user-container">
        {users.map((item, index) => (
          <div className="user-container-inside" key={index}>
            <ul className="user-box">
              <li className="user-details">
                <h2>{item.firstname}  {item.lastname}</h2>
                <p className="email">{item.email}</p>
                <p>Total no. of orders: {item.orders}</p>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
