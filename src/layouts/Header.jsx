import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router';
import "./layout.css"
import { useState } from 'react';
import { Box, IconButton, Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";


const Header = () => {
    const location = useLocation();
    const [isMobile, setIsMobile] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    
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

    const hamburgerMenuStyle = {
        position: "fixed",
        top: "16px",
        left: "16px",
        zIndex: 1300,
        backgroundColor: "#1976d2",
        color: "white",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.25)",
        "&:hover": {
            backgroundColor: "#1565c0",
        },
    }

    const drawerStyle = {
        "& .MuiDrawer-paper": {
            width: "320px",
            maxWidth: "85vw",
            padding: "16px",
            backgroundColor: "#f8f9fa",
            borderRight: "1px solid #e0e0e0",
        },
    }
    
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <>
        {isMobile ? (
            <header>
                <IconButton
                    sx={hamburgerMenuStyle}
                    onClick={toggleMobileMenu}
                    aria-label="open menu"
                >
                    <MenuIcon />
                </IconButton>
                <Drawer
                    anchor="left"
                    open={isMobile && mobileMenuOpen}
                    onClose={toggleMobileMenu}
                    sx={drawerStyle}
                >
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
                </Drawer>
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
            </header>
            
        ) : (
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
        )
        }
        </>
            
            
        
    );
};

export default Header;




