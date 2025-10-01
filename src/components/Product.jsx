import { Card, CardContent, CardMedia, Typography, Box, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useTheme } from '../contexts/ThemeContext.jsx';
import { useState } from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const Product = ({ product, callbackFn, productCount }) => {
    const { isMobile, getThemeColors } = useTheme();
    const themeColors = getThemeColors();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const mobileStyle = {
        maxWidth: 170,
        margin: 1,
        bgcolor: themeColors.cardBg,
        color: themeColors.textColor,
        boxShadow: `0 4px 6px ${themeColors.boxShadow}`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center"
    }

    const desktopStyle = {
        maxWidth: 345,
        margin: 1,
        bgcolor: themeColors.cardBg,
        color: themeColors.textColor,
        boxShadow: `0 4px 6px ${themeColors.boxShadow}`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center"
    }

    const boxStyle = {
        backgroundColor: "#0080ff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "4px",
        marginTop: "12px"
    }

    const dropdownBarStyle = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        '&:hover': {
            cursor: "pointer",
        }
    }

    const toggleDropdownOpen = () => {
        if (dropdownOpen) {
            setDropdownOpen(false);
        }
        else {
            setDropdownOpen(true);
        }
    }

    //Figure out why the padding for the images is not working

    return (
        <>
            {isMobile ?
                <Card sx={mobileStyle}>
                    <CardMedia
                        component="img"
                        height="100"
                        image={product.image}
                        alt={product.title}
                        sx={{ objectFit: 'contain', padding: 1 }}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="subtitle1" component="div">
                            {product.title}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                            ${product.price}
                        </Typography>
                        <Box style={boxStyle}
                        >
                            <Button onClick={() => callbackFn(product, "remove")}><RemoveIcon style={{ color: "white" }} /></Button>
                            <Typography variant="h6" color="primary" sx={{ fontWeight: "bold", color: "white" }}>{productCount}</Typography>
                            <Button onClick={() => callbackFn(product, "add")}><AddIcon style={{ color: "white" }} /></Button>

                        </Box>
                    </CardContent>
                </Card>
                :
                <Card sx={desktopStyle}>
                    <CardMedia
                        component="img"
                        height="200"
                        image={product.image}
                        alt={product.title}
                        sx={{ objectFit: 'contain', padding: 1 }}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {product.title}
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                            ${product.price}
                        </Typography>
                        {dropdownOpen ? (
                            <>
                                <Typography variant="body1" sx={dropdownBarStyle} onClick={toggleDropdownOpen}>
                                    Description {<ArrowDropDownIcon />}
                                </Typography>
                                <Typography variant="body1">
                                    {product.description}
                                </Typography>
                            </>
                        ) : (
                            <Typography variant="body1" sx={dropdownBarStyle} onClick={toggleDropdownOpen}>
                                Description {<ArrowRightIcon />}
                            </Typography>
                        )}

                        <Box style={boxStyle}
                        >
                            <Button onClick={() => callbackFn(product, "remove")}><RemoveIcon style={{ color: "white" }} /></Button>
                            <Typography variant="h5" color="primary" sx={{ fontWeight: "bold", color: "white" }}>{productCount}</Typography>
                            <Button onClick={() => callbackFn(product, "add")}><AddIcon style={{ color: "white" }} /></Button>

                        </Box>
                    </CardContent>
                </Card>
            }
        </>
    );
}

export default Product;