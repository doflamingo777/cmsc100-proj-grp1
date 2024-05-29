import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./UserManagement.css"; // Import the CSS file

export default function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [selectedSort, setSelectedSort] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false); //for showing pop-upp message
  const [userToDelete, setUserToDelete] = useState(null); // State to store user to delete for the pop-up

  const handleSelectChange = (event) => {
    setSelectedSort(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const sortUsers = (users, option) => {
    return users.sort((productA, productB) => {
      switch (option) {
        case 'nameAsc':
          return productA.firstname.localeCompare(productB.firstname);
        case 'nameDesc':
          return productB.firstname.localeCompare(productA.firstname);
        case 'emailAsc':
          return productA.email.localeCompare(productB.email);
        case 'emailDesc':
          return productB.email.localeCompare(productA.email);
        case 'ordersAsc':
          return (
            productA.shopping_cart.length - productB.shopping_cart.length ||
            productA.firstname.localeCompare(productB.firstname)
          );
        case 'ordersDesc':
          return (
            productB.shopping_cart.length - productA.shopping_cart.length ||
            productB.firstname.localeCompare(productA.firstname)
          );
        default:
          return 0;
      }
    });
  };

  
  //fetching user
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users');
      const usersSorted = sortUsers(response.data, selectedSort);
      setUsers(usersSorted);
      // console.log(users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  
  //filter and sorting users for searching
  const filteredUsers = users.filter(user =>
    user.firstname.toLowerCase().includes(searchValue.toLowerCase())
  );

  const sortedUsers = sortUsers(filteredUsers, selectedSort);
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
  }, [showConfirmation, users, selectedSort]);
  

  return (
    <div className="container">
      {/* header */}
      <div className="page-header">
        <h1> USERS </h1>
        <div className="searchBar">
          <input type="text" placeholder="Search a user" className="searchInput" value={searchValue} onChange={handleSearchChange}></input>
          <i className="material-icons searchIcon">search</i>
        </div>
        <div className="searchBar">
          <select id="my-select" value={selectedSort} onChange={handleSelectChange} className="searchInput">
            <option value="">Sort by</option>
            <option value="nameAsc">Name Ascending</option>
            <option value="nameDesc">Name Descending</option>
            <option value="emailAsc">Email Ascending</option>
            <option value="emailDesc">Email Descending</option>
            <option value="ordersAsc">No. of Orders Ascending</option>
            <option value="ordersDesc">No. of Orders Descending</option>
          </select>
          <i className="material-icons searchIcon">keyboard_arrow_down</i>
        </div>
        <h2 className="totalUsers"> TOTAL USERS: {users.length} </h2>
      </div>

      {/* User details */}
      <div className="user-container">
        {sortedUsers.map((item, index) => (
          <div className="user-container-inside" key={index}>
            <ul className="user-box">
              <li className="user-details">
                <h2>{item.firstname}  {item.lastname}</h2>
                <h4 className="email">{item.email}</h4>
                <p><span>Username: </span> {item.username}</p>
                <p><span>Mobile Number: </span> {item.phone}</p>
                <p><span>Items in Cart: </span> {item.shopping_cart.length ? item.shopping_cart.length : 'None' }</p>
              </li>
              <i className="material-icons right-icon" onClick={() => handleDeleteClick(item)}>close</i>
            </ul>
          </div>
        ))}
      </div>

      {/* Confirmation Pop-up */}
      {showConfirmation && (
        <div className="confirmation-pop-up">
          <div className="confirmation-box">
            <div className="confirmation-header">
              <h3>Delete user?</h3>
            </div>
            <div>
              <p>This will remove <span className="bold">
                {userToDelete.firstname} {userToDelete.lastname}
                </span>.
                </p>
              <div className="confirmation-buttons">
                <button onClick={cancelDelete}>Cancel</button>
                <button onClick={confirmDelete}>Delete</button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
