import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PlaceOrderTab() {

    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // Fetch products from the server when the component mounts
        const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/getAllCheckOut');
            // console.log(response);
            setCartItems(response.data); // Update state with products data
        } catch (error) {
            console.error('Error fetching products:', error);
        }
        };
        fetchProducts();
    },[]); // Empty dependency array ensures the effect runs only once on component mount


    const ColoredLine = ({ color }) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                opacity: 0.3,
                height: 2
            }}
        />
    );

    // useEffect(() => {
    //     // Calculate total quantity and total price when cartItems changes
    //     console.log("cartItems:", cartItems); // Debugging output
    
    //     // const newTotalQuantity = cartItems.reduce((total, item) => {
    //     //     console.log("item.quantity:", 1); // Debugging output
    //     //     return total + 1;
    //     // }, 0);
    
    //     const newTotalPrice = cartItems.reduce((total, item) => {
    //         console.log("item.price:", item.price); // Debugging output
    //         return total + item['price'] * item['quantity'];
    //     }, 0);
    
    //     // setTotalQuantity(newTotalQuantity);
    //     // setTotalPrice(newTotalPrice);
    // }, [cartItems]);

    const addOrderTransac = (products) => {

        const mail = localStorage.getItem('email');
        console.log(mail)
        
        products.forEach((product) => {
            const { id } = product; // Extract id , price and name
            console.log({ id  })
            axios
                .post('http://localhost:3000/addOrderTransac', { id })
                .then(() => {
                    console.log('Product added successfully:', id);
                })
                .catch((error) => {
                    console.log('Unable to add product:', id, error);
                });
        });
    };

    const totalPrice = 140

    return (
        <div className="whole-order">
            <div className='bottomSummPart'>
                <div className="orderSummary">
                    <h4 className='orderSummText'>Order Summary</h4>
                    <ColoredLine className="orderLine" color="gray" />
                    <div className='totPriceBar'>
                        <h5>Total: </h5> 
                        <h5> $ {totalPrice} </h5> 
                    </div>
                </div>
                <div className="OrderButt">
                    <button className="PlaceOrderNow" onClick={() => addOrderTransac(cartItems)}>
                        Place Order Now
                    </button>
                </div>
            </div>

        </div>
    );
}

export default PlaceOrderTab;
