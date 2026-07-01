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
        <h2 className="epicure-cart-conflict__title">{TEXT.cartConflict.title}</h2>
        <p className="epicure-cart-conflict__message">{TEXT.cartConflict.message}</p>
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
