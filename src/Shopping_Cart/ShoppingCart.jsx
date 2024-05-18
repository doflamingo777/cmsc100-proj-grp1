import React from 'react';
import Card from './Card.jsx'
import Cart from './Cart.jsx';
import { useState, useEffect } from 'react';
import './ShopCart.css';
import axios from 'axios';
// import { deleteProduct } from '../../backend/controller/shopping.js';

function ShoppingCart() {

    const [id, setId] = useState(['']);
    const [name, setName] = useState(['']);
    const [price, setPrice] = useState(['']);
    const [image, setImage] = useState(['']);
    const [desc, setDesc] = useState(['']);
    const [qty, setQty] = useState(['']);
    const [type, setType] = useState(['']);
    

    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    // const [selectedSort, setSelectedSort] = useState('');
  
    // const handleSelectChange = (event) => {
    //   setSelectedSort(event.target.value);
    // };
  
    useEffect(() => {
      // Fetch products from the server when the component mounts
      const fetchProducts = async () => {
        try {
          const response = await axios.get('http://localhost:3000/getAllProduct');
          setProducts(response.data); // Update state with products data
          // console.log(response.data);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
  
      fetchProducts();
  
      // Clean up function
      return () => {
        // Optionally, perform cleanup or cancel any pending requests
      };
    },); // Empty dependency array ensures the effect runs only once on component mount
  
    const addToCart = (product) => {
      const checkItem = cartItems.findIndex(item => item.id === product.id);
  
      if (checkItem !== -1) {
        const currShopCart = [...cartItems];
        currShopCart[checkItem].boughtQty += 1;
        setCartItems(currShopCart);
        
      } else {
        setCartItems([...cartItems, { ...product, boughtQty: 1 }]);
        console.log("Cart Items:", cartItems);
      }
    };

    const addProd = (product) => {
      console.log("Adding product:", product);
  
      axios
        .post('http://localhost:3000/addProduct', product)
        .then(() => {
          console.log('Product added successfully');
          // Ensure navigate is defined and used correctly if needed
          // navigate('/shopcart');
        })
        .catch((error) => {
          console.log('Unable to add product:', error);
        });
    };

    const removeFromCart = (productId) => {
      console.log(productId)
      console.log("Help ME PLEASEEEEEE", productId)
      setCartItems(cartItems.filter(item => item.id !== productId));
    };

    const delFromCart = async (product) => {
      try {
        console.log(product)
        console.log(product)
        // console.log(produc)
        const deleteResponse = await axios.post('http://localhost:3000/deleteProductCart', { _id: product });
        console.log("Sup")
        console.log(deleteResponse);
        // fetchProducts();
        // Optionally handle the response
      } catch (error) {
        console.error("Error deleting product:", error.message);
        throw error; // Rethrow the error to be caught in handleDeleteClick
      }
    };

    const setProductDeets = async (prod) => {
      // console.log(prod);
    
      try {
        //check if the product already exists in the database
        const response = await axios.get(`http://localhost:3000/getAProductForCarts?id=${prod.id}`);
        const existingProduct = response.data.length > 0 ? response.data[0] : null;
    console.log('hereasdsdaasdasd:',response.data);
        if (existingProduct) {
          //if the product exists, update its quantity
          const updatedProduct = { ...existingProduct, boughtQty: existingProduct.boughtQty + 1 };
          await axios.post('http://localhost:3000/editAProductForCarts', updatedProduct);
          console.log('Product quantity updated:', updatedProduct);
        } else {
          //if the product does not exist, add it to the database and initialize
          const newProduct = { ...prod, boughtQty: 1 };
          addProd(newProduct);
          console.log('Product added to the database:', newProduct);
        }

        //unncessary codes tinanggal ko -riggs

        // // Update local state with product details
        // setId(prod.id);
        // setName(prod.name);
        // setPrice(prod.price);
        // setImage(prod.image);
        // setDesc(prod.desc);
        // setQty(prod.qty);
        // setType(prod.type);
    
        // const obj = {
        //   id: prod.id,
        //   name: prod.name,
        //   price: prod.price,
        //   image: prod.image,
        //   desc: prod.desc,
        //   qty: prod.qty,
        //   type: prod.type,
        // };
    
        // console.log(obj);
      } catch (error) {
        console.error('Error checking or updating product:', error);
      }
    };
    
    const handleDeleteProduct = (product_id) => {
      console.log("BOOM", product_id)
      removeFromCart(product_id)
      delFromCart(product_id)
    }

    const handleAddToCartAndSetDeets = (product) => {
      setProductDeets(product);
      addToCart(product);
    };
  
    // the whole body of the website
    return (
      <div className="appContainer">
        <div className="main-content">
          <div className='mainCont'>
            <div className="goods">
              {products.map(product => (
                <Card 
                  key={product.id} 
                  product={product} 
                  onAddToCart={() => handleAddToCartAndSetDeets(product)} 
                />
              ))}
            </div>
            <Cart removeFromCart={handleDeleteProduct}/>
          </div>
        </div>
      </div>
    );
  }
  
  export default ShoppingCart;