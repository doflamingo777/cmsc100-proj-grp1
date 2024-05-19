import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import "./ProductsAdmin.css"

export default function ProductListAdminPage() {
  const [selectedSort, setSelectedSort] = useState('');
  const [products, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false); //for showing pop-upp message
  const [productToDelete, setProductToDelete] = useState(null); // State to store product to delete for the pop-up

  const productTypeMap = {
    1: "Staple",
    2: "Fruits and Vegetables",
    3: "Livestock",
    4: "Seafood",
    5: "Others"
  }

  const handleSelectChange = (event) => {
    setSelectedSort(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };
  const sortProducts = (products, option) => {
    return products.sort((productA, productB) => {
      switch (option) {
        case 'productnameAsc':
          return productA.name.localeCompare(productB.name);
        case 'productnameDesc':
          return productB.name.localeCompare(productA.name);
        case 'producttypeAsc':
          return (
            productTypeMap[productA.type].localeCompare(productTypeMap[productB.type]) ||
            productA.name.localeCompare(productB.name) //to sort it by name if ever first conditions are same
          );
        case 'producttypeDesc':
          return (
            productTypeMap[productB.type].localeCompare(productTypeMap[productA.type]) ||
            productB.name.localeCompare(productA.name) //to sort it by name if ever first conditions are same
          );
        case 'productpriceAsc':
          return (
            productA.price - productB.price ||
            productA.name.localeCompare(productB.name)
          );
        case 'productpriceDesc':
          return (
            productB.price - productA.price ||
            productB.name.localeCompare(productA.name)
          );
        case 'productqtyAsc':
          return (
            productA.qty - productB.qty ||
            productA.name.localeCompare(productB.name)
          );
        case 'productqtyDesc':
          return (
            productB.qty - productA.qty ||
            productB.name.localeCompare(productA.name)
          );
        default:
          return 0;
      }
    });
  };
  //filter and sorting products for searching
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const sortedProducts = sortProducts(filteredProducts, selectedSort); //this will now be the new array of products that i will map to display

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/getAllProduct');
      const sortedProducts = sortProducts(response.data, selectedSort);
      setProducts(sortedProducts);
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
  }, [selectedSort, products]);

  return (
    <div className="container">
      {/* header */}
      <div className="page-header">
        <h1> PRODUCTS </h1>
        <Link to="addproductpage" className="add-product-button">
          <h2 className="add-product-container">
            <i className="material-icons">add</i>ADD A PRODUCT
          </h2>
        </Link>
        <div className="searchBar">
          <input type="text" placeholder="Search a product" className="searchInput" value={searchValue}
            onChange={handleSearchChange}></input>
          <i className="material-icons searchIcon">search</i>
        </div>
        <div className="searchBar">
          <select id="my-select" value={selectedSort} onChange={handleSelectChange} className="searchInput">
            <option value="">Sort by</option>
            <option value="productnameAsc">Name ascending</option>
            <option value="productnameDesc">Name descending</option>
            <option value="producttypeAsc">Type ascending</option>
            <option value="producttypeDesc">Type descending</option>
            <option value="productpriceAsc">Price ascending</option>
            <option value="productpriceDesc">Price descending</option>
            <option value="productqtyAsc">Quantity ascending</option>
            <option value="productqtyDesc">Quantity descending</option>
          </select>
          <i className="material-icons searchIcon">keyboard_arrow_down</i>
        </div>
      </div>
      
      {/* product table */}

      <table className="product-table-list">
        <thead>
          <tr>
            <th>Product</th>
            <th>Type</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map(product => (
            <tr key={product._id}>
              <td>
                <div className="product-list">
                  <img src={product.image} alt={product.name} className="product-image-list" />
                  <span className="product-name-list">{product.name}</span>
                </div>
              </td>
              <td>{productTypeMap[product.type]}</td>
              <td>₱{product.price}</td>
              <td>{product.qty}</td>
              <td className="product-desc-list">{product.desc}</td>
              <td className="product-actions-list">
              <Link to = {`addproductpage/${product._id}`} className="product-actions-list" >
                <i className = "material-icons">edit</i>
              
              </Link>
              <Link onClick={() => handleDeleteClick(product)}className="product-actions-list">
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