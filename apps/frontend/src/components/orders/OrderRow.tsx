'use client';

import type { Order } from '@org/shared-types';
import { TEXT } from '../../lib/text';
import { formatOrderDate } from '../../lib/formatOrderDate';

interface Props {
  order: Order;
  onSelect: (order: Order) => void;
}

export function OrderRow({ order, onSelect }: Props) {
  return (
    <button
      type="button"
      className="epicure-order-row"
      onClick={() => onSelect(order)}
      aria-label={TEXT.orders.rowAriaLabel(order.restaurantName)}
    >
      <span className="epicure-order-row__name">{order.restaurantName}</span>
      <span className="epicure-order-row__date">{formatOrderDate(order.createdAt)}</span>
      <span className="epicure-order-row__total">
        <img src="/icons/Shekel.svg" alt="₪" aria-hidden="true" className="epicure-order-row__shekel" />
        {order.total}
      </span>
      <img src="/icons/Arrow.svg" alt="" aria-hidden="true" className="epicure-order-row__chevron" />
    </button>
  );
}
