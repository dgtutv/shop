import React from 'react';
import { NavLink, useLocation } from 'react-router';

const Header = () => {
    const location = useLocation();
    
    const headerStyle = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        backgroundColor: "#181818ff",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.86).1)",
        width: "100%",
    }

    const navStyle = {
        display: "flex",
        gap: "2rem",
        alignItems: "center"
    }

    const linkStyle = {
        textDecoration: "none",
        color: "#e4e4e4",
        fontWeight: "500",
        padding: "0.5rem 1rem",
        borderRadius: "2px",
        transition: "all 0.2s ease-in-out"
    }

    const activeLinkStyle = {
        ...linkStyle,
        backgroundColor: "#202020ff",
        fontWeight: "600",
        borderBottom: "2px solid yellow",
        color: "yellow"
    }

    const titleStyle = {
        margin: 0, 
        fontSize: "1.5rem"
    }

    return (
        <header style={headerStyle}>
            <h1 style={titleStyle}>
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
            <nav style={navStyle}>
                <NavLink 
                    to="/" 
                    style={({ isActive }) => isActive ? activeLinkStyle : linkStyle}
                >
                    Home
                </NavLink>
                <NavLink 
                    to="/shop" 
                    style={({ isActive }) => isActive ? activeLinkStyle : linkStyle}
                >
                    Shop
                </NavLink>
                <NavLink 
                    to="/cart" 
                    style={({ isActive }) => isActive ? activeLinkStyle : linkStyle}
                >
                    Cart
                </NavLink>
            </nav>
        </header>
    );
};

export default Header;




