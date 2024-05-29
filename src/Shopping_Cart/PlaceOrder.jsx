import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './ShopCart.css';

function PlaceOrderTab() {

    const [cartItems, setCartItems] = useState([]);
    const [totPrice, setTotPrice] = useState([0]);
    const [showPopup, setShowPopup] = useState(false);
    const [email, setEmail] = useState([]);
    const navigate = useNavigate();
    // console.log(cartItems)

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
            setEmail(user);

            if (!user) {
              throw new Error('User not found');
            }
            
            //map through user's shopping cart and get detailed product information
            const updatedCartItems = user.shopping_cart.map(cartItem => {
              const product = products.find(product => product.id === cartItem.productId);
      
              if (product) {
                //merge product details with cart item
                return { ...product, quantity: cartItem.quantity };
              } else {
                //if product details are not found, keep the cart item as is
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
    // Function to calculate the total price
    const calculateTotalPrice = (items) => {
        return items.reduce((total, item) => {
            return total + item['quantity'] * item['price'];
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
        
        const userId = email._id; 
        console.log('here', email);
        axios
          .post('http://localhost:3000/resetCart', { userId })
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
        // console.log('here:', mail);

        if (products == null || products == 0) {
            alert("Please add items in the shopping Cart.")
            navigate('/shopcart')
        }
        
        products.forEach((product) => {
            const { id, quantity } = product; // Extract id , price and name
            axios
                .post('http://localhost:3000/addOrderTransac', { id, quantity, mail })
                .then(() => {
                    console.log('Product added successfully:', id, quantity, mail);
                    setShowPopup(true);
                    
                })
                .catch((error) => {
                    console.log('Unable to add product:', id, error);
                });
            });
            resetCartItems();
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
                        <h5> ₱ {totPrice} </h5> 
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
