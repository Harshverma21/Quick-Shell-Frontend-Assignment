import React, { useEffect, useState, useRef } from 'react';
import displayIcon from '../../assets/icons/Display.svg';
import arrowIcon from '../../assets/icons/down.svg';
import './Navbar.css';

const Navbar = ({ onGroupingChange, onOrderingChange, grouping, ordering }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const dropdownEl = useRef(null);
  const buttonEl = useRef(null);

  // Close the dropdown if clicking outside the dropdown or button
  const handleOutsideClick = (event) => {
    if (
      dropdownEl.current &&
      !dropdownEl.current.contains(event.target) &&
      buttonEl.current &&
      !buttonEl.current.contains(event.target)
    ) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    // Attach the event listener when the component mounts
    document.addEventListener('mousedown', handleOutsideClick);
    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  // Toggle the dropdown when the "Display" button is clicked
  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div
          className="display-button"
          onClick={toggleDropdown}
          ref={buttonEl}
        >
          <img src={displayIcon} alt="Display" className="icon" />
          Display
          <img src={arrowIcon} alt="Arrow" className="icon" />
        </div>
      </div>

      {isDropdownVisible && (
        <div ref={dropdownEl} className="dropdown">
          <div className="grouping">
            <label className="label">Grouping:</label>
            <select
              className="select"
              value={grouping}
              onChange={(e) => onGroupingChange(e.target.value)}
            >
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div className="grouping">
            <label className="label">Ordering:</label>
            <select
              className="select"
              value={ordering}
              onChange={(e) => onOrderingChange(e.target.value)}
            >
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
