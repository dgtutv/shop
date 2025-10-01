import React, { useEffect, useState } from 'react';
import Product from '../components/Product';

const Shop = () => {
   const [products, setProducts] = useState([]);
   const [productCounts, setProductCounts] = useState([]);
   const [cart, setCart] = useState([]);
   const [numItems, setNumItems] = useState(0);
   const [loading, setLoading] = useState(true);
   const URL = 'https://fakestoreapi.com/products';

   // Load products only once
   useEffect(() => {
      async function getProducts() {
         try {
            setLoading(true);
            const response = await fetch(URL);
            if (!response.ok) {
               throw new Error("Incorrect URL or connection issue.");
            }
            const data = await response.json();
            setProducts(data);
            
            // Initialize product counts array
            const newCounts = new Array(data.length).fill(0);
            setProductCounts(newCounts);
            
            return data;
         }
         catch (error) {
            console.error("Error:", error);
            return [];
         }
         finally {
            setLoading(false);
         }
      }

      getProducts();
   }, []); // Only run once on mount

   // Load cart from localStorage only once
   useEffect(() => {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
         try {
            const parsedCart = JSON.parse(savedCart);
            if (Array.isArray(parsedCart)) {
               setCart(parsedCart);
               setNumItems(parsedCart.length);
            }
         } catch (error) {
            console.error("Error parsing saved cart:", error);
            setCart([]);
         }
      }
   }, []);

   // Update product counts when cart or products change
   useEffect(() => {
      if (products.length > 0) {
         const newCounts = new Array(products.length).fill(0);
         
         // Count items in cart
         cart.forEach(product => {
            const productIndex = products.findIndex(p => p.id === product.id);
            if (productIndex !== -1) {
               newCounts[productIndex]++;
            }
         });
         
         setProductCounts(newCounts);
      }
   }, [cart, products]);

   // Debounced localStorage save
   useEffect(() => {
      const timeoutId = setTimeout(() => {
         localStorage.setItem('cart', JSON.stringify(cart));
      }, 100); // Save after 100ms of no changes

      return () => clearTimeout(timeoutId);
   }, [cart]);

   function addToCart(product) {
      setCart(prevCart => [...prevCart, product]);
      setNumItems(prevNum => prevNum + 1);
   }

   function removeFromCart(product) {
      setCart(prevCart => {
         const newCart = [...prevCart];
         const itemIndex = newCart.findLastIndex(item => item.id === product.id);
         if (itemIndex !== -1) {
            newCart.splice(itemIndex, 1);
         }
         return newCart;
      });
      
      setNumItems(prevNum => Math.max(0, prevNum - 1));
   }

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