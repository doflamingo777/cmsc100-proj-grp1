import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import image from '../page_assets/laptop.png';

export default function Home() {
  const navigate = useNavigate();
  
  const handleShopNowClick = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/shopcart'); // or any other page you want to navigate to if the user is logged in
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <img src={image} alt="image" />
        <div className="home-text">
          <header className="home-header">
            Connecting Fields to Fork
          </header>
          <p>
            Harvesting Freshness, 
            <br/>Nurturing Communities<br/>
            <button className="home-button" onClick={handleShopNowClick}>
              Shop Now
            </button>
          </p>
        </div>
      </div>
      <footer className="home-footer">
        &copy; 2024 Farm-to-Table. All rights reserved.
      </footer>
    </div>
  );
}
