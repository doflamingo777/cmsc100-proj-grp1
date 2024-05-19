import React from 'react';
import './Home.css';
import image from '../page_assets/laptop.png';

export default function Home() {
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
            <a href='/login'><button className="home-button">
            Shop Now
          </button></a>
          </p>
          
        </div>
      </div>
      <footer className="home-footer">
        &copy; 2024 Farm-to-Table. All rights reserved.
      </footer>
    </div>
  );
}
