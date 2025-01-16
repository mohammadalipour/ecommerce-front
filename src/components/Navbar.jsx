// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Navbar = ({ authData, onLogout }) => {
    return (
        <nav>
            <div className="topHeader">
                <div className="header">
                    <div className="logo">
                        <Link to="/"><img src="logo.png"/></Link>
                    </div>
                    <div className="search">
                        <div className="search-container">
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Search..."
                            />
                            <i className="bi bi-search search-icon"></i>
                        </div>
                    </div>
                    <div className="cart">
                        <Link to="/login"><div className="cart-ico"><i className="bi bi-person-fill"></i> <span>Login</span></div></Link>
                        <Link to="/cart">
                            <span className="count">1</span>
                            <div className="cart-ico"><i className="bi bi-cart-fill"></i> <span>Cart</span></div>
                        </Link>
                    </div>
                </div>
            </div>


            <ul className="nav-links">
                <li>
                    <Link to="/">
                        <i className="bi bi-grid-fill grid"></i> Shop By Department
                        <i className="bi bi-chevron-down arrow"></i>
                    </Link>
                </li>
                <span className="divider"> | </span>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/health-check">Health Check</Link></li>
                {authData ? (
                    <>
                        <li><Link to="/profile">Profile</Link></li>
                        <li>
                            <button onClick={onLogout}>Logout</button>
                        </li>
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