import React, { useState } from "react";
import "./UserManagement.css"; // Import the CSS file

export default function UserManagementPage() {
  const [selectedSort, setSelectedSort] = useState('');

  const handleSelectChange = (event) => {
    setSelectedSort(event.target.value);
  };

  //dummy data for users
  const users = [
    { fname: 'Riggs', mname: 'Trinidad' , lname: 'Tomas', type: 'customer', email: 'riggstomas@gmail.com', orders: 25},
    { fname: 'Veronica', mname: 'Nica' , lname: 'Daus', type: 'customer', email: 'nicadaus@gmail.com', orders: 6},
    { fname: 'Veronica', mname: 'Nica' , lname: 'Daus', type: 'customer', email: 'nicadaus@gmail.com', orders: 6},
    { fname: 'Jonner', mname: '' , lname: 'Camara', type: 'customer', email: 'jonzcamara@gmail.com', orders: 69},
    { fname: 'Riggs', mname: 'Trinidad' , lname: 'Tomas', type: 'customer', email: 'riggstomas@gmail.com', orders: 25},
    { fname: 'Riggs', mname: 'Trinidad' , lname: 'Tomas', type: 'customer', email: 'riggstomas@gmail.com', orders: 25},
    { fname: 'Jonner', mname: '' , lname: 'Camara', type: 'customer', email: 'jonzcamara@gmail.com', orders: 69},

  ];

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
            <div className="user-container-inside">
            <ul className="user-box">
                <li key={index} className="user-details">
                  <h2>{item.fname} {item.mname} {item.lname}</h2>
                  <p className="email">{item.email}</p>
                  <p>Total no. of orders: {item.orders}</p>
                </li>
            </ul>
            </div>
          )
          
          )}
          </div>
      </div>
    )
  }