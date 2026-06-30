'use client';

import { useEffect, useState } from 'react';
import type { CartItem } from '@org/shared-types';
import { TEXT } from '../../lib/text';

interface Props {
  items: CartItem[];
  total: number;
  onClose: () => void;
}

export function CheckoutSuccessModal({ items, total, onClose }: Props) {
  const [seconds, setSeconds] = useState(90 * 60);

  useEffect(() => {
    const id = setInterval(() => setSeconds(s => (s <= 0 ? 0 : s - 1)), 1000);
    return () => clearInterval(id);
  }, []);

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  return (
    <>
      <div className="epicure-checkout-success__backdrop" />
      <div className="epicure-checkout-success" role="dialog" aria-modal="true" aria-label={TEXT.checkout.successTitle}>
        <button type="button" className="epicure-checkout-success__close" onClick={onClose} aria-label={TEXT.checkout.closeAriaLabel}>
          <img src="/icons/x.svg" alt="" aria-hidden="true" />
        </button>
        <h2 className="epicure-checkout-success__title">{TEXT.checkout.successTitle}</h2>
        <p className="epicure-checkout-success__subtitle">{TEXT.checkout.successSubtitle}</p>
        <p className="epicure-checkout-success__eta-label">{TEXT.checkout.arrivingIn}</p>
        <p className="epicure-checkout-success__countdown">{mm}:{ss}</p>
        <ul className="epicure-checkout-success__items">
          {items.map((item, i) => (
            <li key={`${item.dish.id}-${i}`}>
              {item.dish.name} &times;{item.quantity}
            </li>
          ))}
        </ul>
        <p className="epicure-checkout-success__total">
          {TEXT.checkout.total} &mdash; &#8362;{total}
        </p>
      </div>
    </>
  );
}
