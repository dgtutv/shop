import React, { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import "./layout.css"
import { useState } from 'react';
import { Box, IconButton, Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";


const Header = () => {
    const location = useLocation();
    const [isMobile, setIsMobile] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState("");
    const headerRef = useRef(null);

    //Used for matching drawer color to header color (works alongside dark theme)
    const updateBackgroundColor = () => {
        if(headerRef.current){
            const element = headerRef.current;
            const computedStyle = window.getComputedStyle(element);
            const backgroundColor = computedStyle.getPropertyValue("background-color");
            console.log("Updated background color:", backgroundColor);
            setBackgroundColor(backgroundColor);
        }
    };

    //Dark theme toggle
    useEffect(() => {
        updateBackgroundColor();
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleThemeChange = () => {
            setTimeout(updateBackgroundColor, 0);
        };
        mediaQuery.addEventListener('change', handleThemeChange);
        return () => {
            mediaQuery.removeEventListener('change', handleThemeChange);
        };
    }, [])
    
    //Mobile toggle
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

    useEffect(() => {
        if (isMobile) {
            setTimeout(updateBackgroundColor, 100);
        }
    }, [isMobile]);


    //MUI element stylings
    const hamburgerMenuStyle = {
        zIndex: 1300,
        color: "white",
    }

    const drawerStyle = {
        "& .MuiDrawer-paper": {
            width: "320px",
            maxWidth: "50vw",
            padding: "16px",
            backgroundColor: backgroundColor,
            borderRight: "1px solid #e0e0e0",
        },
    }
    
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <>
        {isMobile ? (
            <header ref={headerRef}>
                <Drawer
                    anchor="left"
                    open={mobileMenuOpen}
                    onClose={toggleMobileMenu}
                    sx={drawerStyle}
                >
                    <NavLink 
                        to="/" 
                        className={({ isActive }) => isActive ? "activeLinkStyle" : "linkStyle"}
                        onClick={toggleMobileMenu}
                    >
                        Home
                    </NavLink>
                    <NavLink 
                        to="/shop" 
                        className={({ isActive }) => isActive ? "activeLinkStyle" : "linkStyle"}
                        onClick={toggleMobileMenu}
                    >
                        Shop
                    </NavLink>
                    <NavLink 
                        to="/cart" 
                        className={({ isActive }) => isActive ? "activeLinkStyle" : "linkStyle"}
                        onClick={toggleMobileMenu}
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
                <IconButton
                    sx={hamburgerMenuStyle}
                    onClick={toggleMobileMenu}
                    aria-label="open menu"
                >
                    <MenuIcon />
                </IconButton>
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
                        className={({ isActive }) => isActive ? "activeLinkStyle" : "linkStyle"
                    }
                    >
                        Home
                    </NavLink>
                    <NavLink 
                        to="/shop" 
                        className={({ isActive }) => isActive ? "activeLinkStyle" : "linkStyle"
                    }
                    >
                        Shop
                    </NavLink>
                    <NavLink 
                        to="/cart" 
                        className={({ isActive }) => isActive ? "activeLinkStyle" : "linkStyle"
                    }
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




