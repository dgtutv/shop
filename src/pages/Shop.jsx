import Product from '../components/Product';

const Shop = ({ products, productCounts, numItems, loading, addToCart, removeFromCart }) => {
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

   return (
      <div>
         <p>Items in cart: {numItems}</p>
         {products.length > 0 ? (
            <Product
               product={products[0]}
               callbackFn={handleCartChange}
               productCount={productCounts[0] || 0}
            />
         ) : (
            <p>No products available</p>
         )}
      </div>
   );
};

export default Shop;