import React, { useState } from "react";
import ListButton from "./ListButton";
import "./Admin.css"; // Import the CSS file
import { Outlet } from "react-router-dom";

export default function AdminDashboardPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <button
          className="navbar-toggle"
          style={{ marginLeft: drawerOpen ? "140px" : "0" }}
          onClick={toggleDrawer}
        >
          ☰
        </button>
        <div className="navbar-logo">Logo</div>
      </nav>

      {/* Drawer */}
      <div className={`drawer ${drawerOpen ? "drawer-open" : "drawer-closed"}`}>
        <button className="drawer-button" onClick={toggleDrawer}>
          ☰
        </button>
        <ListButton
          icon="home"
          text="HOME"
          dropdownContent={[
            { text: "Home", url: "/#" },
            { text: "Dropdown Item 2", url: "#" },
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
