import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import "./SalesReportPage.css"

export default function SalesReportPage() {
  const [selectedSort, setSelectedSort] = useState('');
  const [products, setProducts] = useState([]);
  const [groupedTransactions, setGroupedTransactions] = useState([]); // State for grouped transactions data
  const [showConfirmation, setShowConfirmation] = useState(false); // For showing pop-up message

  const handleSelectChange = async (event) => {
    setSelectedSort(event.target.value);
    const groupBy = event.target.value;

    if (groupBy) {
        try {
            const response = await axios.get(`http://localhost:3000/group-transactions?groupBy=${groupBy}`);
            setGroupedTransactions(response.data);
        } catch (error) {
            console.error('Error fetching grouped transactions:', error);
        }
    } else {
        setGroupedTransactions([]); // Clear the grouped data if no specific grouping is selected
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/getAllProduct');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container">
      <div className="page-header">
        <h1> SALES </h1>
        <div className="summaryBar">
          <select id="my-select" value={selectedSort} onChange={handleSelectChange} className="searchInput select-with-arrow">
            <option value="">View Summary of Transactions by:</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
      </div>

      <table className="product-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Available</th>
            <th>Sold</th>
            <th>Price</th>
            <th>Sales</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>
                <div className="product">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <span className="product-name">{product.name}</span>
                </div>
              </td>
              <td>{product.qty}</td>
              <td>{product.soldqty}</td>
              <td>${product.price}</td>
              <td className="product-desc">{product.sales}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Display grouped transactions if any */}
      {groupedTransactions.length > 0 && (
          <div>
              <h2>Grouped Sales Data ({selectedSort})</h2>
              <table className="grouped-transactions-table">
                  <thead>
                      <tr>
                          <th>Period</th>
                          <th>Product ID</th>
                          <th>Total Orders</th>
                          <th>Total Quantity</th>
                      </tr>
                  </thead>
                  <tbody>
                      {groupedTransactions.map((group, index) => (
                          <tr key={index}>
                              <td>{group._id.period}</td> {/* Adjusted to access period from _id */}
                              <td>{group._id.productId}</td> {/* Adjusted to access productId from _id */}
                              <td>{group.totalOrders}</td>
                              <td>{group.totalQuantity}</td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      )}

    </div>
  );
}
