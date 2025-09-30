import React from 'react';
import { NavLink, useLocation } from 'react-router';
import "./layout.css"

const Header = () => {
    const location = useLocation();

    return (
        <header>
            <h1>
                {(() => {
                    switch (location.pathname) {
                        case "/shop":
                            return "Shop";
                        case "/cart":
                            return "Cart";
                        default:
                            return "Home";
                    }
                })()}
            </h1>
            <nav>
                <NavLink 
                    to="/" 
                    className={({ isActive }) => isActive ? "activeLinkStyle" : "linkStyle"}
                >
                    Home
                </NavLink>
                <NavLink 
                    to="/shop" 
                    className={({ isActive }) => isActive ? "activeLinkStyle" : "linkStyle"}
                >
                    Shop
                </NavLink>
                <NavLink 
                    to="/cart" 
                    className={({ isActive }) => isActive ? "activeLinkStyle" : "linkStyle"}
                >
                    Cart
                </NavLink>
            </nav>
        </header>
    );
};

export default Header;




