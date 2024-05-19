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
    const [email, setEmail] = useState([]);
    // const [selectedSort, setSelectedSort] = useState('');
  
    // const handleSelectChange = (event) => {
    //   setSelectedSort(event.target.value);
    // };
  
    useEffect(() => {
      // Fetch products from the server when the component mounts
      const fetchProducts = async () => {
        try {
          const response = await axios.get('http://localhost:3000/getAllProduct');
          const responseUser = await axios.get(`http://localhost:3000/getAUser?email=${localStorage.getItem('email')}`);

          setProducts(response.data); // Update state with products data
          setEmail(responseUser.data[0]);
          // console.log(responseUser.data);
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
      console.log('AHJAHAHAHAHAHAHHA',cartItems)
      console.log("removeFrmCart: ", productId)
      setCartItems(cartItems.filter(item => item.id !== productId));
    };

    const delFromCart = async (product) => {
      try {
        // console.log(product)
        // console.log(product)
        const deleteResponse = await axios.post('http://localhost:3000/deleteProductCart', { productId: product.id,  user: product.user});
        // console.log("Sup")
        console.log(deleteResponse);
        // fetchProducts();
        // Optionally handle the response
      } catch (error) {
        console.error("Error deleting product:", error.message);
        throw error;
      }
    };

    const setProductDeets = async (prod) => {
      try {
        // Fetch the product details
        const response = await axios.get(`http://localhost:3000/getAProductForCarts?id=${prod.id}`);
        // Fetch the user details
        const responseUser = await axios.get(`http://localhost:3000/getAUser?email=${localStorage.getItem('email')}`);
        const user = email;
        
        if (!user) {
          throw new Error('User not found');
        }
        
        // Check if the product exists in the user's cart
        const existingProductIndex = user.shopping_cart.findIndex(
          (item) => item.productId === prod.id
        );
    
        if (existingProductIndex >= 0) {
          // If the product exists in the cart, update its quantity
          user.shopping_cart[existingProductIndex].quantity += 1;
          console.log('Product quantity updated in cart:', user.shopping_cart[existingProductIndex]);
          console.log(user.shopping_cart);
        } else {
          // If the product does not exist in the cart, add it
          user.shopping_cart.push({ productId: prod.id, quantity: 1,  price: prod.price});
          console.log('Product added to cart:', { productId: prod.id, quantity: 1 });
        }
        setCartItems(cartItems)
        // console.log('hereDSFKLKLFJADS:',cartItems);
        // Update the user in the database
        await axios.post('http://localhost:3000/updateUserCart', user);
        console.log('User cart updated successfully');
      } catch (error) {
        console.error('Error checking or updating product in cart:', error);
      }
    };
    
    
    const handleDeleteProduct = (product_id) => {
      console.log("handleDeleteProduct", product_id)
      removeFromCart(product_id)
      const productinCart = {id: product_id, user: email};
      delFromCart(productinCart)
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