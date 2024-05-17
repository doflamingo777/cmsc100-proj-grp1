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
  const [desc, setDesc] = useState(['']);
  const [qty, setQty] = useState(['']);
  const [type, setType] = useState(['']);
  

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

    // const [prodDelete, setProductToDelete] = useState(null);
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
    }); // Empty dependency array ensures the effect runs only once on component mount
    

    // ADD ITEMS INTO CART VISUALLY (HINDI NAG REREFLECT SA DATABASE)
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

    const addProd = (product) => {
      console.log("Adding product:", product);
  
      axios
        .post('http://localhost:3000/addProduct', product)
        .then(() => {
          // alert('Product added successfully');
          // Ensure navigate is defined and used correctly if needed
          // navigate('/shopcart');
        })
        .catch((error) => {
          console.log('Unable to add product:', error);
        });
    };

    const removeFromCart = (productId) => {
      setCartItems(cartItems.filter(item => item.id !== productId));
    };

    // Sets the detils ng items
    const setProductDeets = (prod) => {
      console.log(prod)
      console.log(prod.id)
      console.log("==========================================")

      setId(prod.id)
      setName(prod.name)
      setPrice(prod.price)
      setImage(prod.image)
      setDesc(prod.desc)
      setQty(prod.qty)
      setType(prod.type)
      
      const obj = {
        id: prod.id,
        name: prod.name,
        price: prod.price,
        image: prod.image,
        desc: prod.desc,
        qty: prod.qty,
        type: prod.type
      };
    
      console.log(obj);
      addProd(obj)
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
            <Cart cartItems={cartItems} removeFromCart={removeFromCart}/>
          </div>
        </div>
      </div>
    );
  }
  
  export default ShoppingCart;