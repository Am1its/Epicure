'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { createOrder } from '../../lib/api';
import { TEXT } from '../../lib/text';
import { isCheckoutValid, type CheckoutFormState } from '../../lib/checkoutValidation';
import { CheckoutForm } from '../../components/checkout/CheckoutForm';
import { CheckoutOrderSummary } from '../../components/checkout/CheckoutOrderSummary';
import { CheckoutSuccessModal } from '../../components/checkout/CheckoutSuccessModal';
import type { CreateOrderRequest, OrderItem, CartItem } from '@org/shared-types';

const EMPTY_FORM: CheckoutFormState = {
  fullName: '', address: '', phone: '', cardNumber: '', nameOnCard: '', cvv: '', expiry: '',
};

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { cartItems, restaurantId, restaurantName, totalPrice, comment, setComment, clearCart } = useCart();
  const [form, setForm] = useState<CheckoutFormState>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmedItems, setConfirmedItems] = useState<CartItem[]>([]);
  const [confirmedTotal, setConfirmedTotal] = useState(0);

  const committed = cartItems.filter(c => !c.pendingRemove);

  useEffect(() => {
    if (!submitted && (!user || committed.length === 0)) router.replace('/');
  }, [user, committed.length, router, submitted]);

  if (!submitted && (!user || committed.length === 0)) return null;

  const canPay = isCheckoutValid(form) && !submitting;

  async function handlePay() {
    if (!canPay || restaurantId == null || restaurantName == null) return;
    setSubmitting(true);
    setError(null);
    const items: OrderItem[] = committed.map(c => ({
      dishId: c.dish.id, name: c.dish.name, price: c.dish.price,
      quantity: c.quantity, imageUrl: c.imageUrl,
      selectedSide: c.selectedSide, selectedChanges: c.selectedChanges,
    }));
    const body: CreateOrderRequest = {
      restaurantId, restaurantName, items, comment: comment || undefined, total: totalPrice,
      delivery: { name: form.fullName, address: form.address, phone: form.phone },
    };
    try {
      await createOrder(body);
      setConfirmedItems(committed);
      setConfirmedTotal(totalPrice);
      setSubmitted(true);
    } catch {
      setError(TEXT.checkout.submitError);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <CheckoutSuccessModal
        items={confirmedItems}
        total={confirmedTotal}
        onClose={() => { clearCart(); router.push('/'); }}
      />
    );
  }

  return (
    <main className="epicure-checkout">
      <div className="epicure-checkout__inner">
        <CheckoutForm form={form} onChange={patch => setForm(prev => ({ ...prev, ...patch }))} />
        <div className="epicure-checkout__right">
          <CheckoutOrderSummary
            restaurantName={restaurantName}
            items={committed}
            comment={comment}
            onCommentChange={setComment}
          />
          {error && <p className="epicure-checkout__error">{error}</p>}
          <button type="button" className="epicure-checkout__pay" disabled={!canPay} onClick={handlePay}>
            {TEXT.checkout.pay}
            <span className="epicure-checkout__pay-total">
              <img src="/icons/Shekel.svg" alt="₪" aria-hidden="true" className="epicure-checkout__pay-shekel" />
              {totalPrice}
            </span>
          </button>
        </div>
      </div>
    </main>
  );
}
