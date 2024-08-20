import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; // Import the CSS file for styling

const Navbar = () => {
  // Retrieve user ID from local storage
  const userId = localStorage.getItem('user_id');

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="https://flowbite.com/docs/images/logo.svg" alt="Logo" className="logo-img" />
          Art Gallery
        </Link>
        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/artworks" className="nav-link">Artworks</Link>
          {/* Conditionally render Profile link if user is logged in */}
          {userId ? (
            <Link to={`/artist/${userId}`} className="nav-link">Profile</Link>
          ) : (
            <Link to="/" className="nav-link">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
