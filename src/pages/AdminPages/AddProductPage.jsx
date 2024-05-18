import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';   
import { Link, useParams} from "react-router-dom";
import "./AddProducts.css";
import useCustomNavigate from "./useCustomNavigate";
import axios from "axios";

export default function AddProductPage() {
  let { existingProductId } = useParams();

  const [image, setImage] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [tempImageUrl, setTempImageUrl] = useState("");
  const [tempName, setTempName] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    desc: "",
    qty: "",
    type: "",
    image: "",
    id: ""
  });
  const [errors, setErrors] = useState({}); //for errors
  const navigateBack = useCustomNavigate(); //for going back

  const fetchAProduct = async () => {
    try {
      if (existingProductId) {
      const response = await axios.get(`http://localhost:3000/getAProduct?id=${existingProductId}`)

        setFormData(response.data[0]);
        setImage(response.data[0].image);
        setTempName(response.data[0].name)
    }
  } catch(error) {
      console.error('Error fetching product:', error);
    };
  }
  
  useEffect(() => {
    fetchAProduct();
}, [existingProductId]);

  const handleAddImageClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmImage = () => {
    setImage(tempImageUrl);
    setFormData(prevFormData => ({ ...prevFormData, image: tempImageUrl }));
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
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const addProd = (product) => {
    console.log("Adding product:", product);

    axios
      .post('http://localhost:3000/addNewProduct', product)
      .then(() => {
        alert('Product added successfully');
      })
      .catch((error) => {
        console.log('Unable to add product:', error);
      });
  };

  const editProd = (product) => {
    console.log("Updating product:", product);
    axios
      .post('http://localhost:3000/editAProduct', product)
      .then(() => {
        alert('Product updated successfully');
      })
      .catch((error) => {
        console.log('Unable to add product:', error);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateFormData(formData);
    if (Object.keys(errors).length === 0) {
      if(existingProductId) {
        editProd(formData);
        console.log("meron");
      }else{
        const random = uuidv4().replace(/-/g, '');
        const letters = random.replace(/[^a-zA-Z]/g, '').substring(0, 2).toUpperCase();
        const numbers = random.replace(/[^0-9]/g, '').substring(0, 3)
        //adds the P letter at the start to indicate that it's and id for products
        const finalRandomizeID = `P${letters}${numbers}`; 
        //add the random generated id to the forms
        const updatedFormData = { ...formData, id: finalRandomizeID };
        setFormData(updatedFormData);
        
        addProd(updatedFormData);
      }
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
    console.log(data.qty.toString().trim());
    const errors = {};
    if (!data.name.trim()) {
      errors.name = "name is required";
    }
    
    if(data.type == '' ) {
      errors.type = "type is required";
    }
    
    if(!data.desc.trim() ) {
      errors.desc = "description is required";
    }
    if(!data.image.trim() ) {
      console.log(data.image)
      errors.image = "image is required";
    }

    if (!data.qty.toString().trim()) {
      errors.qty = "quantity is required";
    } else if (!/^\d+$/.test(data.qty)) {
      errors.qty = "quantity must be a number";
    }
    if (!data.price.toString().trim()) {
      errors.price = "price is required";
    } else if (!/^\d+(\.\d{1,2})?$/.test(data.price)) {
      errors.price = "price must be a valid number";
    }
    return errors;
  };

  return (
    <div className="container">
      {/* header */}
      <div className="page-header">
        <h1>{!existingProductId ? 'ADD A PRODUCT' : `EDIT PRODUCT ${tempName}` }</h1>
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
                <label htmlFor="name">Product Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter product name"
                />
              </div>
              <div className="input-group">
                <label htmlFor="qty">Product Quantity</label>
                <input
                  type="text"
                  id="qty"
                  name="qty"
                  value={formData.qty}
                  onChange={handleInputChange}
                  placeholder="Enter product quantity"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label htmlFor="type">Product Type</label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                >
                  <option value="">Select Type</option>
                  <option value="1">Staple</option>
                  <option value="2">Fruits and Vegetables</option>
                  <option value="3">Livestock</option>
                  <option value="4">Seafood</option>
                  <option value="5">Others</option>
                </select>
              </div>
              <div className="input-group">
                <label htmlFor="price">Product Price</label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Enter product price"
                />
              </div>
            </div>
            <div className="description-input">
              <label htmlFor="desc">Product Description</label>
              <textarea
                id="desc"
                name="desc"
                value={formData.desc}
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
                <h2 className="add-product-container">{existingProductId ? 'EDIT PRODUCT':'ADD PRODUCT'}</h2>
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
          <p>Successfully added {formData.name}</p>
        </div>
      )} */}
    </div>
  );
}
