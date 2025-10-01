import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";

const Product = ({product}) =>{

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
            </CardContent>
        </Card>
    );
} 

export default Product;