import React, { useState, useEffect } from "react";
import "./OrderFulfillmentPage.css"; // Import the CSS file
import axios from 'axios';

export default function OrderFulfillmentPage() {
  const [selectedSort, setSelectedSort] = useState('');
  const [ orderTransaction, setOrderTransaction ] = useState([]);

  const handleSelectChange = (event) => {
    setSelectedSort(event.target.value);
  };

  // Map order status integer values to their descriptions
  const orderStatusMap = {
    0: "Pending",
    1: "Completed",
    2: "Canceled"
  };

  const fetchOrderTransactions = async () => {
    try {
      // Fetch order transactions from the backend
      const response = await axios.get('http://localhost:3000/getAllOrderTransactions');
      setOrderTransaction(response.data);
    } catch (error) {
      console.error('Error fetching order transactions:', error);
    }
  };
  

  //dummy data for order transactions
  // //const data = [
  //   {
  //     transactionId: "TXN001",
  //     productId: "PROD001",
  //     orderQuantity: 2,
  //     orderStatus: 0,
  //     email: "user1@example.com",
  //     dateOrdered: "2024-05-13",
  //     time: "10:00 AM"
  //   },
  //   {
  //     transactionId: "TXN002",
  //     productId: "PROD002",
  //     orderQuantity: 1,
  //     orderStatus: 0,
  //     email: "user2@example.com",
  //     dateOrdered: "2024-05-14",
  //     time: "11:30 AM"
  //   },
  //   {
  //     transactionId: "TXN003",
  //     productId: "PROD003",
  //     orderQuantity: 1,
  //     orderStatus: 0,
  //     email: "user3@example.com",
  //     dateOrdered: "2024-05-14",
  //     time: "11:30 AM"
  //   },
  //   {
  //     transactionId: "TXN004",
  //     productId: "PROD004",
  //     orderQuantity: 1,
  //     orderStatus: 0,
  //     email: "user4@example.com",
  //     dateOrdered: "2024-05-14",
  //     time: "11:30 AM"
  //   },
  // ];

  useEffect(() => {
    fetchOrderTransactions();
  }
  , []); 
    return (
      <div className="container">
        {/* header */}
        <div className="page-header">
          <h1> ORDERS </h1>
          <div className="top-buttons">
            <button className="acceptButton">ACCEPT ALL</button>
            <button className="rejectButton">REJECT ALL</button>
          </div>
          <div className="searchBar">
            <input type="text" placeholder="Search a transaction" className="searchInput"></input>
            <i className="material-icons searchIcon">search</i>
          </div>
        </div>

        {/* user details */}
        <div className="order-container">
          {orderTransaction.map((item, index) => (
            <div className="order-container-inside">
              <ul className="order-box">
                  <li key={index} className="order-details">
                    <h2>{item.transactionId}</h2>
                    <h4>{item.productId}</h4>
                    <p>Order Status: {orderStatusMap[item.orderStatus]} </p>
                    <p>Order Quantity: {item.orderQuantity} </p>
                    <p>Date Ordered: {item.dateOrdered} </p>
                    <p>Time Ordered: {item.time}</p>
                    <div className="order-buttons">
                      <button className="acceptButton">ACCEPT</button>
                      <button className="rejectButton">REJECT</button>
                    </div>
                  </li>
              </ul>
            </div>

          )
          
          )}
          
          </div>
      </div>
    )
  }