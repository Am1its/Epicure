'use client';

import type { CartItem } from '@org/shared-types';
import { TEXT } from '../../lib/text';

interface Props {
  restaurantName: string | null;
  items: CartItem[];
  comment: string;
  onCommentChange: (value: string) => void;
}

export function CheckoutOrderSummary({ restaurantName, items, comment, onCommentChange }: Props) {
  return (
    <div className="epicure-checkout-summary">
      <h2 className="epicure-checkout-summary__title">{TEXT.checkout.yourOrder}</h2>
      <p className="epicure-checkout-summary__restaurant">{restaurantName}</p>
      <div className="epicure-checkout-summary__items">
        {items.map((item, i) => (
          <div className="epicure-checkout-summary__item" key={`${item.dish.id}-${item.selectedSide ?? ''}-${i}`}>
            <img src={item.imageUrl} alt={item.dish.name} className="epicure-checkout-summary__img" />
            <div className="epicure-checkout-summary__item-body">
              <span className="epicure-checkout-summary__qty">{item.quantity}</span>
              <div className="epicure-checkout-summary__item-text">
                <p className="epicure-checkout-summary__name">{item.dish.name}</p>
                <p className="epicure-checkout-summary__price">
                  <img src="/icons/Shekel.svg" alt="₪" aria-hidden="true" className="epicure-checkout-summary__shekel" />
                  {item.dish.price.toFixed(2)}
                </p>
                {(item.selectedSide || (item.selectedChanges ?? []).length > 0) && (
                  <p className="epicure-checkout-summary__meta">
                    {[item.selectedSide, ...(item.selectedChanges ?? [])].filter(Boolean).join(' | ')}
                  </p>
                )}
              </div>
              <span className="epicure-checkout-summary__line-total">
                <img src="/icons/Shekel.svg" alt="₪" aria-hidden="true" className="epicure-checkout-summary__shekel" />
                {(item.dish.price * item.quantity).toFixed(0)}
              </span>
            </div>
          </div>
        ))}
      </div>
      <hr className="epicure-checkout-summary__divider" />
      <p className="epicure-checkout-summary__comment-label">{TEXT.checkout.addComment}</p>
      <textarea
        className="epicure-checkout-summary__comment"
        placeholder={TEXT.checkout.commentPlaceholder}
        value={comment}
        onChange={e => onCommentChange(e.target.value)}
      />
    </div>
  );
}
