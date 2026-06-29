'use client';

import { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { TEXT } from '../lib/text';
import { CartEmpty } from './cart-panel/CartEmpty';
import { CartItem } from './cart-panel/CartItem';
import { CartFooter } from './cart-panel/CartFooter';

interface CartPanelProps {
  onClose: () => void;
}

export function CartPanel({ onClose }: CartPanelProps) {
  const { cartItems, restaurantName, totalPrice, comment, setComment } = useCart();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  return (
    <>
      <button
        type="button"
        className="epicure-cart-backdrop"
        onClick={onClose}
        aria-label={TEXT.cart.closeAriaLabel}
      />
      <div className={`epicure-cart-panel${cartItems.length === 0 ? ' epicure-cart-panel--empty' : ''}`} role="dialog" aria-label={TEXT.cart.dialogAriaLabel}>
        {cartItems.length === 0 ? (
          <CartEmpty />
        ) : (
          <div className="epicure-cart-panel__filled">
            <div className="epicure-cart-panel__header">
              <h2 className="epicure-cart-panel__title epicure-cart-panel__title--desktop">{TEXT.cart.yourOrder}</h2>
              <h2 className="epicure-cart-panel__title epicure-cart-panel__title--mobile">{TEXT.cart.myOrder}</h2>
              <p className="epicure-cart-panel__restaurant">{restaurantName}</p>
            </div>
            <div className="epicure-cart-panel__items">
              {cartItems.map(item => (
                <CartItem
                  key={`${item.dish.id}-${item.selectedSide ?? ''}-${item.selectedChanges.join(',')}`}
                  item={item}
                />
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
        <CartFooter totalPrice={totalPrice} hasItems={cartItems.length > 0} />
      </div>
    </>
  );
}
