import { useCart } from '../contexts/CartContext';
import CartProduct from '../components/CartProduct';

const CartPage = () => {
    const { products, productCounts, loading, addToCart, removeFromCart, saveForLaterFn, moveBackToCartFn, removeAll, saveForLater, numItems, getNumSaved, getTotalCart } = useCart();

    const handleCartChange = (product, action) => {
        if (action === 'add') addToCart(product);
        else if (action === 'remove') removeFromCart(product);
    };

    if (loading) return <p>Loading products...</p>;

    const headerStyling = {
        margin: "8px",
        fontSize: "2em",
        display: "flex",
        justifyContent: "center"
    }

    const sumStyling = {
        ...headerStyling,
        justifyContent: "flex-end",
        fontSize: "1.5em",
        fontWeight: "400"
    }

    return (
        <div style={{ margin: "24px 8px" }}>
            <h1 style={headerStyling}>Cart ({numItems()})</h1>
            {products.filter(product => productCounts[product.id - 1] !== 0 && saveForLater[product.id - 1] === 0).map((product) => (
                <CartProduct
                    key={product.id}
                    product={product}
                    removeAll={removeAll}
                    totalFn={saveForLaterFn}
                    editByOne={handleCartChange}
                    productCount={productCounts[product.id - 1]}
                    isSaved={false}
                />
            ))}
            {numItems() !== 0 ? (
                <h3 style={sumStyling}>Cart Total: ${getTotalCart()}</h3>
            ) : (<></>)}

            <br />
            <h1 style={headerStyling}>Saved For Later ({getNumSaved()})</h1>
            {products.filter(product => productCounts[product.id - 1] !== 0 && saveForLater[product.id - 1] === 1).map((product) => (
                <CartProduct
                    key={product.id}
                    product={product}
                    removeAll={removeAll}
                    totalFn={moveBackToCartFn}
                    editByOne={handleCartChange}
                    productCount={productCounts[product.id - 1]}
                    isSaved={true}
                />
            ))}
        </div>
    );
};

export default CartPage;
