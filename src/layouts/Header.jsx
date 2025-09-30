import React from 'react';
import { NavLink, useLocation } from 'react-router';

const Header = () => {
    const location = useLocation();
    
    const headerStyle = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        backgroundColor: "#ffffff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    }

    const navStyle = {
        display: "flex",
        gap: "2rem",
        alignItems: "center"
    }

    const linkStyle = {
        textDecoration: "none",
        color: "#6b7280",
        fontWeight: "500",
        padding: "0.5rem 1rem",
        borderRadius: "0.375rem",
        transition: "all 0.2s ease-in-out"
    }

    const activeLinkStyle = {
        ...linkStyle,
        color: "#2563eb",
        backgroundColor: "#eff6ff",
        fontWeight: "600"
    }

    return (
        <header style={headerStyle}>
            <h1 style={{ margin: 0, color: "#1f2937", fontSize: "1.5rem" }}>
                Shop - Current: {location.pathname}
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