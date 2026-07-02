'use client';

import { useEffect, useRef, useState } from 'react';
import type { CartItem } from '@org/shared-types';
import { TEXT } from '../../lib/text';
import { useClickOutside } from '../../hooks/useClickOutside';

interface Props {
  items: CartItem[];
  total: number;
  onClose: () => void;
}

export function CheckoutSuccessModal({ items, total, onClose }: Props) {
  const [seconds, setSeconds] = useState(90 * 60);
  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutside(modalRef, onClose);

  useEffect(() => {
    const id = setInterval(() => setSeconds(s => {
      if (s <= 1) { clearInterval(id); return 0; }
      return s - 1;
    }), 1000);
    return () => clearInterval(id);
  }, []);

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  return (
    <>
      <div className="epicure-checkout-success__backdrop" />
      <div ref={modalRef} className="epicure-checkout-success" role="dialog" aria-modal="true" aria-label={TEXT.checkout.successTitle}>
        <button type="button" className="epicure-checkout-success__close" onClick={onClose} aria-label={TEXT.checkout.closeAriaLabel}>
          <img src="/icons/x.svg" alt="" aria-hidden="true" />
        </button>
        <div className="epicure-checkout-success__scroll">
          <img src="/icons/Vector.svg" alt="" aria-hidden="true" className="epicure-checkout-success__check" />
          <h2 className="epicure-checkout-success__title">{TEXT.checkout.successTitle}</h2>
          <p className="epicure-checkout-success__subtitle">{TEXT.checkout.successSubtitle}</p>
          <div className="epicure-checkout-success__eta">
            <span className="epicure-checkout-success__eta-label">{TEXT.checkout.arrivingIn}</span>
            <span className="epicure-checkout-success__countdown">{mm}:{ss}</span>
            <span className="epicure-checkout-success__eta-unit">{TEXT.checkout.minutesSuffix}</span>
          </div>
          <ul className="epicure-checkout-success__items">
            {items.map((item, i) => (
              <li className="epicure-checkout-success__item" key={`${item.dish.id}-${i}`}>
                <span className="epicure-checkout-success__item-qty">{item.quantity}x</span>
                <span className="epicure-checkout-success__item-name">{item.dish.name}</span>
                <span className="epicure-checkout-success__item-total">
                  <img src="/icons/Shekel.svg" alt="₪" aria-hidden="true" className="epicure-checkout-success__shekel" />
                  {(item.dish.price * item.quantity).toFixed(0)}
                </span>
              </li>
            ))}
          </ul>
          <p className="epicure-checkout-success__total">
            {TEXT.checkout.total} &mdash;{' '}
            <img src="/icons/Shekel.svg" alt="₪" aria-hidden="true" className="epicure-checkout-success__shekel" />
            {total}
          </p>
        </div>
      </div>
    </>
  );
}
