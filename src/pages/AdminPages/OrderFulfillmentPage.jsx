
import React from 'react';

const data = [
  {
    transactionId: "TXN001",
    productId: "PROD001",
    orderQuantity: 2,
    orderStatus: 0,
    email: "user1@example.com",
    dateOrdered: "2024-05-13",
    time: "10:00 AM"
  },
  {
    transactionId: "TXN002",
    productId: "PROD002",
    orderQuantity: 1,
    orderStatus: 0,
    email: "user2@example.com",
    dateOrdered: "2024-05-14",
    time: "11:30 AM"
  },
  // Add more data as needed
];

const DisplayData = () => {
  return (
    <div>
      <h2>Transaction Data</h2>
      <table>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Product ID</th>
            <th>Order Quantity</th>
            <th>Order Status</th>
            <th>Email</th>
            <th>Date Ordered</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.transactionId}</td>
              <td>{item.productId}</td>
              <td>{item.orderQuantity}</td>
              <td>{item.orderStatus === 0 ? 'Pending' : item.orderStatus === 1 ? 'Completed' : 'Canceled'}</td>
              <td>{item.email}</td>
              <td>{item.dateOrdered}</td>
              <td>{item.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayData;
