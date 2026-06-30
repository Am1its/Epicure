import { TEXT } from '../../lib/text';

interface CartFooterProps {
  totalPrice: number;
  hasItems: boolean;
  onCheckout: () => void;
  onOrderHistory: () => void;
}

export function CartFooter({ totalPrice, hasItems, onCheckout, onOrderHistory }: CartFooterProps) {
  return (
    <div className="epicure-cart-panel__footer">
      {hasItems && (
        <>
          <div className="epicure-cart-panel__total">
            {TEXT.cart.total} -&nbsp;
            <img src="/icons/Shekel.svg" alt="₪" aria-hidden="true" className="epicure-cart-panel__total-shekel" />
            {totalPrice}
          </div>
          <button type="button" className="epicure-cart-panel__checkout" onClick={onCheckout}>
            {TEXT.cart.checkout}
            <span className="epicure-cart-panel__checkout-price">
              &nbsp;<img src="/icons/Shekel.svg" alt="₪" aria-hidden="true" className="epicure-cart-panel__checkout-shekel" />
              {totalPrice}
            </span>
          </button>
        </>
      )}
      <button type="button" className="epicure-cart-panel__order-history" onClick={onOrderHistory}>
        {TEXT.cart.orderHistory}
      </button>
    </div>
  );
}
