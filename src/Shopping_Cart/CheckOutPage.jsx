import React from 'react';
// import { useParams } from 'react-router-dom';
import placeOrder from './image/screenshot.png';
// import { useState } from 'react';
// import Cart from './Cart';

const Checkout = ( props ) => {

    // Ensure that props.location.state exists before accessing its properties
    console.log("WTF ", props)
    const cartItems = props;
    console.log("Help", props)
    // Check if cartItems is defined before using it
    if (!cartItems) {
        return (
            <div className="buongCheckout">
                <h2>Checkout</h2>
                <p>No items in the cart.</p>
            </div>
        );
    }

    return (
        <div className='finalDiv'>
            <div className='placeOrder'>
                <img className='ssCheckout' src= {placeOrder} ></img>
                <div className='buongCheckout'>
                    <h1>Checkout</h1>
                    <div className='checkoutItems'>
                    {cartItems.map(item => (
                        <div key={item.id} className="checkoutItem">
                            <div className="checkoutItemDetails">
                                <h3 className="checkoutItemName">{item.name}</h3>
                                <p className="checkoutItemPrice">${item.price}</p>
                                <p className="checkoutItemQuantity">Quantity: {item.quantity}</p>
                            </div>
                        </div>
                    ))}
                    </div>
                {/* <h3>Total: ${cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)}</h3> */}
                {/* <Cart cartItems={cartItems} removeFromCart={removeFromCart}/> */}
                </div>
            </div>
        </div>
    );
};

export default Checkout;
