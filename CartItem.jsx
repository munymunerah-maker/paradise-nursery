import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const [checkoutMessage, setCheckoutMessage] = useState('');

  const parsePrice = (costStr) => {
    const numeric = parseFloat(String(costStr).replace(/[^0-9.]/g, ''));
    return Number.isNaN(numeric) ? 0 : numeric;
  };

  const calculateTotalAmount = () => {
    return cart
      .reduce((total, item) => total + parsePrice(item.cost) * item.quantity, 0)
      .toFixed(2);
  };

  const calculateTotalCost = (item) => {
    return (parsePrice(item.cost) * item.quantity).toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckout = () => {
    setCheckoutMessage('Coming Soon');
  };

  const handleContinue = (e) => {
    e.preventDefault();
    if (onContinueShopping) {
      onContinueShopping(e);
    }
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      <h3>Total Cart Amount: ${calculateTotalAmount()}</h3>

      {cart.length === 0 ? (
        <p>Your cart is currently empty.</p>
      ) : (
        <div className="cart-items-list">
          {cart.map((item) => (
            <div key={item.name} className="cart-item-card">
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-thumbnail"
                width="100"
              />
              <div className="cart-item-details">
                <h4>{item.name}</h4>
                <p>Unit Price: ${parsePrice(item.cost).toFixed(2)}</p>
                <p>Total Cost: ${calculateTotalCost(item)}</p>
                <div className="quantity-controls">
                  <button type="button" onClick={() => handleDecrement(item)}>
                    -
                  </button>
                  <span className="item-quantity">{item.quantity}</span>
                  <button type="button" onClick={() => handleIncrement(item)}>
                    +
                  </button>
                </div>
                <button type="button" onClick={() => handleRemove(item)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {checkoutMessage && <p className="checkout-message">{checkoutMessage}</p>}

      <div className="cart-actions">
        <button type="button" onClick={handleContinue}>
          Continue Shopping
        </button>
        <button type="button" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CartItem;
