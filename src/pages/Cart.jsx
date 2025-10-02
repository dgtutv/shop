import { useCart } from '../contexts/CartContext';
import CartProduct from '../components/CartProduct';

const CartPage = () => {
    const { products, productCounts, loading, addToCart, removeFromCart, saveForLaterFn, moveBackToCartFn, removeAll, saveForLater } = useCart();

    const handleCartChange = (product, action) => {
        if (action === 'add') addToCart(product);
        else if (action === 'remove') removeFromCart(product);
    };

    if (loading) return <p>Loading products...</p>;

    return (
        <div>
            <h1>Cart</h1>
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
            <h2>Saved For Later</h2>
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
