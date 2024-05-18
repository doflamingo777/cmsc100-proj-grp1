import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import "./SalesReportPage.css"

export default function SalesReportPage() {
  const [selectedSort, setSelectedSort] = useState('');
  const [products, setProducts] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false); //for showing pop-upp message

  const handleSelectChange = (event) => {
    setSelectedSort(event.target.value);
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/getAllProduct');
      setProducts(response.data);
      // console.log(products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };



  useEffect(() => {
    //constantly fetch products from database
    fetchProducts();
  }, [products]);

  return (
    <div className="container">
      {/* header */}
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
      {/* product table */}
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
              <td className="product-actions">
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}