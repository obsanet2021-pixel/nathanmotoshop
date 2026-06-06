import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button, Input } from '../components/shared/Shared';
import styles from './CartPage.module.css';
function CartPage() {
  const { t, cart, dispatch } = useApp();
  const updateQuantity = (id, quantity) => {
    if (quantity < 1) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    } else {
      dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id, quantity } });
    }
  };
  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    dispatch({ 
      type: 'SHOW_TOAST', 
      payload: { message: 'Item removed from cart', type: 'info' }
    });
    setTimeout(() => dispatch({ type: 'HIDE_TOAST' }), 3000);
  };
  const clearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch({ type: 'CLEAR_CART' });
    }
  };
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 5000 ? 0 : 500;
  const total = subtotal + shipping;
  if (cart.length === 0) {
    return (
      <div className={styles.cartPage}>
        <div className="container">
          <div className={styles.emptyCart}>
            <h2>{t('cart.empty')}</h2>
            <Link to="/shop">
              <Button variant="primary">{t('cart.continue')}</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.cartPage}>
      <div className="container">
        <h1 className={styles.title}>{t('cart.title')}</h1>
        <div className={styles.cartContainer}>
          <div className={styles.cartItems}>
            {cart.map(item => {
              const getName = () => {
                switch('en') { // You can add language support here
                  default: return item.name;
                }
              };
              return (
                <div key={item.id} className={styles.cartItem}>
                  <div className={styles.itemImage}>
                    <img src={item.image} alt={getName()} />
                  </div>
                  <div className={styles.itemDetails}>
                    <h3>{getName()}</h3>
                    <p>ETB {item.price.toLocaleString()}</p>
                  </div>
                  <div className={styles.itemQuantity}>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      min="1"
                      max={item.stock}
                    />
                  </div>
                  <div className={styles.itemTotal}>
                    <strong>ETB {(item.price * item.quantity).toLocaleString()}</strong>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className={styles.removeButton}
                  >
                    🗑️
                  </button>
                </div>
              );
            })}
            <button onClick={clearCart} className={styles.clearCartBtn}>
              Clear Cart
            </button>
          </div>
          <div className={styles.cartSummary}>
            <h3>Order Summary</h3>
            <div className={styles.summaryRow}>
              <span>Subtotal:</span>
              <span>ETB {subtotal.toLocaleString()}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Shipping:</span>
              <span>{shipping === 0 ? 'FREE' : `ETB ${shipping.toLocaleString()}`}</span>
            </div>
            <div className={`${styles.summaryRow} ${styles.total}`}>
              <strong>Total:</strong>
              <strong>ETB {total.toLocaleString()}</strong>
            </div>
            <Button variant="primary" className={styles.checkoutBtn}>
              {t('cart.checkout')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CartPage;
