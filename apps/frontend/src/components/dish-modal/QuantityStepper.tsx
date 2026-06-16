'use client';

import { TEXT } from '../../lib/text';

interface QuantityStepperProps {
  quantity: number;
  onChange: (qty: number) => void;
}

export function QuantityStepper({ quantity, onChange }: QuantityStepperProps) {
  return (
    <div className="epicure-dish-modal__section">
      <h3 className="epicure-dish-modal__section-title">{TEXT.dishModal.quantity}</h3>
      <div className="epicure-dish-modal__quantity">
        <button
          type="button"
          className="epicure-dish-modal__qty-btn"
          aria-label={TEXT.dishModal.decreaseAriaLabel}
          onClick={() => onChange(Math.max(1, quantity - 1))}
        >
          —
        </button>
        <span className="epicure-dish-modal__qty-value">{quantity}</span>
        <button
          type="button"
          className="epicure-dish-modal__qty-btn"
          aria-label={TEXT.dishModal.increaseAriaLabel}
          onClick={() => onChange(quantity + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
}
