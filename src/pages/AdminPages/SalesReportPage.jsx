import React, { useState } from "react";
import "./SalesReportPage.css"; // Import the CSS file

export default function SalesReportPage() {
  const [selectedSort, setSelectedSort] = useState('');

  const handleSelectChange = (event) => {
    setSelectedSort(event.target.value);
  };



  //dummy data for sales transactions
  const salesData = [
    {product: "Product A", sales_income: 5000, price: 50, quantity_sold: 100},
    {product: "Product B", sales_income: 5000, price: 25, quantity_sold: 200},
    {product: "Product C", sales_income: 5000, price: 20, quantity_sold: 250},
    {product: "Product D", sales_income: 5000, price: 30, quantity_sold: 167},
    {product: "Product E", sales_income: 5000, price: 40, quantity_sold: 125}
];



    return (
      <div className="container">
        {/* header */}
        <div className="page-header">
          <h1> SALES </h1>
          <div className="searchBar">
            <input type="text" placeholder="Search a transaction" className="searchInput"></input>
            <i className="material-icons searchIcon">search</i>
          </div>
          <div className="searchBar">
          <select id="my-select" value={selectedSort} onChange={handleSelectChange} className="searchInput">
            <option value="">Filter by: </option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly </option>
            <option value="annual">Annual </option>
          </select>
          <i className="material-icons searchIcon">keyboard_arrow_down</i>
          </div>

          
          

          
        </div>

        

        {/* user details */}
        <div className="sales-container">
          <table className="sales-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity Sold</th>
                <th>Sales Income</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((item, index) => (
                <tr key={index}>
                  <td>{item.product}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity_sold}</td>
                  <td>{item.sales_income}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    )
  }