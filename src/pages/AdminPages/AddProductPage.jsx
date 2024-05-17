import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AddProducts.css";
import useCustomNavigate from "./useCustomNavigate";

export default function AddProductPage() {
  const [selectedSort, setSelectedSort] = useState("");
  const [image, setImage] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [tempImageUrl, setTempImageUrl] = useState("");
  const [formData, setFormData] = useState({
    productName: "",
    productQuantity: "",
    productType: "",
    productPrice: "",
    productDescription: "",
    imageUrl: "" 
  });
  const [errors, setErrors] = useState({}); //for errors
  const navigateBack = useCustomNavigate(); //for going back

  const handleAddImageClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmImage = () => {
    setImage(tempImageUrl);
    setFormData({ ...formData, imageUrl: tempImageUrl }); 
    setShowConfirmation(false);
  };

  const handleImageChange = (e) => {
    setTempImageUrl(e.target.value);
  };

  const handleCancelImage = () => {
    setShowConfirmation(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateFormData(formData);
    if (Object.keys(errors).length === 0) {
      console.log(formData);
      navigateBack();
    } else {
      setErrors(errors);
      console.log(errors)
      //clear errors for the prompt to show the prompt if ever there's an error again
      if (Object.keys(errors).length > 0) {
        setTimeout(() => {
          setErrors({});
        }, 4000);
      }
    }
  };


  const validateFormData = (data) => {
    const errors = {};
    if (!data.productName.trim()) {
      errors.productName = "name is required";
    }
    
    if(data.productType == '' ) {
      errors.productType = "type is required";
    }
    
    if(!data.productDescription.trim() ) {
      errors.productDescription = "description is required";
    }
    if(!data.imageUrl.trim() ) {
      console.log(data.imageUrl)
      errors.imageUrl = "image is required";
    }

    if (!data.productQuantity.trim()) {
      errors.productQuantity = "quantity is required";
    } else if (!/^\d+$/.test(data.productQuantity)) {
      errors.productQuantity = "quantity must be a number";
    }
    if (!data.productPrice.trim()) {
      errors.productPrice = "price is required";
    } else if (!/^\d+(\.\d{1,2})?$/.test(data.productPrice)) {
      errors.productPrice = "price must be a valid number";
    }
    return errors;
  };

  return (
    <div className="container">
      {/* header */}
      <div className="page-header">
        <h1>ADD A PRODUCT</h1>
      </div>
      {/* content */}
      <form onSubmit={handleSubmit}>
        <div className="add-container">
          <div className="add-product-image">
            <h2>Product Image</h2>
            <div className="empty-box" onClick={handleAddImageClick} style={{ cursor: "pointer" }}>
              {image ? (
                <img src={image} alt="Product" />
              ) : (
                <>
                  <i className="material-icons">image</i>
                  <h3>
                    <i className="material-icons">add</i>Add Image
                  </h3>
                </>
              )}
            </div>
          </div>

          <div className="box-container">
            <div className="form-row">
              <div className="input-group">
                <label htmlFor="productName">Product Name</label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                  placeholder="Enter product name"
                />
              </div>
              <div className="input-group">
                <label htmlFor="productQuantity">Product Quantity</label>
                <input
                  type="text"
                  id="productQuantity"
                  name="productQuantity"
                  value={formData.productQuantity}
                  onChange={handleInputChange}
                  placeholder="Enter product quantity"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label htmlFor="productType">Product Type</label>
                <select
                  id="productType"
                  name="productType"
                  value={formData.productType}
                  onChange={handleInputChange}
                >
                  <option value="">Select Type</option>
                  <option value="type1">Type 1</option>
                  <option value="type2">Type 2</option>
                </select>
              </div>
              <div className="input-group">
                <label htmlFor="productPrice">Product Price</label>
                <input
                  type="text"
                  id="productPrice"
                  name="productPrice"
                  value={formData.productPrice}
                  onChange={handleInputChange}
                  placeholder="Enter product price"
                />
              </div>
            </div>
            <div className="description-input">
              <label htmlFor="productDescription">Product Description</label>
              <textarea
                id="productDescription"
                name="productDescription"
                value={formData.productDescription}
                onChange={handleInputChange}
                rows="5"
                placeholder="Enter product description"
              ></textarea>
            </div>
            <div className="button-row">
              <Link to="/admindashboardpage/productlistadminpage" className="final-delete-product">
                <h2 className="add-product-container">CANCEL</h2>
              </Link>
              <button type="submit" className="final-add-product">
                <h2 className="add-product-container">ADD PRODUCT</h2>
              </button>
            </div>
          </div>
        </div>
      </form>
      {/* Confirmation Pop-up */}
      {showConfirmation && (
        <div className="confirmation-pop-up">
          <div className="confirmation-box">
            <div className="confirmation-header">
              <h3>Enter Image URL</h3>
            </div>
            <div className="image-text">
              <p>Please provide the URL of the image you want to use.</p>
              <input
                className="image-link"
                type="text"
                value={tempImageUrl}
                onChange={handleImageChange}
                placeholder="Enter image URL"
              />
              <div className="confirmation-buttons">
                <button onClick={handleCancelImage}>Cancel</button>
                <button onClick={handleConfirmImage}>Confirm</button>
              </div>
            </div>
          </div>
        </div>
      )}
            {/* prompt for error */}
        {Object.keys(errors).length > 0 && (
        <div className="fade-prompt">
          <p>Please enter all required fields.</p>
        </div>
      )}

      {/* {Object.keys(errors).length === 0 && (
        <div className="success-prompt">
          <p>Successfully added {formData.productName}</p>
        </div>
      )} */}
    </div>
  );
}
