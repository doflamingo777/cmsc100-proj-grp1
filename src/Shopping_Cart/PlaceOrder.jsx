import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function PlaceOrderTab() {

    const [cartItems, setCartItems] = useState([]);
    const [totPrice, setTotPrice] = useState([0]);
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();
    console.log(cartItems)

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

    // Function to calculate the total price
    const calculateTotalPrice = (items) => {
        return items.reduce((total, item) => {
            return total + item['boughtQty'] * item['price'];
        }, 0);
    };

    // Recalculate total price whenever cartItems change
    useEffect(() => {
        const totalPrice = calculateTotalPrice(cartItems);
        setTotPrice(totalPrice);
    }, [cartItems]);

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

    const resetCartItems = () => {
        axios
        .post('http://localhost:3000/resetCart', { cartItems })
        .then(() => {
          console.log('Cart Reset');
          setCartItems([]);
        })
        .catch((error) => {
          console.log('Cart Reset Fail: ', error);
        });
    };

    const addOrderTransac = (products) => {

        const mail = localStorage.getItem('email');
        console.log(mail)

        if (products == null || products == 0) {
            alert("Please add items in the shopping Cart.")
            navigate('/shopcart')
        }
        
        products.forEach((product) => {
            const { id } = product; // Extract id , price and name
            console.log({ id  })
            axios
                .post('http://localhost:3000/addOrderTransac', { id })
                .then(() => {
                    console.log('Product added successfully:', id);
                    setShowPopup(true);
                    resetCartItems();
                })
                .catch((error) => {
                    console.log('Unable to add product:', id, error);
                });
        });
    };

    const handlePopupClose = () => {
        setShowPopup(false);
        resetCartItems()
        navigate('/shopcart');
        console.log("handlePopup done!")
    };


    return (
        <div className="whole-order">
            <div className='bottomSummPart'>
                <div className="orderSummary">
                    <h4 className='orderSummText'>Order Summary</h4>
                    <ColoredLine className="orderLine" color="gray" />
                    <div className='totPriceBar'>
                        <h5>Total: </h5> 
                        <h5> $ {totPrice} </h5> 
                    </div>
                </div>
                <div className="OrderButt">
                    <button className="PlaceOrderNow" onClick={() => addOrderTransac(cartItems)}>
                        Place Order Now
                    </button>
                </div>
            </div>
            {showPopup && <Popup onClose={handlePopupClose} />}
        </div>
    );
}

const Popup = ({ onClose }) => {
    return (
        <div className="popup">
            <div className="popup-content">
                <p>Order Placed</p>
                <button onClick={onClose}>OK</button>
            </div>
        </div>
    );
};

export default PlaceOrderTab;
