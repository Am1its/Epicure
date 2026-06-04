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
        <img src="/icons/cart.svg" alt="cart" width={48} height={48} className="epicure-cart-panel__icon" />
        <p className="epicure-cart-panel__empty">{TEXT.cart.empty}</p>
      </div>
    </>
  );
}
