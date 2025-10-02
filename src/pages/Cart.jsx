import { useCart } from '../contexts/CartContext';
import CartProduct from '../components/CartProduct';

const CartPage = () => {
    const { products, productCounts, loading, addToCart, removeFromCart, saveForLater } = useCart();

    const handleCartChange = (product, action) => {
        if (action === 'add') {
            addToCart(product);
        }
        else if (action === "remove") {
            removeFromCart(product);
        }
    };

    const removeAll = (product) => {
        if (productCounts[product.id - 1] === 0) {
            return;
        }
        else {
            removeFromCart(product);
            removeAll(product);
        }
    }

    if (loading) {
        return <p>Loading products...</p>;
    }
    return (
        <div>
            <h1>Cart Page</h1>
            <p>You are currently on the Cart page.</p>
            <CartProduct key={products[0].id} product={products[0]} removeAll={removeAll} saveForLater={saveForLater} editByOne={handleCartChange} productCount={productCounts[0]} />
        </div>
    );
};

export default CartPage;