'use client';

import { TEXT } from '../lib/text';

interface CartPanelProps {
  onClose: () => void;
}

export function CartPanel({ onClose }: CartPanelProps) {
  return (
    <>
      <button
        className="epicure-cart-backdrop"
        onClick={onClose}
        aria-label={TEXT.cart.closeAriaLabel}
      />
      <div className="epicure-cart-panel" role="dialog" aria-label={TEXT.cart.dialogAriaLabel}>
        <div className="epicure-cart-panel__body">
          <img src="/icons/cart.svg" alt="cart" width={50} height={50} className="epicure-cart-panel__icon" />
          <p className="epicure-cart-panel__empty">{TEXT.cart.empty}</p>
        </div>
        <button className="epicure-cart-panel__order-history">{TEXT.cart.orderHistory}</button>
      </div>
    </>
  );
}
