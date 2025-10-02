import { useEffect, useState } from 'react';
import { CartContext } from './CartContext';

export const CartProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [productCounts, setProductCounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [saveForLater, setSaveForLater] = useState([]);       //Bitmap
    const URL = 'https://fakestoreapi.com/products';

    // ------ Helper Functions --------- //
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

    //Simple bitmap representations control the save for later section
    function saveForLaterFn(product) {
        const index = product.id - 1;
        setSaveForLater(prevMap => {
            const newMap = [...prevMap];
            newMap[index] = 1;
            return newMap;
        });
    }

    function moveBackToCartFn(product) {
        const index = product.id - 1;
        setSaveForLater(prevMap => {
            const newMap = [...prevMap];
            newMap[index] = 0;
            return newMap;
        });
    }

    function removeAll(product) {
        const index = product.id - 1;
        setProductCounts(prevCounts => {
            const newCounts = [...prevCounts];
            newCounts[index] = 0;
            return newCounts;
        })
    }

    function getNumSaved() {
        let sum = 0;
        for (let i = 0; i < products.length; i++) {
            if (saveForLater[i] === 1) {
                sum += productCounts[i];
            }
        }
        return sum;
    }

    function getTotalCart() {
        let sum = 0;
        for (let i = 0; i < products.length; i++) {
            if (saveForLater[i] === 0) {
                sum += (products[i].price * productCounts[i]);
            }
        }
        return sum;
    }

    const numItems = () => {
        let sum = 0;
        for (let i = 0; i < products.length; i++) {
            if (saveForLater[i] === 0) {
                sum += productCounts[i];
            }
        }
        return sum;
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
            const savedSaveForLater = localStorage.getItem('saveForLater');

            if (savedCounts) {
                try {
                    const parsedCounts = JSON.parse(savedCounts);
                    if (Array.isArray(parsedCounts) && parsedCounts.length === products.length) {
                        // Use saved data if it matches product length
                        console.log("Loading saved counts:", parsedCounts);
                        setProductCounts(parsedCounts);
                    }
                    else {
                        // Initialize with zeros if saved data doesn't match
                        console.log("Saved data doesn't match, initializing with zeros");
                        const newCounts = new Array(products.length).fill(0);
                        setProductCounts(newCounts);
                    }
                }
                catch (error) {
                    console.error("Error parsing saved counts:", error);
                    const newCounts = new Array(products.length).fill(0);
                    setProductCounts(newCounts);
                }
            }
            else {
                // No saved data, initialize with zeros
                console.log("No saved product data, initializing with zeros");
                const newCounts = new Array(products.length).fill(0);
                setProductCounts(newCounts);
            }

            if (savedSaveForLater) {
                try {
                    const parsedCounts = JSON.parse(savedSaveForLater);
                    if (Array.isArray(parsedCounts) && parsedCounts.length === products.length) {
                        // Use saved data if it matches product length
                        console.log("Loading saved save for later bitmap:", parsedCounts);
                        setSaveForLater(parsedCounts);
                    }
                    else {
                        // Initialize with zeros if saved data doesn't match
                        console.log("Saved data doesn't match, initializing with zeros");
                        const newCounts = new Array(products.length).fill(0);
                        setSaveForLater(newCounts);
                    }
                }
                catch (error) {
                    console.error("Error parsing saved counts:", error);
                    const newCounts = new Array(products.length).fill(0);
                    setSaveForLater(newCounts);
                }
            }
            else {
                // No saved data, initialize with zeros
                console.log("No saved bitmap data, initializing with zeros");
                const newCounts = new Array(products.length).fill(0);
                setSaveForLater(newCounts);
            }

            setDataLoaded(true);
        }
    }, [products, dataLoaded]);

    // Save to localStorage when productCounts changes (but only after initial load)
    useEffect(() => {
        if (dataLoaded && productCounts.length > 0) {
            console.log("Saving to localStorage:", productCounts);
            localStorage.setItem('productCounts', JSON.stringify(productCounts));
            localStorage.setItem('saveForLater', JSON.stringify(saveForLater));
        }
    }, [productCounts, dataLoaded, saveForLater]);

    const value = {
        products,
        productCounts,
        numItems,
        loading,
        addToCart,
        saveForLater,
        removeFromCart,
        saveForLaterFn,
        moveBackToCartFn,
        removeAll,
        getNumSaved,
        getTotalCart,
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
