'use client';

import { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { TEXT } from '../lib/text';

interface CartPanelProps {
  onClose: () => void;
}

export function CartPanel({ onClose }: CartPanelProps) {
  const { cartItems, restaurantName, totalPrice, comment, setComment } = useCart();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

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
                <div key={`${item.dish.id}-${item.selectedSide ?? ''}-${item.selectedChanges.join(',')}`} className="epicure-cart-item">
                  <img
                    src={item.imageUrl}
                    alt={item.dish.name}
                    className="epicure-cart-item__image"
                  />
                  <div className="epicure-cart-item__body">
                    <div className="epicure-cart-item__top">
                      <span className="epicure-cart-item__qty">{item.quantity}</span>
                      <div className="epicure-cart-item__details">
                        <p className="epicure-cart-item__name">{item.dish.name}</p>
                        <p className="epicure-cart-item__gold-price">&#8362;{item.dish.price.toFixed(2)}</p>
                      </div>
                    </div>
                    {(item.selectedSide || item.selectedChanges.length > 0) && (
                      <p className="epicure-cart-item__meta">
                        {[item.selectedSide, ...item.selectedChanges].filter(Boolean).join(' | ')}
                      </p>
                    )}
                    <div className="epicure-cart-item__price-row">
                      <span className="epicure-cart-item__price-val">
                        <img src="/icons/Shekel.svg" alt="₪" aria-hidden="true" className="epicure-cart-item__shekel" />
                        {item.dish.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <hr className="epicure-cart-panel__divider" />
            <div className="epicure-cart-panel__comment-wrap">
              <p className="epicure-cart-panel__comment-label">{TEXT.cart.addComment}</p>
              <textarea
                className="epicure-cart-panel__comment-input"
                placeholder={TEXT.cart.commentPlaceholder}
                value={comment}
                onChange={e => setComment(e.target.value)}
              />
            </div>
          </div>
        )}

        {cartItems.length > 0 && (
          <button type="button" className="epicure-cart-panel__checkout">
            {TEXT.cart.checkout}&nbsp;
            <img src="/icons/Shekel.svg" alt="₪" aria-hidden="true" className="epicure-cart-panel__checkout-shekel" />
            {totalPrice}
          </button>
        )}
        <button type="button" className="epicure-cart-panel__order-history">
          {TEXT.cart.orderHistory}
        </button>
      </div>
    </>
  );
}
