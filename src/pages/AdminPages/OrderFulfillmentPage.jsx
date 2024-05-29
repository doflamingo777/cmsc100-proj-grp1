import React, { useState, useEffect } from "react";
import "./OrderFulfillmentPage.css"; // Import the CSS file
import axios from 'axios';

export default function OrderFulfillmentPage() {
  const [selectedSort, setSelectedSort] = useState('');
  const [orderTransaction, setOrderTransaction] = useState([]);

  const handleSelectChange = (event) => {
    setSelectedSort(event.target.value);
  };

  // Map order status integer values to their descriptions
  const orderStatusMap = {
    0: "Pending",
    1: "Completed",
    2: "Rejected",
    3: "Cancelled"
  };

  const fetchOrderTransactions = async () => {
    try {
      // Fetch order transactions from the backend
      const response = await axios.get('http://localhost:3000/getAllOrderTransactions');
      const filteredData = response.data.filter(item => item.orderStatus !== 1 & item.orderStatus !== 2 & item.orderStatus !== 3); // Filter out completed orders
      setOrderTransaction(filteredData);
    } catch (error) {
      console.error('Error fetching order transactions:', error);
    }
  };

  const acceptOrder = async (transactionId) => {
    console.log("This is transactionId: ", transactionId);
    try {
        const response = await axios.post('http://localhost:3000/acceptOrder', { transactionId });
        console.log(response.data);

        // Check if the response indicates that the order was cancelled
        if (response.data.cancelled) {
            prompt(response.data.message);
        } else {
            console.log('Order accepted successfully');
            fetchOrderTransactions(); // Refresh the list of transactions
        }
    } catch (error) {
        console.error('Error accepting order:', error);
        alert('An error occurred while accepting the order. Please try again.');
    }
};


  const rejectOrder = async (transactionId) => {
    console.log("Rejecting transactionId: ", transactionId);
    try {
      const response = await axios.post('http://localhost:3000/rejectOrder', { transactionId });
      console.log(response.data);
      fetchOrderTransactions(); // Refresh the list of transactions
    } catch (error) {
      console.error('Error rejecting order:', error);
    }
  };

  useEffect(() => {
    fetchOrderTransactions();
  }, []);

  return (
    <div className="container">
      {/* header */}
      <div className="page-header">
        <h1>ORDERS</h1>
        <div className="searchBar">
          <input type="text" placeholder="Search a transaction" className="searchInput"></input>
          <i className="material-icons searchIcon">search</i>
        </div>
      </div>

      {/* order details */}
      <div className="order-container">
        {orderTransaction.map((item, index) => (
          <div key={index} className="order-container-inside">
            <ul className="order-box">
              <li className="order-details">
                <h6>Transaction ID:</h6>
                <h2>{item.transactionId}</h2>
                <h6 style={{ marginBottom: '-30px' }}>Product ID:</h6>
                <h4>{item.productId}</h4>
                <p>Order Status: {orderStatusMap[item.orderStatus]}</p>
                <p>Order Quantity: {item.orderQuantity}</p>
                <p>Date Ordered: {item.dateOrdered}</p>
                <p>Time Ordered: {item.time}</p>
                <p>Mode of Payment: {item.modeOfPayment}</p>
                <p>Sales: {item.sales}</p>
                <div className="order-buttons">
                  <button className="acceptButton" onClick={() => acceptOrder(item.transactionId)}>ACCEPT</button>
                  <button className="rejectButton" onClick={() => rejectOrder(item.transactionId)}>REJECT</button>
                </div>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
