import Product from '../components/Product';
import { useCart } from "../contexts/CartContext";

const Shop = () => {
   const { products, productCounts, loading, addToCart, removeFromCart } = useCart();

   const handleCartChange = (product, action) => {
      if (action === 'add') {
         addToCart(product);
      }
      else if (action === "remove") {
         removeFromCart(product);
      }
   };

   if (loading) {
      return <p>Loading products...</p>;
   }

   const productsStyle = {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-evenly",
      paddingTop: "15px"
   }

   return (
      <div>
         {products.length > 0 ? (
            <div style={productsStyle}>
               {products.map((product) => (
                  <Product
                     key={product.id}
                     product={product}
                     callbackFn={handleCartChange}
                     productCount={productCounts[product.id - 1] || 0}
                  />
               ))
               }
            </div>
         )
            : (
               <p>No products available</p>
            )}
      </div>
   );
};

export default Shop;