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
  
  const acceptOrder = async (transactionId) => {
    try {
        const response = await axios.post('http://localhost:3000/acceptOrder', { transactionId });
        console.log(response.data);
        fetchOrderTransactions(); // Refresh the list of transactions
    } catch (error) {
        console.error('Error accepting order:', error);
    }
  };

  

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
                      <button className="acceptButton" onClick={() => acceptOrder(item.productId)}>ACCEPT</button>
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