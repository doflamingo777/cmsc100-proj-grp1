import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AddProducts.css";

export default function AddProductPage() {
  const [selectedSort, setSelectedSort] = useState("");

  const handleSelectChange = (event) => {
    setSelectedSort(event.target.value);
  };

  return (
    <div className="container">
      {/* header */}
      <div className="page-header">
        <h1> ADD A PRODUCT</h1>
      </div>
      {/* content */}
      <div className="add-container">
        <div className="add-product-image">
          <h2>Product Image</h2>
          <div className="empty-box">
            <i className="material-icons">image</i>
            <h3>
              <i className="material-icons">add</i>Add Image
            </h3>
          </div>
        </div>

        <div className="box-container">
          <div className="form-row">
            <div className="input-group">
              <label htmlFor="productName1">Product Name</label>
              <input
                type="text"
                id="productName1"
                name="productName1"
                placeholder="Enter product name"
              />
            </div>
            <div className="input-group">
              <label htmlFor="productQuantity1">Product Quantity</label>
              <input
                type="text"
                id="productQuantity1"
                name="productQuantity1"
                placeholder="Enter product quantity"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="input-group">
              <label htmlFor="productType">Product Type</label>
              <select id="productType" name="productType">
                <option value="">Select Type</option>
                <option value="type1">Type 1</option>
                <option value="type2">Type 2</option>
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="productQuantity2">Product Price</label>
              <input
                type="text"
                id="productQuantity2"
                name="productQuantity2"
                placeholder="Enter product price"
              />
            </div>
          </div>
          <div className="description-input">
            <label htmlFor="productDescription">Product Description</label>
            <textarea
              id="productDescription"
              name="productDescription"
              rows="5"
              placeholder="Enter product description"
            ></textarea>
          </div>
          <div className="button-row">

        <Link className="final-delete-product">
          <h2 className="add-product-container">
            CANCEL
          </h2>
        </Link>
        <Link className="final-add-product">
          <h2 className="add-product-container">
            ADD PRODUCT
          </h2>
        </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
