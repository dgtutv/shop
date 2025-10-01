import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router';
import "./layout.css"
import { Box, IconButton, Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from '../contexts/ThemeContext.jsx';
import { useCart } from '../contexts/CartContext.jsx';

const Header = () => {
    const location = useLocation();
    const { isMobile, getThemeColors } = useTheme();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const themeColors = getThemeColors();

    const { numItems } = useCart();

    //MUI element stylings
    const hamburgerMenuStyle = {
        zIndex: 1300,
        color: themeColors.textColor,
    }

    const drawerStyle = {
        "& .MuiDrawer-paper": {
            width: "320px",
            maxWidth: "50vw",
            padding: "16px",
            backgroundColor: themeColors.headerBg,
            borderRight: `1px solid ${themeColors.borderColor}`,
            color: themeColors.textColor,
        },
    }

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <>
            {isMobile ? (
                <header>
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
                            Cart ({numItems})
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
                            Cart ({numItems})
                        </NavLink>
                    </nav>
                </header>
            )
            }
        </>



    );
};

export default Header;




