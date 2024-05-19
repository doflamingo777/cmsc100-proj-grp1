// ProfileDropdown.js
import React, { useState } from 'react';
import './ProfileDropdown.css';
import { useNavigate } from 'react-router-dom';

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="action">
      <div className="profile" onClick={toggleDropdown}>
        {/* <img src="./assets/avatar.jpg" /> */}
        <i className="material-icons searchIcon">account_circle</i>
      </div>
      <div className={isOpen ? "menu active" : "menu"}>
        <h3>Department of Agriculture<br /><span>Admin</span></h3>
        <ul className='drop-down-list'>
          <li>
          <i className="material-icons searchIcon">person</i><a href="#">My profile</a>
          </li>
          <li>
          <i className="material-icons searchIcon">manage_accounts</i><a href="#">Edit profile</a>
          </li>
          <li>
          <i className="material-icons searchIcon" >logout</i><a onClick={handleSignOut}>Logout</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileDropdown;
