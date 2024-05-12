import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import "./ListButton.css"; // Import the CSS file

export default function ListButton({
  icon,
  text,
  dropdownContent,
  drawerOpen,
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    //reset the local open/close state when the drawer is closed
    if (!drawerOpen) {
      setIsOpen(false);
    }
  }, [drawerOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div
        className={`list-tile-button ${isOpen ? "list-tile-open" : ""}`}
        onClick={toggleDropdown}
      >
        <i className="material-icons">{icon}</i>
        <p>{text}</p>

        {isOpen ? (
          <i className="material-icons arrow-down">keyboard_arrow_up</i>
        ) : (
          <i className="material-icons arrow-down">keyboard_arrow_down</i>
        )}
      </div>
      {isOpen && ( // Render dropdown content if toggleDropdown is true
        <ul className="dropdown-content">
          {dropdownContent.map((item, index) => (
            <a key={index} className="dropdown-link">
              <Link to={item.url} className="dropdown-link-text">
                {item.text}
              </Link>
            </a>
          ))}
        </ul>
      )}
    </div>
  );
}
