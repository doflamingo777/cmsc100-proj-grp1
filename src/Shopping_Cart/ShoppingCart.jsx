import React from 'react';
import Card from './Card.jsx'
import Cart from './Cart.jsx';
import { useState } from 'react';
import './ShopCart.css';

function ShoppingCart() {

    // instantiations of variables
    const navs = [
      {name: "Appliances", url: "#", id: 1}, 
      {name: "Groceries", url: "#", id: 2}, 
      {name: "Gadgets", url: "#", id: 3},
      {name: "Clothing", url: "#", id: 4},
    ];
  
    // all the products listed 
    const products = [
      { 
        id: 1, 
        name: 'Laptop', 
        price: 999, 
        image: 'https://i5.walmartimages.com/seo/Lenovo-IdeaPad-3i-14-Laptop-Intel-Core-i5-1235U-8GB-RAM-512GB-SSD-Windows-11-Home-Arctic-Grey-82RJ0007US_2636a308-dc1c-4235-a1f3-cc826ed59556.6790f1aa7755583035b970d4f8ea4526.jpeg' 
      },
      { 
        id: 2, 
        name: 'Phone', 
        price: 299, 
        image: 'https://www.compex.com.ph/cdn/shop/products/REALME-R6_4GB_8GB_CometBlue_26243e61-1726-4532-9bec-23295bc971b4_1200x1200.jpg?v=1597041228' 
      },
      { 
        id: 3, 
        name: 'iPhone', 
        price: 1099, 
        image: 'https://powermaccenter.com/cdn/shop/files/iPhone_15_Pro_Max_Natural_Titanium_PDP_Image_Position-1__en-US_3295c924-7c21-417d-870c-32bee7f1e310_1445x.jpg?v=1695861436' 
      },
      { 
        id: 4, 
        name: 'Headset', 
        price: 75, 
        image: 'https://jblstore.com.ph/cdn/shop/files/JBLTune520BT_Blue_1_600x.png?v=1689752682' 
      },
      { 
        id: 5, 
        name: 'Keyboard', 
        price: 150, 
        image: 'https://d1rlzxa98cyc61.cloudfront.net/catalog/product/cache/1801c418208f9607a371e61f8d9184d9/1/8/181502_2022_1.jpg' 
      },
      { 
        id: 6, 
        name: 'Mouse', 
        price: 50, 
        image: 'https://cdn.arstechnica.net/wp-content/uploads/2021/11/High_Resolution_JPG-POP-Mouse-Wave-1.jpg' 
      },
      {
        id: 7,
        name: 'Smart Watch',
        price: 199,
        image: 'https://down-ph.img.susercontent.com/file/ph-11134207-7qul5-lj24q2lz6waud0'
      },
      {
        id: 8,
        name: 'Tablet',
        price: 329,
        image: 'https://ansons.ph/wp-content/uploads/2022/01/GALAXY-TAB-A8-LTE_GOLD.png'
      },
      {
        id: 9,
        name: 'Gaming Console',
        price: 499,
        image: 'https://www.kimstore.com/cdn/shop/products/GMENIN0018_1_dc272abb-7083-4b41-9b12-b55233d7ad8a_533x.jpg?v=1670978604'
      },
      {
        id: 10,
        name: 'Bluetooth Speaker',
        price: 120,
        image: 'https://www.smappliance.com/cdn/shop/products/10172303-RedSide_800x.jpg?v=1645687595'
      },
      {
        id: 11,
        name: 'Camera',
        price: 600,
        image: 'https://ph.canon/media/image/2023/05/19/b89bed4e21e540f985dedebe80166def_EOS+R100+RF-S18-45mm+Front+Slant.png'
      },
      {
        id: 12,
        name: 'E-Reader',
        price: 130,
        image: 'https://m.media-amazon.com/images/I/71nrHCKt5OL.jpg'
      },
      {
        id: 13,
        name: 'Wireless Earbuds',
        price: 130,
        image: 'https://jblstore.com.ph/cdn/shop/files/JBLTune130NC_Black_1_600x.png?v=1691369979'
      },
      {
        id: 14,
        name: 'Portable Hard Drive',
        price: 90,
        image: 'https://www.lifewire.com/thmb/cIR7Pfzz5ex1tTQohDGrgAcFDOU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/western-digital-my-passport-2tb-56a6fa9b3df78cf772913ec1.jpg'
      },
      {
        id: 15,
        name: 'Monitor',
        price: 200,
        image: 'https://www.sony-africa.com/image/c040a43d6d969ef8b7db26f3f41baf92?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF'
      },
      {
        id: 16,
        name: 'This Kid',
        price: 500,
        image: 'https://scontent.fmnl17-1.fna.fbcdn.net/v/t39.30808-6/402129700_6792534717505132_7650712588900785622_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHKAOidwfYtjb4HnGuBCuEvaJGYIh0DjgJokZgiHQOOAr2p76mjKZpN76ho34HMQnXGEnc8yb_w6IxSNlNWXDoL&_nc_ohc=jnyM7sHuLYUAb61ZiAE&_nc_ht=scontent.fmnl17-1.fna&oh=00_AfAF1BfKyDR8YVoZDvTBrlntP5x1aoK0e4JaJjsJqhbmvA&oe=66325BFB'
      },
    ];
  
    const [cartItems, setCartItems] = useState([]);
  
    // const [cartItems, setCartItems] = useState([{products[0], quantity: 1}, {products[5], quantity: 1}, {products[10, quantity: 1}], {products[15, quantity: 1}]])
  
    const addToCart = (product) => {
      const checkItem = cartItems.findIndex(item => item.id === product.id);
  
      if (checkItem !== -1) {
        const currShopCart = [...cartItems];
        currShopCart[checkItem].quantity += 1;
        setCartItems(currShopCart);
      } else {
        setCartItems([...cartItems, { ...product, quantity: 1 }]);
      }
    };
  
  
    const removeFromCart = (productId) => {
      setCartItems(cartItems.filter(item => item.id !== productId));
    };
  
    // the whole body of the website
    return (
      <div className="appContainer">
        <div className="main-content">
          <div className='mainCont'>
            <div className="goods">
              {products.map(product => (
                <Card key={product.id} product={product} onAddToCart={addToCart} />
              ))}
            </div>
            <Cart cartItems={cartItems} removeFromCart={removeFromCart}/>
            
          </div>
        </div>
      </div>
    );
  }
  
  export default ShoppingCart;