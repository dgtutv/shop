import { Outlet } from 'react-router';
import Header from './Header.jsx';
import React, { useEffect, useState } from 'react';

const Layout = () => {
    const [products, setProducts] = useState([]);
    const [productCounts, setProductCounts] = useState([]);
    const [numItems, setNumItems] = useState(0);
    const [loading, setLoading] = useState(true);
    const [dataLoaded, setDataLoaded] = useState(false);
    const URL = 'https://fakestoreapi.com/products';

    // ------ Helper Functions --------- //
    const getNumItems = (counts) => {
        let runningCount = 0;
        for (let i = 0; i < counts.length; i++) {
            runningCount += counts[i];
        }
        return runningCount;
    }
    function addToCart(product) {
        setProductCounts(prevCounts => {
            const newProductCounts = [...prevCounts];
            const index = product.id - 1;
            newProductCounts[index] = newProductCounts[index] + 1;
            return newProductCounts;
        });
    }

    function removeFromCart(product) {
        setProductCounts(prevCounts => {
            const newProductCounts = [...prevCounts];
            const index = product.id - 1;
            newProductCounts[index] = Math.max(newProductCounts[index] - 1, 0);
            return newProductCounts;
        });
    }

    // ------ Asynchronous Functions ------- //
    // Load products
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

    //Local Storage load
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
                    else {
                        // Initialize with zeros if saved data doesn't match
                        console.log("Saved data doesn't match, initializing with zeros");
                        const newCounts = new Array(products.length).fill(0);
                        setProductCounts(newCounts);
                        setNumItems(0);
                    }
                }
                catch (error) {
                    console.error("Error parsing saved counts:", error);
                    const newCounts = new Array(products.length).fill(0);
                    setProductCounts(newCounts);
                    setNumItems(0);
                }
            }
            else {
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

    // ------ Styling --------- //
    const mainStyle = {
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
    }

    const contentStyle = {
        flex: 1,
    }

    return (
        <div style={mainStyle}>
            <Header />
            <div style={contentStyle}>
                <Outlet products={products} productCounts={productCounts} numItems={numItems} loading={loading} addToCart={addToCart} removeFromCart={removeFromCart} />
            </div>
        </div>
    )
}

export default Layout;