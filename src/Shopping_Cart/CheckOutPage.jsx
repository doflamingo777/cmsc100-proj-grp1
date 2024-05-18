import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PlaceOrderTab from './PlaceOrder';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch products from the server when the component mounts
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/getAllCheckOut');
        console.log(response);
        setCartItems(response.data); // Update state with products data
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  },[]); // Empty dependency array ensures the effect runs only once on component mount

  // DELETE CART IN DATABASE
  const handleDeleteClick = async (product) => {
    try {
      console.log("Hello")
      deleteProduct(product); // Wait for the delete operation to complete
      removeFromCart(product.id); // Remove the product from the cart
    } catch (error) {
      console.error("Error deleting product:", error.message);
    }
  };

  const deleteProduct = async (product) => {
    try {
      console.log(product)
      console.log(product._id)
      // console.log(produc)
      const deleteResponse = await axios.post('http://localhost:3000/deleteProductCart', { _id: product._id });
      console.log("Sup")
      console.log(deleteResponse);
      // fetchProducts();
      // Optionally handle the response
    } catch (error) {
      console.error("Error deleting product:", error.message);
      throw error; // Rethrow the error to be caught in handleDeleteClick
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  return (
    <div className='finalDiv'>
      <div className='placeOrder'>
        <PlaceOrderTab cartItems={( cartItems )} className="ssCheckout" />
        <div className='buongCheckout'>
          <h1>Checkout</h1>
          <div className='checkoutItems'>
            {cartItems.map(item => (
              <div key={item.id} className="eachItem">
                <input type="checkbox" />
                <img className="checkoutImg" src={item.image} alt={item.name} />
                <h3 className="checkoutItemName">{item.name}</h3>
                <p className="checkoutItemPrice">${item.price}</p>
                <p className="checkoutItemQuantity">Quantity: {item.quantity}</p>
                <button className="button" onClick={() => handleDeleteClick(item)}>
                  <img className="delItem" src="https://static-00.iconduck.com/assets.00/trash-bin-icon-2048x2048-duca73jv.png" alt="Delete" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;