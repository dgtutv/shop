import { useCart } from '../contexts/CartContext';
import CartProduct from '../components/CartProduct';

const CartPage = () => {
    const { products, productCounts, loading, addToCart, removeFromCart, saveForLaterFn, moveBackToCartFn, removeAll } = useCart();

    const handleCartChange = (product, action) => {
        if (action === 'add') addToCart(product);
        else if (action === 'remove') removeFromCart(product);
    };

    if (loading) return <p>Loading products...</p>;

    return (
        <div>
            <h1>Cart Page</h1>
            <p>You are currently on the Cart page.</p>
            {products.filter(product => productCounts[product.id - 1] !== 0).map((product) => (
                <CartProduct
                    key={product.id}
                    product={product}
                    removeAll={removeAll}
                    totalFn={saveForLaterFn}
                    editByOne={handleCartChange}
                    productCount={productCounts[product.id - 1]}
                />
            ))}
        </div>
    );
};

export default CartPage;
