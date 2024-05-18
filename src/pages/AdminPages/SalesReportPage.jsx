import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import "./SalesReportPage.css"

export default function SalesReportPage() {
  const [selectedSort, setSelectedSort] = useState('');
  const [products, setProducts] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false); //for showing pop-upp message
  const [productToDelete, setProductToDelete] = useState(null); // State to store product to delete for the pop-up

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

  //deleting a product
  const handleDeleteClick = (products) => {
    console.log(products);
    setProductToDelete(products);
    setShowConfirmation(true);
  };

  //confirm delete
  const confirmDelete = async () => {
    try {
      setShowConfirmation(false);
      const deleteResponse = await axios.post('http://localhost:3000/deleteProduct', { _id: productToDelete._id });
      console.log(deleteResponse);
      fetchproductss();
    } catch (error) {
      console.error('Error: ', error)
    }
  };

    //cancel delete
    const cancelDelete = () => {
      setShowConfirmation(false);
      setUserToDelete(null);
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
            <th>Type</th>
            <th>Price</th>
            <th>Quantity</th>
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
              <td>{product.type}</td>
              <td>${product.price}</td>
              <td>{product.qty}</td>
              <td className="product-desc">{product.desc}</td>
              <td className="product-actions">
              <Link to = "addproductpage" className="product-actions">
                <i className = "material-icons">edit</i>
              
              </Link>
              <Link onClick={() => handleDeleteClick(product)}className="product-actions">
                <i className = "material-icons">delete</i>
              </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
            {/* Confirmation Pop-up */}
            {showConfirmation && (
        <div className="confirmation-pop-up">
          <div className="confirmation-box">
            <div className="confirmation-header">
              <h3>Delete product?</h3>
            </div>
            <div>
              <p>This will remove <span className="bold">
                {productToDelete.name} 
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