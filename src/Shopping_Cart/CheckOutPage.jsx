import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PlaceOrderTab from './PlaceOrder';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [email, setEmail] = useState([]);

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
  
  // DELETE CART IN DATABASE
  const handleDeleteClick = async (product) => {
    try {
      const userCart = {productId: product.id, user: email};
      console.log("handleDeleteClick: ", userCart)
      deleteProduct(userCart);
      removeFromCart(product.id); // Remove the product from the cart
    } catch (error) {
      console.error("Error deleting product:", error.message);
    }
  };

  const deleteProduct = async (product) => {
    try {
      console.log(product.user)
      console.log('hmm',product.productId)
      // console.log(produc)
      const deleteResponse = await axios.post('http://localhost:3000/deleteProductCart', { productId: product.productId,  user: product.user});
      console.log("Sup")
      console.log(deleteResponse);
      // fetchProducts();
      // Optionally handle the response
    } catch (error) {
      console.error("Error deleting product:", error.message);
      throw error;
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  return (
    <div className='finalDiv'>
      <div className='placeOrder'>
        <PlaceOrderTab className="ssCheckout" />
        <div className='buongCheckout'>
          <h1>Checkout</h1>
          <div className='checkoutItems'>
            {cartItems.length === 0 ? (
              <p>No Items in Cart</p>
              ) : (
              cartItems.map(item => (
                <div key={item.id} className="eachItem">
                  <img className="checkoutImg" src={item.image} alt={item.name} />
                  <h3 className="checkoutItemName">{item.name}</h3>
                  <p className="checkoutItemPrice">₱{item.price}</p>
                  <p className="checkoutItemQuantity">Quantity: {item.quantity}</p>
                  <button className="button" onClick={() => handleDeleteClick(item)}>
                    <img className="delItem" src="https://static-00.iconduck.com/assets.00/trash-bin-icon-2048x2048-duca73jv.png" alt="Delete" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;