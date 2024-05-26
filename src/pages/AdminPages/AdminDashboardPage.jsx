import React, { useState } from "react";
import ListButton from "./ListButton";
import "./Admin.css"; // Import the CSS file
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // dinagdag ni bryan
import ProfileDropdown from "./ProfileDropdown";

export default function AdminDashboardPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const mail = localStorage.getItem('email');
  console.log(mail)
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };


  //-------------------
  //Dinagdag ko muna -Bryan

  //-------------------

  return (
    <>
           <div className='top-bar'>
        <div className='contact-info'>
          <span><i className='icon fa fa-phone'></i> +63 999 8342342</span>
          <span><i className='icon fa fa-envelope'></i> contact@farmtotable.com</span>
        </div>
        <div className='social-icons'>
          <a href='https://www.instagram.com' target='_blank' rel='noopener noreferrer'><i className="fi fi-brands-instagram"></i></a>
          <a href='https://www.facebook.com' target='_blank' rel='noopener noreferrer'><i className="fi fi-brands-youtube"></i></a>
          <a href='https://www.facebook.com' target='_blank' rel='noopener noreferrer'><i className="fi fi-brands-facebook"></i></a>
          <a href='https://www.twitter.com' target='_blank' rel='noopener noreferrer'><i className="fi fi-brands-twitter"></i></a>
          
        </div>
      </div>
      {/* Navbar */}
      <nav className="navbar">
        <button
          className="navbar-toggle"
          style={{ marginLeft: drawerOpen ? "140px" : "0" }}
          onClick={toggleDrawer}
        >
          ☰
        </button>
        <div className="nav-logo">Farm-to-Table</div>

        {/*dinagdag ni bryan for testing*/}

        


        <ProfileDropdown />
        
      </nav>

      {/* Drawer */}
      <div className={`drawer ${drawerOpen ? "drawer-open" : "drawer-closed"}`}>
        <button className="drawer-button" onClick={toggleDrawer}>
        <i className="material-icons">arrow_back_ios</i>
        </button>
        <ListButton
          icon="home"
          text="HOME"
          dropdownContent={[
            { text: "Home", url: "adminhomepage" },
          ]}
          drawerOpen={drawerOpen}
        />
        <ListButton
          icon="dashboard"
          text="DASHBOARD"
          dropdownContent={[
            { text: "Users", url: "usermanagementpage" },
            { text: "Products", url: "productlistadminpage" },
            { text: "Orders", url: "orderfulfillmentpage" },
            { text: "Sales", url: "salesreportpage" },
          ]}
          drawerOpen={drawerOpen}
        />
        <footer className={drawerOpen ? "admin-footer active" : "admin-footer"}>
        &copy; 2024 Farm-to-Table. All rights reserved.
      </footer>
      </div>
          
      {/* Content */}
      <div
        className="drawer-content"
        style={{ marginLeft: drawerOpen ? "200px" : "0" }}
      >
        {/* <div>
          <p>Welcome to the homepage.</p>
        </div> */}
        <Outlet/>
      </div>
    </>
  );
}
