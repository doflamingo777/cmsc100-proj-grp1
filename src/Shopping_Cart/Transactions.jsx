import React from 'react';
// import Card from './Card.jsx'
// import Cart from './Cart.jsx';
import { useState, useEffect } from 'react';
import './ShopCart.css';
import axios from 'axios';

export default function TransacPage() {
    const [orderTransaction, setOrderTransaction] = useState([]);

    const fetchOrderTransactions = async () => {
        try {
        // Fetch order transactions from the backend
        const response = await axios.get('http://localhost:3000/getAllOrderTransactions');

        const responseUser = await axios.get(`http://localhost:3000/getAUser?email=${localStorage.getItem('email')}`);
        const user = responseUser.data[0];
        console.log("User Transactions.jsx: ", user);

        const filteredData = response.data.filter(item => (item.orderStatus !== 1 & item.orderStatus !== 2) && item.email === userEmail); // Filter out completed orders
        setOrderTransaction(filteredData);
        } catch (error) {
        console.error('Transaction.jsx error: ', error);
        }
    };

    const cancel = async (transactionId) => {
        console.log("Rejecting transactionId: ", transactionId);
        try {
            const response = await axios.post('http://localhost:3000/rejectOrder', { transactionId });
            console.log(response.data);
            fetchOrderTransactions(); // Refresh the list of transactions
        } catch (error) {
            console.error('Transactions.jsx Error delete:', error);
        }
    };

    const orderStatusMap = {
        0: "Pending",
        1: "Completed",
        2: "Rejected"
    };

    useEffect(() => {
        fetchOrderTransactions();
    }, []);

    return (
    <div className="container">
      <div className="page-header">
        <h1>ORDERS</h1>
      </div>
      
      <div className="order-container">
        {orderTransaction.map((item, index) => (
          <div key={index} className="order-container-inside">
            <ul className="order-box">
              <li className="order-details">
                <h2>{item.transactionId}</h2>
                <h4>{item.productId}</h4>
                <p>Order Status: {orderStatusMap[item.orderStatus]}</p>
                <p>Order Quantity: {item.orderQuantity}</p>
                <p>Date Ordered: {item.dateOrdered}</p>
                <p>Time Ordered: {item.time}</p>
                <div className="order-buttons">
                  <button className="rejectButton" onClick={() => cancel(item.transactionId)}>REJECT</button>
                </div>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
    )
}