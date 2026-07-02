'use client';

import { TEXT } from '../lib/text';

interface Props {
  onLoadSaved: () => void;
  onKeepCurrent: () => void;
}

export function CartConflictModal({ onLoadSaved, onKeepCurrent }: Props) {
  return (
    <>
      <div className="epicure-cart-conflict__backdrop" />
      <div
        className="epicure-cart-conflict"
        role="dialog"
        aria-modal="true"
        aria-label={TEXT.cartConflict.title}
      >
        <span className="epicure-cart-conflict__icon" aria-hidden="true">
          <img src="/icons/cart.svg" alt="" />
        </span>
        <h2 className="epicure-cart-conflict__title">{TEXT.cartConflict.title}</h2>
        <p className="epicure-cart-conflict__message">{TEXT.cartConflict.message}</p>
        <p className="epicure-cart-conflict__question">{TEXT.cartConflict.question}</p>
        <button type="button" className="epicure-cart-conflict__load" onClick={onLoadSaved}>
          {TEXT.cartConflict.loadSaved}
        </button>
        <button type="button" className="epicure-cart-conflict__keep" onClick={onKeepCurrent}>
          {TEXT.cartConflict.keepCurrent}
        </button>
      </div>
    </>
  );
}
