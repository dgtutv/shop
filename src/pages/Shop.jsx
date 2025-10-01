import React, { useEffect, useState } from 'react';
import Product from '../components/Product';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [productCounts, setProductCounts] = useState([])
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const [numItems, setNumItems] = useState(0);
    const URL = 'https://fakestoreapi.com/products';

    //Pull the products
    useEffect(() => {
        async function getProducts(){
            try {
                setLoading(true);
                const response = await fetch(URL);
                if(!response.ok){
                    throw new Error("Incorrect URL or connection issue.");
                }
                const data = await response.json();
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

        getProducts().then((productsData) => {
            setTimeout(() => {
                setProducts(productsData);
                setProductCounts(new Array(productsData.length).fill(0));
            }, 500);
        });


        

    }, [])

    //id = index-1
    function addToCart(product){
        setCart(prevCart => [...prevCart, product]);
        setProductCounts(prevCounts => {
            const newCounts = [...prevCounts];
            newCounts[product.id-1] = newCounts[product.id-1] + 1;
            return newCounts;
        });
        setNumItems(prevNum => prevNum + 1);
    }

    function removeFromCart(product){
        setCart(prevCart => {
            const newCart = [...prevCart];
            const itemIndex = newCart.findLastIndex(item => item.id === product.id);
            if (itemIndex !== -1) {
                newCart.splice(itemIndex, 1);
            }
            return newCart;
        });
        setProductCounts(prevCounts => {
            const newCounts = [...prevCounts];
            if (newCounts[product.id-1] > 0) {
                newCounts[product.id-1] = newCounts[product.id-1] - 1;
            }
            return newCounts;
        });
        setNumItems(prevNum => Math.max(0, prevNum - 1));
    }

    const handleCartChange = (product, action) => {
        if(action === 'add'){
            addToCart(product);
        } 
        else if(action === "remove"){
            removeFromCart(product);
        }
    };

    return (
        <div>
            {products.length > 0 ?
                <Product product={products[0]} callbackFn={handleCartChange} productCount={productCounts[products[0].id-1]}/>
            :
                <p>loading ... </p>
            }
            
        </div>
    );
};

export default Shop;