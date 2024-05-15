import React from 'react';
import Card from './Card.jsx'
import Cart from './Cart.jsx';
import { useState, useEffect } from 'react';
import './ShopCart.css';
import axios from 'axios';

function ShoppingCart() {

    const [id, setId] = useState(['']);
    const [name, setName] = useState(['']);
    const [price, setPrice] = useState(['']);
    const [image, setImage] = useState(['']);

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
    }, []); // Empty dependency array ensures the effect runs only once on component mount
  
    const addToCart = (product) => {
      const checkItem = cartItems.findIndex(item => item.id === product.id);
  
      if (checkItem !== -1) {
        const currShopCart = [...cartItems];
        currShopCart[checkItem].quantity += 1;
        setCartItems(currShopCart);
        // console.log("Cart Items:", cartItems);

      } else {
        setCartItems([...cartItems, { ...product, quantity: 1 }]);
      }
    };

    const addProd = (event) => {
      axios
      .post('http://localhost:3000/addProduct', { id, name, price, image })
      .then(() => {
        alert('Added to Cart')
        navigate('/shopcart')
      })
      .catch((error) => {
          console.log('Unable to add')
      })
    }

    const removeFromCart = (productId) => {
      setCartItems(cartItems.filter(item => item.id !== productId));
    };

    const setProductDeets = (prod) => {
      console.log(prod)
      setId(prod.id)
      console.log(id)
      console.log("==========================================")
      setName(prod.name)
      setPrice(prod.price)
      setImage(prod.image)
      addProd()
    }
  
    // the whole body of the website
    return (
      <div className="appContainer">
        <div className="main-content">
          <div className='mainCont'>
            <div className="goods">
              {products.map(product => (
                <>
                <Card key={product.id} product={product} addProduct={() => {addProduct}} onAddToCart={addToCart} />
                {/* <button onClick={setId(product.id)}>SET</button> */}
                <button onClick={() => setProductDeets(product)
                
              }>HERE</button>
                </>
              ))}
            </div>
            <Cart cartItems={cartItems} removeFromCart={removeFromCart}/>
          </div>
        </div>
      </div>
    );
  }
  
  export default ShoppingCart;