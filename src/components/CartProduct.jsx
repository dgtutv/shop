import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useTheme } from '../contexts/ThemeContext.jsx';
import { useState } from "react";

const CartProduct = ({ product, removeAll, saveForLater, editByOne, productCount }) => {
    const { isMobile, getThemeColors } = useTheme();
    const themeColors = getThemeColors();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdownOpen = () => setDropdownOpen(prev => !prev);

    // MUI spacing, 1 = 8px
    const baseCardStyle = {
        bgcolor: themeColors.cardBg,
        color: themeColors.textColor,
        boxShadow: `0 4px 6px ${themeColors.boxShadow}`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 1,
        padding: 2,
    };

    const mobileStyle = {
        ...baseCardStyle,
        width: 140,
    };

    const desktopStyle = {
        ...baseCardStyle,
        width: 310,
    };

    const boxStyle = {
        backgroundColor: "#0080ff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "4px",
        marginTop: "12px"
    };

    const dropdownBarStyle = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        '&:hover': {
            cursor: "pointer",
        }
    };

    const topRowStyle = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    }

    const infoStyle = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    }

    const bottomRowStyle = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
    }

    const linkStyle = {
        color: "black",
    }

    return (
        <Card sx={isMobile ? mobileStyle : desktopStyle}>
            <Box style={topRowStyle}>
                <Box style={infoStyle}>
                    {/*Image */}
                    <Box
                        sx={{
                            maxHeight: "60%",
                            width: isMobile ? 120 : 200,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            overflow: "hidden",
                        }}
                    >
                        <img
                            src={product.image}
                            alt={product.title}
                            style={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                                objectFit: "contain"
                            }}
                        />
                    </Box>
                    <Box>
                        <Typography gutterBottom variant={isMobile ? "subtitle1" : "h5"} component="div">
                            {product.title}
                        </Typography>

                        {/* Dropdown for description */}
                        {!isMobile ? (
                            <>
                                {dropdownOpen ? (
                                    <>
                                        <Typography variant="body1" sx={dropdownBarStyle} onClick={toggleDropdownOpen}>
                                            Description <ArrowDropDownIcon />
                                        </Typography>
                                        <Typography variant="body1">{product.description}</Typography>
                                    </>
                                ) : (
                                    <Typography variant="body1" sx={dropdownBarStyle} onClick={toggleDropdownOpen}>
                                        Description <ArrowRightIcon />
                                    </Typography>
                                )}
                            </>
                        ) : (<></>)}
                    </Box>

                </Box>

                <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ fontWeight: 'bold', mb: 1 }}>
                    ${product.price}
                </Typography>
            </Box>
            <Box style={bottomRowStyle}>
                <a href="#" style={linkStyle} onClick={removeAll}>Remove</a>
                <a href="#" style={linkStyle} onClick={saveForLater}>saveForLater</a>
                {/* Add/Remove buttons */}
                <Box sx={boxStyle}>
                    <Button onClick={() => editByOne(product, "remove")}>
                        <RemoveIcon style={{ color: "white" }} />
                    </Button>
                    <Typography variant={isMobile ? "h6" : "h5"} sx={{ fontWeight: "bold", color: "white" }}>
                        {productCount}
                    </Typography>
                    <Button onClick={() => editByOne(product, "add")}>
                        <AddIcon style={{ color: "white" }} />
                    </Button>
                </Box>
            </Box>
        </Card>
    );
};

export default CartProduct;
