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
        const updatedProductCount = productCounts[product.id-1]+1;
        const updatedProductCounts = productCounts;
        updatedProductCounts[product.id-1] = updatedProductCount;
        setProductCounts(updatedProductCount);
        setNumItems(numItems+1);
    }

    function removeFromCart(product){
        const updatedCart = cart
        updatedCart.splice(cart.findLastIndex(item => item.id === product.id), 1);
        setCart(updatedCart);
        const updatedProductCount = productCounts[product.id-1]-1;
        const updatedProductCounts = productCounts;
        updatedProductCounts[product.id-1] = updatedProductCount;
        setProductCounts(updatedProductCount);
        setNumItems(numItems-1);
    }

    return (
        <div>
            <h1>Shop Page</h1>
            <p>You are currently on the Shop page.</p>
            {products.length > 0 ?
                <Product product={products[0]}/>
            :
                <p>loading ... </p>
            }
            
        </div>
    );
};

export default Shop;