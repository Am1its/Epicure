'use client';

import type { Order } from '@org/shared-types';
import { useCart } from '../../context/CartContext';
import { TEXT } from '../../lib/text';
import { dispatchOpenCart } from '../../lib/events';

interface Props {
  order: Order;
  onClose: () => void;
}

export function OrderSummaryModal({ order, onClose }: Props) {
  const { replaceCart, conflictsWithCart } = useCart();

  function handleOrderAgain() {
    if (conflictsWithCart(order.restaurantId)) {
      const ok = window.confirm(TEXT.cart.replaceConfirm);
      if (!ok) return;
    }
    replaceCart(order);
    onClose();
    dispatchOpenCart();
  }

  return (
    <>
      <button type="button" className="epicure-order-summary__backdrop" onClick={onClose} aria-label={TEXT.orders.closeAriaLabel} />
      <div className="epicure-order-summary" role="dialog" aria-modal="true" aria-label={TEXT.orders.summaryTitle}>
        <button type="button" className="epicure-order-summary__close" onClick={onClose} aria-label={TEXT.orders.closeAriaLabel}>
          <img src="/icons/x.svg" alt="" aria-hidden="true" />
        </button>
        <h2 className="epicure-order-summary__title">{TEXT.orders.summaryTitle}</h2>
        <p className="epicure-order-summary__restaurant">{order.restaurantName}</p>
        <div className="epicure-order-summary__items">
          {order.items.map((item, i) => (
            <div className="epicure-order-summary__item" key={`${item.dishId}-${i}`}>
              <img src={item.imageUrl} alt={item.name} className="epicure-order-summary__img" />
              <div className="epicure-order-summary__item-body">
                <span className="epicure-order-summary__qty">{item.quantity}</span>
                <div className="epicure-order-summary__item-text">
                  <p className="epicure-order-summary__name">{item.name}</p>
                  <p className="epicure-order-summary__price">
                    <img src="/icons/Shekel.svg" alt="₪" aria-hidden="true" className="epicure-order-summary__shekel" />
                    {item.price.toFixed(2)}
                  </p>
                  {(item.selectedSide || item.selectedChanges.length > 0) && (
                    <p className="epicure-order-summary__meta">
                      {[item.selectedSide, ...item.selectedChanges].filter(Boolean).join(' | ')}
                    </p>
                  )}
                </div>
                <span className="epicure-order-summary__line-total">
                  <img src="/icons/Shekel.svg" alt="₪" aria-hidden="true" className="epicure-order-summary__shekel" />
                  {(item.price * item.quantity).toFixed(0)}
                </span>
              </div>
            </div>
          ))}
        </div>
        <p className="epicure-order-summary__total">
          <img src="/icons/Shekel.svg" alt="₪" aria-hidden="true" className="epicure-order-summary__shekel" />
          {order.total}
        </p>
        {order.comment && (
          <>
            <p className="epicure-order-summary__comment-label">{TEXT.checkout.addComment}</p>
            <p className="epicure-order-summary__comment">{order.comment}</p>
          </>
        )}
        <button type="button" className="epicure-order-summary__again" onClick={handleOrderAgain}>{TEXT.orders.orderAgain}</button>
        <button type="button" className="epicure-order-summary__history" onClick={onClose}>{TEXT.orders.orderHistory}</button>
      </div>
    </>
  );
}
