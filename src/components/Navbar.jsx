// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css';  // Import the CSS file

const Navbar = ({ authData, onLogout }) => {
    return (
        <nav>
            <div className="logo">
                <Link to="/">E-Commerce</Link>
            </div>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/health-check">Health Check</Link></li>
                {authData ? (
                    <>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><button onClick={onLogout}>Logout</button></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;