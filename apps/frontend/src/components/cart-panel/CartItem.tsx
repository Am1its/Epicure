'use client';

import type { CartItem as CartItemType } from '@org/shared-types';
import { useCart } from '../../context/CartContext';
import { TEXT } from '../../lib/text';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, confirmRemove, cancelRemove } = useCart();

  return (
    <div className={`epicure-cart-item${item.pendingRemove ? ' epicure-cart-item--confirm-remove' : ''}`}>
      <img src={item.imageUrl} alt={item.dish.name} className="epicure-cart-item__image" />
      <div className="epicure-cart-item__body">
        <div className="epicure-cart-item__top">
          {!item.pendingRemove && (
            <div className="epicure-cart-item__qty-row">
              <button
                type="button"
                className="epicure-cart-item__qty-btn"
                onClick={() => updateQuantity(item, -1)}
                aria-label={TEXT.cart.decreaseQtyAriaLabel}
              >−</button>
              <span className="epicure-cart-item__qty-count">{item.quantity}</span>
              <button
                type="button"
                className="epicure-cart-item__qty-btn"
                onClick={() => updateQuantity(item, 1)}
                aria-label={TEXT.cart.increaseQtyAriaLabel}
              >+</button>
            </div>
          )}
          <div className="epicure-cart-item__details">
            <p className="epicure-cart-item__name">
              <span className="epicure-cart-item__qty-inline">{item.quantity}x </span>
              {item.dish.name}
            </p>
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
            <img src="/icons/Shekel.svg" alt="&#8362;" aria-hidden="true" className="epicure-cart-item__shekel" />
            {(item.dish.price * item.quantity).toFixed(2)}
          </span>
        </div>
        {item.pendingRemove && (
          <div className="epicure-cart-item__confirm-remove">
            <span className="epicure-cart-item__confirm-text">{TEXT.cart.removeConfirm}</span>
            <button
              type="button"
              className="epicure-cart-item__confirm-yes"
              onClick={() => confirmRemove(item)}
            >{TEXT.cart.removeYes}</button>
            <button
              type="button"
              className="epicure-cart-item__confirm-no"
              onClick={() => cancelRemove(item)}
            >{TEXT.cart.removeNo}</button>
          </div>
        )}
      </div>
    </div>
  );
}
