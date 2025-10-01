import { Card, CardContent, CardMedia, Typography, Box, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useTheme } from '../contexts/ThemeContext.jsx';

const Product = ({product, callbackFn, productCount}) =>{
    const { isMobile, getThemeColors } = useTheme();
    const themeColors = getThemeColors();


    return(
        <Card sx={{ maxWidth: 345, margin: 2, bgcolor: themeColors.cardBg, color: themeColors.textColor, boxShadow: `0 4px 6px ${themeColors.boxShadow}` }}>
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
                <Typography variant="h8">
                    {product.description}
                </Typography>
                <Box style={{
                    backgroundColor: "#0080ff",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderRadius: "4px",
                    marginTop: "12px"
                }}
                >
                    <Button onClick={() => callbackFn(product, "remove")}><RemoveIcon style={{color: "white"}}/></Button>
                    <Typography variant="h5" color="primary" sx={{ fontWeight: "bold", color: "white" }}>{productCount}</Typography>
                    <Button onClick={() => callbackFn(product, "add")}><AddIcon style={{color: "white"}}/></Button>

                </Box>
            </CardContent>
        </Card>
    );
} 

export default Product;