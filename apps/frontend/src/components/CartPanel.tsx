'use client';

import { useCart } from '../context/CartContext';
import { TEXT } from '../lib/text';

interface CartPanelProps {
  onClose: () => void;
}

export function CartPanel({ onClose }: CartPanelProps) {
  const { cartItems, restaurantName, totalPrice, comment, setComment } = useCart();

  return (
    <>
      <button
        type="button"
        className="epicure-cart-backdrop"
        onClick={onClose}
        aria-label={TEXT.cart.closeAriaLabel}
      />
      <div className="epicure-cart-panel" role="dialog" aria-label={TEXT.cart.dialogAriaLabel}>
        {cartItems.length === 0 ? (
          <div className="epicure-cart-panel__body">
            <img src="/icons/cart.svg" alt="cart" width={50} height={50} className="epicure-cart-panel__icon" />
            <p className="epicure-cart-panel__empty">{TEXT.cart.empty}</p>
          </div>
        ) : (
          <div className="epicure-cart-panel__filled">
            <div className="epicure-cart-panel__header">
              <h2 className="epicure-cart-panel__title">{TEXT.cart.yourOrder}</h2>
              <p className="epicure-cart-panel__restaurant">{restaurantName}</p>
            </div>
            <div className="epicure-cart-panel__items">
              {cartItems.map(item => (
                <div key={item.dish.id} className="epicure-cart-item">
                  <img
                    src={item.imageUrl}
                    alt={item.dish.name}
                    className="epicure-cart-item__image"
                  />
                  <div className="epicure-cart-item__info">
                    <span className="epicure-cart-item__qty">{item.quantity}</span>
                    <div className="epicure-cart-item__details">
                      <p className="epicure-cart-item__name">{item.dish.name}</p>
                      {(item.selectedSide || item.selectedChanges.length > 0) && (
                        <p className="epicure-cart-item__meta">
                          {[item.selectedSide, ...item.selectedChanges].filter(Boolean).join(' | ')}
                        </p>
                      )}
                    </div>
                    <p className="epicure-cart-item__price">
                      <img src="/icons/Shekel.svg" alt="₪" aria-hidden="true" className="epicure-cart-item__shekel" />
                      {item.dish.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="epicure-cart-panel__total">
              <img src="/icons/Shekel.svg" alt="₪" aria-hidden="true" className="epicure-cart-panel__total-shekel" />
              {totalPrice}
            </p>
            <div className="epicure-cart-panel__comment-wrap">
              <p className="epicure-cart-panel__comment-label">{TEXT.cart.addComment}</p>
              <textarea
                className="epicure-cart-panel__comment-input"
                placeholder={TEXT.cart.commentPlaceholder}
                value={comment}
                onChange={e => setComment(e.target.value)}
              />
            </div>
            <button type="button" className="epicure-cart-panel__checkout">
              {TEXT.cart.checkout}&nbsp;
              <img src="/icons/Shekel.svg" alt="₪" aria-hidden="true" className="epicure-cart-panel__checkout-shekel" />
              {totalPrice}
            </button>
          </div>
        )}
        <button type="button" className="epicure-cart-panel__order-history">
          {TEXT.cart.orderHistory}
        </button>
      </div>
    </>
  );
}
