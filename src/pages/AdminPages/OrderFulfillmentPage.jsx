// import React from 'react';
// import './OrderFulfillmentPage.css';

// function OrderCard({ order }) {
//   return (
//     <div className="order-card">
//       <h5>{order.customerName}</h5>
//       {order.products.map((product, index) => (
//         <p key={index}>{product.name} - Qty: {product.qty} - Price: {product.price}</p>
//       ))}
//       <button className="btn-reject">Reject</button>
//       <button className="btn-accept">Accept</button>
//     </div>
//   );
// }

// function OrderFulfillmentPage({ orders }) {
//   return (
//     <div className="orders-page">
//       <h3>ORDERS</h3>
//       <div className="controls">
//         <button>Reject All</button>
//         <button>Accept All</button>
//         <input type="text" placeholder="Search a customer" />
//       </div>
//       <div className="orders-container">
//         {orders.map((order) => (
//           <OrderCard key={order.id} order={order} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default OrderFulfillmentPage;


export default function OrderFulfillmentPage() {
  return (
    <>
      <p> Order Fulfillment Page </p>
    </>
  )
}