import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router';
import "./layout.css"
import { useState } from 'react';

const Header = () => {
    const location = useLocation();
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 450);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    
    console.log(isMobile);

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




