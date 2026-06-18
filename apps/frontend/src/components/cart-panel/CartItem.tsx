'use client';

import type { CartItem as CartItemType } from '@org/shared-types';
import { useCart } from '../../context/CartContext';
import { TEXT } from '../../lib/text';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { removeFromCart } = useCart();

  return (
    <div className="epicure-cart-item">
      <img src={item.imageUrl} alt={item.dish.name} className="epicure-cart-item__image" />
      <div className="epicure-cart-item__body">
        <div className="epicure-cart-item__top">
          <span className="epicure-cart-item__qty">{item.quantity}</span>
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
            <img src="/icons/Shekel.svg" alt="₪" aria-hidden="true" className="epicure-cart-item__shekel" />
            {(item.dish.price * item.quantity).toFixed(2)}
          </span>
        </div>
      </div>
      <button
        type="button"
        className="epicure-cart-item__delete"
        onClick={() => removeFromCart(item.dish.id)}
        aria-label={TEXT.cart.deleteItemAriaLabel}
      >
        <img src="/icons/trash.svg" alt="" aria-hidden="true" width={18} height={18} />
      </button>
    </div>
  );
}
