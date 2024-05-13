import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ProductsAdmin.css"

export default function ProductListAdminPage() {
  const [selectedSort, setSelectedSort] = useState('');

  const handleSelectChange = (event) => {
    setSelectedSort(event.target.value);
  };

  //dummy data
  const products = [
    { 
      id: 1, 
      name: 'Laptop', 
      type: 'Crops',
      quantity: 50,
      price: 999, 
      image: 'https://i5.walmartimages.com/seo/Lenovo-IdeaPad-3i-14-Laptop-Intel-Core-i5-1235U-8GB-RAM-512GB-SSD-Windows-11-Home-Arctic-Grey-82RJ0007US_2636a308-dc1c-4235-a1f3-cc826ed59556.6790f1aa7755583035b970d4f8ea4526.jpeg',
      desc: "Lorem ipsum dolor lap top intel core it 8 gb ram 512 gb sd winwos Arctic Grey Intel Core Laptop PC Thank YOu" 
    },
    { 
      id: 2, 
      name: 'Phone', 
      type: 'Crops',
      quantity: 50,
      price: 299, 
      image: 'https://www.compex.com.ph/cdn/shop/products/REALME-R6_4GB_8GB_CometBlue_26243e61-1726-4532-9bec-23295bc971b4_1200x1200.jpg?v=1597041228',
      desc: "Lorem ipsum dolor"  
    },
    { 
      id: 3, 
      name: 'iPhone',
      type: 'Crops',
      quantity: 50, 
      price: 1099, 
      image: 'https://powermaccenter.com/cdn/shop/files/iPhone_15_Pro_Max_Natural_Titanium_PDP_Image_Position-1__en-US_3295c924-7c21-417d-870c-32bee7f1e310_1445x.jpg?v=1695861436',
      desc: "Lorem ipsum dolor"  
    },
    { 
      id: 4, 
      name: 'Headset',
      type: 'Crops',
      quantity: 50, 
      price: 75, 
      image: 'https://jblstore.com.ph/cdn/shop/files/JBLTune520BT_Blue_1_600x.png?v=1689752682',
      desc: "Lorem ipsum dolor"  
    },
    { 
      id: 5, 
      name: 'Keyboard',
      type: 'Crops',
      quantity: 50, 
      price: 150, 
      image: 'https://d1rlzxa98cyc61.cloudfront.net/catalog/product/cache/1801c418208f9607a371e61f8d9184d9/1/8/181502_2022_1.jpg',
      desc: "Lorem ipsum dolor" 
    },
    { 
      id: 6, 
      name: 'Mouse',
      type: 'Crops',
      quantity: 50, 
      price: 50, 
      image: 'https://cdn.arstechnica.net/wp-content/uploads/2021/11/High_Resolution_JPG-POP-Mouse-Wave-1.jpg',
      desc: "Lorem ipsum dolor" 
    },
    {
      id: 7,
      name: 'Smart Watch',
      type: 'Crops',
      quantity: 50,
      price: 199,
      image: 'https://down-ph.img.susercontent.com/file/ph-11134207-7qul5-lj24q2lz6waud0',
      desc: "Lorem ipsum dolor" 
    },
    {
      id: 8,
      name: 'Smart Watch',
      type: 'Crops',
      quantity: 50,
      price: 199,
      image: 'https://down-ph.img.susercontent.com/file/ph-11134207-7qul5-lj24q2lz6waud0',
      desc: "Lorem ipsum dolor" 
    },
  ];

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
          <input type="text" placeholder="Search a product" className="searchInput"></input>
          <i className="material-icons searchIcon">search</i>
        </div>
        <div className="searchBar">
          <select id="my-select" value={selectedSort} onChange={handleSelectChange} className="searchInput">
            <option value="">Sort by</option>
            <option value="productname">Product Name</option>
            <option value="producttype">Product Type</option>
            <option value="productprice">Product Price</option>
            <option value="productqty">Product Quantity</option>
          </select>
          <i className="material-icons searchIcon">keyboard_arrow_down</i>
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
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>
                <div className="product">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <span className="product-name">{product.name}</span>
                </div>
              </td>
              <td>{product.type}</td>
              <td>${product.price}</td>
              <td>{product.quantity}</td>
              <td className="product-desc">{product.desc}</td>
              <td className="product-actions">
              <i className = "material-icons">edit</i>
              <i className = "material-icons">delete</i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}