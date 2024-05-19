import React from 'react';
import { Link } from 'react-router-dom';
import Checkout from './CheckOutPage';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Cart({ removeFromCart }) {

    const [cartItems, setCartItems] = useState([]);

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

    useEffect(() => {
        // Fetch products from the server when the component mounts
        const fetchProducts = async () => {
          try {
            // Fetch all products
            const response = await axios.get('http://localhost:3000/getAllProduct');
            const products = response.data;
      
            // Fetch user details
            const responseUser = await axios.get(`http://localhost:3000/getAUser?email=${localStorage.getItem('email')}`);
            const user = responseUser.data[0];
            
            if (!user) {
              throw new Error('User not found');
            }
            
            //map through user's shopping cart and get detailed product information
            const updatedCartItems = user.shopping_cart.map(cartItem => {
              const product = products.find(product => product.id === cartItem.productId);
      
              if (product) {
                //merge product details with cart item
                // console.log(product,'hehe')
                return { ...product, quantity: cartItem.quantity };
              } else {
                //if product details are not found, i should already delete that product in the users shopping cart to avoid conflict
                const userCart = {id: cartItem.productId, user: user};
                delFromCart(userCart)
                console.log(cartItem.productId);
                return cartItem;
              }
            });
      
            setCartItems(updatedCartItems); // Update state with the merged cart items
            // console.log('Updated cart items:', updatedCartItems);
          } catch (error) {
            console.error('Error fetching products or user:', error);
          }
        };
        
        fetchProducts();
      });
      

    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState();

    useEffect(() => {
        // console.log("cartItems:", cartItems);
    
        const newTotalQuantity = cartItems.reduce((total, item) => {
            // console.log("item.quantity:", 1);
            return total + 1;
        }, 0);
    
        const newTotalPrice = cartItems.reduce((total, item) => {
            // console.log("item.price:", item.price); // Debugging output
            // console.log("HELP ME ", item.price)
            return total + (item.price * item.quantity);
        }, 0);
        // console.log("New total Price: ",newTotalPrice);
        setTotalQuantity(newTotalQuantity);
        setTotalPrice(newTotalPrice);
    });
    
    return (
        <div className="mainCart">
            <h2>Shopping Cart</h2>
            <p>Total Quantity: {totalQuantity}</p>
            <p>Total Price: {totalPrice}</p>
            <Link to="/checkout" > Checkout </Link>
            <div className="cartItems">
                {cartItems.map(item => (
                    <div key={item.id} className="cartItem">
                        <div className="cartItemDetails">
                            <h3 className="cartItemName">{item.name}</h3>
                            <p className="cartItemPrice">${item.price}</p>
                            <p className="cartItemQuantity">Quantity: {item.quantity}</p>
                        </div>
                        <button className="removeButton" onClick={() => removeFromCart(item.id)}>Remove</button>
                        {/* <button className="removeButton" onClick={() => console.log(item._id)}>Check</button> */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Cart;
