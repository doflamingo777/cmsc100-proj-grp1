import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./UserManagement.css"; // Import the CSS file

export default function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [selectedSort, setSelectedSort] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false); //for showing pop-upp message
  const [userToDelete, setUserToDelete] = useState(null); // State to store user to delete for the pop-up

  const handleSelectChange = (event) => {
    setSelectedSort(event.target.value);
  };

  //fetching user
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users');
      setUsers(response.data);
      // console.log(users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  //deleting a user
  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowConfirmation(true);
  };

  //confirm delete
  const confirmDelete = async () => {
    try {
      setShowConfirmation(false);
      const deleteResponse = await axios.post('http://localhost:3000/deleteUser', { _id: userToDelete._id });
      console.log(deleteResponse);
      fetchUsers();
    } catch (error) {
      console.error('Error: ', error)
    }
  };

  //cancel delete
  const cancelDelete = () => {
    setShowConfirmation(false);
    setUserToDelete(null);
  };

  // showConfirmation is for fetching when deleting (oks to), users is for fetching user in general
  // pero infinite loop ginagawa ng users so it might be heavy on the network traffic
  useEffect(() => {
    //constantly fetch user from database
    fetchUsers();
  }, [showConfirmation, users]);
  

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

      {/* User details */}
      <div className="user-container">
        {users.map((item, index) => (
          <div className="user-container-inside" key={index}>
            <ul className="user-box">
              <li className="user-details">
                <h2>{item.firstname}  {item.lastname}</h2>
                <p className="email">{item.email}</p>
                <p>Username: {item.username}</p>
              </li>
              <i className="material-icons right-icon" onClick={() => handleDeleteClick(item)}>close</i>
              <i className="material-icons left-icon">edit</i>
            </ul>
          </div>
        ))}
      </div>

      {/* Confirmation Pop-up */}
      {showConfirmation && (
        <div className="confirmation-pop-up">
          <div className="confirmation-box">
            <p>Are you sure you want to delete {userToDelete.firstname} {userToDelete.lastname}?</p>
            <div className="confirmation-buttons">
              <button onClick={confirmDelete}>Yes</button>
              <button onClick={cancelDelete}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
