import React from 'react';
import { Link } from 'react-router-dom';
import Checkout from './CheckOutPage';

function Cart({ cartItems, removeFromCart }) {
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    //bbl drizzy
    

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
                            <p className="cartItemQuantity">Quantity: {item.quantity}</p>
                        </div>
                        <button className="removeButton" onClick={() => removeFromCart(item.id)}>Remove</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Cart;
