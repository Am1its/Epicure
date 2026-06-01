'use client';

interface CartPanelProps {
  onClose: () => void;
}

export function CartPanel({ onClose }: CartPanelProps) {
  return (
    <>
      <button
        className="epicure-cart-backdrop"
        onClick={onClose}
        aria-label="Close cart"
      />
      <div className="epicure-cart-panel" role="dialog" aria-label="Shopping cart">
        <img src="/icons/cart.svg" alt="cart" width={48} height={48} className="epicure-cart-panel__icon" />
        <p className="epicure-cart-panel__empty">YOUR BAG IS EMPTY</p>
      </div>
    </>
  );
}
