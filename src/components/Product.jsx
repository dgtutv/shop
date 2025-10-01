import { Card, CardContent, CardMedia, Typography, Box, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Product = ({product, callbackFn, productCount}) =>{

    return(
        <Card sx={{ maxWidth: 345, margin: 2 }}>
            <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.title}
                sx={{ objectFit: 'contain', padding: 1 }}
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {product.title}
                </Typography>
                <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold', mb: 1 }}>
                    ${product.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.description}
                </Typography>
                <Box style={{
                    backgroundColor: "#0080ff",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
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