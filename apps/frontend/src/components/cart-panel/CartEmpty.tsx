import { TEXT } from '../../lib/text';

export function CartEmpty() {
  return (
    <div className="epicure-cart-panel__body">
      <img src="/icons/cart.svg" alt="" aria-hidden="true" width={50} height={50} className="epicure-cart-panel__icon" />
      <p className="epicure-cart-panel__empty">{TEXT.cart.empty}</p>
    </div>
  );
}
