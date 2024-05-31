import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserProfile.css';

export default function UserProfile() {
  const [user, setUser] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const email = localStorage.getItem('email');

  useEffect(() => {
    fetchUserProfile();
    fetchUserPurchaseHistory();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/getAUser?email=${email}`);
      setUser(response.data);
      setFormData({
        ...response.data,
        password: '' // Ensure password is not pre-filled
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const fetchUserPurchaseHistory = async () => {
    try {
      const response = await axios.get('http://localhost:3000/getAllOrderTransactions');
      const responseUser = await axios.get(`http://localhost:3000/getAUser?email=${localStorage.getItem('email')}`);
      const user = responseUser.data;
      console.log("User Transactions.jsx: ", user);

      const filteredData = response.data.filter(item => item.email === user.email);
      setTransactions(filteredData);
    } catch (error) {
      console.error('Error fetching purchase history:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/updateProfile', formData);
      setEditing(false);
      fetchUserProfile();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const orderStatusMap = {
    0: 'Pending',
    1: 'Completed',
    2: 'Rejected',
    3: 'Cancelled',
  };

  return (
    <div className='profile-container'>
      <h1>User Profile</h1>
      {editing ? (
        <form className='profile-form' onSubmit={handleFormSubmit}>
          <label>First Name:</label>
          <input type='text' name='firstname' value={formData.firstname || ''} onChange={handleInputChange} required />
          <label>Middle Name:</label>
          <input type='text' name='middlename' value={formData.middlename || ''} onChange={handleInputChange} />
          <label>Last Name:</label>
          <input type='text' name='lastname' value={formData.lastname || ''} onChange={handleInputChange} required />
          <label>Username:</label>
          <input type='text' name='username' value={formData.username || ''} onChange={handleInputChange} required />
          <label>Phone:</label>
          <input type='text' name='phone' value={formData.phone || ''} onChange={handleInputChange} required />
          <label>Password:</label>
          <input type='password' name='password' value={formData.password || ''} onChange={handleInputChange} />
          <button type='submit'>Save</button>
          <button type='button' onClick={() => setEditing(false)}>Cancel</button>
        </form>
      ) : (
        <div className='profile-details'>
          <p>First Name: {user.firstname}</p>
          <p>Middle Name: {user.middlename}</p>
          <p>Last Name: {user.lastname}</p>
          <p>Username: {user.username}</p>
          <p>Phone: {user.phone}</p>
          <button onClick={() => setEditing(true)}>Edit Profile</button>
        </div>
      )}
      <h2>Purchase History</h2>
      <div className='purchase-history'>
        {transactions.map((transaction) => (
          <div key={transaction.transactionId} className='transaction'>
            <p>Transaction ID: {transaction.transactionId}</p>
            <p>Product ID: {transaction.productId}</p>
            <p>Quantity: {transaction.orderQuantity}</p>
            <p>Status: {orderStatusMap[transaction.orderStatus]}</p>
            <p>Date: {new Date(transaction.dateOrdered).toLocaleDateString()}</p>
            <p>Time: {transaction.time}</p>
            <p>Mode of Payment: {transaction.modeOfPayment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
