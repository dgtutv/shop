import React, { useEffect, useState } from 'react';
import Product from '../components/Product';

const Shop = () => {
   const [products, setProducts] = useState([]);
   const [productCounts, setProductCounts] = useState([]);
   const [numItems, setNumItems] = useState(0);
   const [loading, setLoading] = useState(true);
   const [dataLoaded, setDataLoaded] = useState(false);
   const URL = 'https://fakestoreapi.com/products';

   const getNumItems = (counts) => {
      let runningCount = 0;
      for(let i = 0; i < counts.length; i++){
         runningCount += counts[i];
      }
      return runningCount;
   }

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
   }, []);
   useEffect(() => {
      if (products.length > 0 && !dataLoaded) {
         const savedCounts = localStorage.getItem('productCounts');
         
         if (savedCounts) {
            try {
               const parsedCounts = JSON.parse(savedCounts);
               if (Array.isArray(parsedCounts) && parsedCounts.length === products.length) {
                  // Use saved data if it matches product length
                  console.log("Loading saved counts:", parsedCounts);
                  setProductCounts(parsedCounts);
                  setNumItems(getNumItems(parsedCounts));
               } 
               else{
                  // Initialize with zeros if saved data doesn't match
                  console.log("Saved data doesn't match, initializing with zeros");
                  const newCounts = new Array(products.length).fill(0);
                  setProductCounts(newCounts);
                  setNumItems(0);
               }
            } 
            catch (error){
               console.error("Error parsing saved counts:", error);
               const newCounts = new Array(products.length).fill(0);
               setProductCounts(newCounts);
               setNumItems(0);
            }
         } 
         else{
            // No saved data, initialize with zeros
            console.log("No saved data, initializing with zeros");
            const newCounts = new Array(products.length).fill(0);
            setProductCounts(newCounts);
            setNumItems(0);
         }
         
         setDataLoaded(true);
      }
   }, [products, dataLoaded]);

   // Save to localStorage when productCounts changes (but only after initial load)
   useEffect(() => {
      if (dataLoaded && productCounts.length > 0) {
         console.log("Saving to localStorage:", productCounts);
         localStorage.setItem('productCounts', JSON.stringify(productCounts));
         setNumItems(getNumItems(productCounts));
      }
   }, [productCounts, dataLoaded]);

   function addToCart(product){
      setProductCounts(prevCounts => {
         const newProductCounts = [...prevCounts];
         const index = product.id - 1;
         newProductCounts[index] = newProductCounts[index] + 1;
         return newProductCounts;
      });
   }

   function removeFromCart(product){
      setProductCounts(prevCounts => {
         const newProductCounts = [...prevCounts];
         const index = product.id - 1;
         newProductCounts[index] = Math.max(newProductCounts[index] - 1, 0);
         return newProductCounts;
      });
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