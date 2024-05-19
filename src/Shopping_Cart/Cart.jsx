import React from 'react';
import { Link } from 'react-router-dom';
import Checkout from './CheckOutPage';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Cart({ removeFromCart }) {

    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // Fetch products from the server when the component mounts
        const fetchProducts = async () => {
          try {
            const response = await axios.get('http://localhost:3000/getAllCheckOut');
            // console.log("================");
            // console.log(response);
            // console.log("================");
            setCartItems(response.data); // Update state with products data
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        };
        fetchProducts();
    },[cartItems]);

    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState();

    useEffect(() => {
        console.log("cartItems:", cartItems);
    
        const newTotalQuantity = cartItems.reduce((total, item) => {
            console.log("item.quantity:", 1);
            return total + 1;
        }, 0);
    
        const newTotalPrice = cartItems.reduce((total, item) => {
            // console.log("item.price:", item.price); // Debugging output
            // console.log("HELP ME ", item.price)
            return total + (item.price * item.boughtQty);
        }, 0);
        console.log("New total Price: ",newTotalPrice);
        setTotalQuantity(newTotalQuantity);
        setTotalPrice(newTotalPrice);
    }, [cartItems]);
    
    return (
        <div className="mainCart">
            <h2>Shopping Cart</h2>
            <p>Total Quantity: {totalQuantity}</p>
            <p>Total Price: {totalPrice}</p>
            <Link to={{ pathname: "/checkout" }} onClick={Checkout(cartItems)} className="button"> Checkout </Link>
            <div className="cartItems">
                {cartItems.map(item => (
                    <div key={item.id} className="cartItem">
                        <div className="cartItemDetails">
                            <h3 className="cartItemName">{item.name}</h3>
                            <p className="cartItemPrice">${item.price}</p>
                            <p className="cartItemQuantity">Quantity: {item.boughtQty}</p>
                        </div>
                        <button className="removeButton" onClick={() => removeFromCart(item._id)}>Remove</button>
                        <button className="removeButton" onClick={() => console.log(item._id)}>Check</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Cart;
