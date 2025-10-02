import { Card, Typography, Box, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useTheme } from '../contexts/ThemeContext.jsx';
import { useState } from "react";

const CartProduct = ({ product, removeAll, totalFn, editByOne, productCount, isSaved }) => {
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
        width: "calc(100% - 2)"
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
        justifyContent: "flex-start",
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
        width: "100%",
    }

    const infoStyle = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "60%"
    }

    const infoStyleMobile = {
        ...infoStyle,
        width: "100%",
        justifyContent: "flex-end",
        textAlign: "end"
    }

    const bottomRowStyle = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        gap: "20px"
    }
    const bottomLeftRowStyle = {
        ...bottomRowStyle,
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start"
    }
    const bottomLeftRowStyleDesktop = {
        ...bottomLeftRowStyle,
        flexDirection: "row"
    }

    return (
        <Card sx={baseCardStyle}>
            {isMobile ? (
                <>
                    <Box style={topRowStyle}>
                        <Box style={infoStyleMobile}>
                            {/*Image */}
                            <Box
                                sx={{
                                    maxWidth: "120px",
                                    width: "10vw",
                                    minWidth: "80px",
                                    minHeight: "80px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    overflow: "hidden",
                                    mr: "20px",
                                }}
                            >
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "contain",
                                    }}
                                />
                            </Box>

                            <Box>
                                <Typography gutterBottom variant={"subtitle1"} component="div" sx={{ textAlign: "start" }}>
                                    {product.title}
                                </Typography>
                                <Typography variant={"subtitle1"} sx={{ fontWeight: 'bold', mb: 1 }}>
                                    <i>Total: </i>${(productCount * Number(product.price)).toFixed(2)}
                                </Typography>
                                <Typography variant={"subtitle2"} sx={{ fontWeight: 'bold', mb: 1 }}>
                                    <i>Unit price: </i>${product.price.toFixed(2)}
                                </Typography>
                            </Box>

                        </Box>

                    </Box>
                    <Box style={bottomRowStyle}>
                        <Box style={bottomLeftRowStyle}>
                            {/* Add/Remove buttons */}
                            <a href="#" onClick={() => removeAll(product)}>Remove all</a>
                            {isSaved ? (
                                <a href="#" onClick={() => totalFn(product)}>Move to cart</a>
                            ) : (
                                <a href="#" onClick={() => totalFn(product)}>Save for later</a>
                            )}
                        </Box>
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
                </>
            ) : (
                <>
                    <Box style={topRowStyle}>
                        <Box style={infoStyle}>
                            {/*Image */}
                            <Box
                                sx={{
                                    maxWidth: "120px",
                                    width: "10vw",
                                    minWidth: "80px",
                                    minHeight: "80px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    overflow: "hidden",
                                    mr: "20px",
                                }}
                            >
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "contain",
                                    }}
                                />
                            </Box>

                            <Box>
                                <Typography gutterBottom variant={"h5"} component="div">
                                    {product.title}
                                </Typography>

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
                            </Box>

                        </Box>
                        <Box>
                            <Typography variant={"h5"} sx={{ fontWeight: 'bold', mb: 1 }}>
                                <i>Total: </i>${(productCount * Number(product.price)).toFixed(2)}
                            </Typography>
                            <Typography variant={"h6"} sx={{ fontWeight: 'bold', mb: 1 }}>
                                <i>Unit price: </i>${product.price.toFixed(2)}
                            </Typography>
                        </Box>

                    </Box >
                    <Box style={bottomRowStyle}>
                        <Box style={bottomLeftRowStyleDesktop}>
                            {/* Add/Remove buttons */}
                            <a href="#" onClick={() => removeAll(product)}>Remove all</a>
                            {isSaved ? (
                                <a href="#" onClick={() => totalFn(product)}>Move to cart</a>
                            ) : (
                                <a href="#" onClick={() => totalFn(product)}>Save for later</a>
                            )}
                        </Box>
                        <Box sx={boxStyle}>
                            <Button onClick={() => editByOne(product, "remove")}>
                                <RemoveIcon style={{ color: "white" }} />
                            </Button>
                            <Typography variant={"h5"} sx={{ fontWeight: "bold", color: "white" }}>
                                {productCount}
                            </Typography>
                            <Button onClick={() => editByOne(product, "add")}>
                                <AddIcon style={{ color: "white" }} />
                            </Button>
                        </Box>
                    </Box>
                </>
            )}

        </Card >
    );
};

export default CartProduct;
