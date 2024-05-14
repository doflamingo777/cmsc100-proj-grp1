import React from 'react';
// import { useParams } from 'react-router-dom';
import placeOrder from './image/screenshot.png';
// import { useState } from 'react';
// import Cart from './Cart';
import PlaceOrderTab from './PlaceOrder';

const Checkout = ( props ) => {

    const products = [
        { 
          id: 1, 
          name: 'Laptop', 
          quantity: 2,
          price: 999, 
          image: 'https://i5.walmartimages.com/seo/Lenovo-IdeaPad-3i-14-Laptop-Intel-Core-i5-1235U-8GB-RAM-512GB-SSD-Windows-11-Home-Arctic-Grey-82RJ0007US_2636a308-dc1c-4235-a1f3-cc826ed59556.6790f1aa7755583035b970d4f8ea4526.jpeg' 
        },
        { 
          id: 2, 
          name: 'Phone', 
          quantity: 2,
          price: 299, 
          image: 'https://www.compex.com.ph/cdn/shop/products/REALME-R6_4GB_8GB_CometBlue_26243e61-1726-4532-9bec-23295bc971b4_1200x1200.jpg?v=1597041228' 
        },
        { 
          id: 3, 
          name: 'iPhone', 
          quantity: 2,
          price: 1099, 
          image: 'https://powermaccenter.com/cdn/shop/files/iPhone_15_Pro_Max_Natural_Titanium_PDP_Image_Position-1__en-US_3295c924-7c21-417d-870c-32bee7f1e310_1445x.jpg?v=1695861436' 
        },
        { 
          id: 4, 
          name: 'Headset', 
          quantity: 2,
          price: 75, 
          image: 'https://jblstore.com.ph/cdn/shop/files/JBLTune520BT_Blue_1_600x.png?v=1689752682' 
        },
        { 
          id: 5, 
          name: 'Keyboard', 
          quantity: 2,
          price: 150, 
          image: 'https://d1rlzxa98cyc61.cloudfront.net/catalog/product/cache/1801c418208f9607a371e61f8d9184d9/1/8/181502_2022_1.jpg' 
        },
      ];

    return (
        <div className='finalDiv'>
            <div className='placeOrder'>
                {/* <img className='ssCheckout' src= {placeOrder} ></img> */}
                <PlaceOrderTab className="ssCheckout"/>
                <div className='buongCheckout'>
                    <h1>Checkout</h1>
                    <div className='checkoutItems'>
                      
                    {products.map(item => (
                        <div key={item.id} className="eachItem">
                                <input type="checkbox"/>
                                <img className="checkoutImg" src={item.image}></img>
                                <h3 className="checkoutItemName">{item.name}</h3>
                                <p className="checkoutItemPrice">${item.price}</p>
                                <p className="checkoutItemQuantity">Quantity: {item.quantity}</p>
                                <img className='delItem' src='https://static-00.iconduck.com/assets.00/trash-bin-icon-2048x2048-duca73jv.png'></img>
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
