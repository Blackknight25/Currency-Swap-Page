import React from 'react';
import './TopNavBar.css'; // Import your CSS file for styling

const TopNavBar = () => {
  return (
    <div className="top-navbar">
      <div className="logo">
        Mel's DeFi
      </div>
      <div className="nav-links">
        <button className="nav-button">Home</button>
        <button className="nav-button">Products</button>
        <button className="nav-button">Services</button>
        <button className="nav-button">About</button>
        <button className="nav-button">Contact</button>
      </div>
    </div>
  );
}

export default TopNavBar;