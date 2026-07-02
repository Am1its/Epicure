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
import type { CreateOrderRequest, OrderItem } from '@org/shared-types';

const EMPTY_FORM: CheckoutFormState = {
  fullName: '', address: '', phone: '', cardNumber: '', nameOnCard: '', cvv: '', expiry: '',
};

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { cartItems, restaurantId, restaurantName, totalPrice, comment, setComment, showOrderSuccess } = useCart();
  const [form, setForm] = useState<CheckoutFormState>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const committed = cartItems.filter(c => !c.pendingRemove);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (mounted && (!user || committed.length === 0)) router.replace('/');
  }, [mounted, user, committed.length, router]);

  // Return null until mounted so server and client first-render both produce null.
  if (!mounted) return null;
  if (!user || committed.length === 0) return null;

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
      showOrderSuccess({ items: committed, total: totalPrice });
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : TEXT.checkout.submitError);
      setSubmitting(false);
    }
  }

  return (
    <main className="epicure-checkout">
      <div className="epicure-checkout__back">
        <button type="button" className="epicure-checkout__back-btn" onClick={() => router.back()}>
          ← {TEXT.checkout.goBack}
        </button>
        <span className="epicure-checkout__back-note">{TEXT.checkout.orderSaved}</span>
      </div>
      <div className="epicure-checkout__inner">
        <CheckoutForm form={form} onChange={patch => setForm(prev => ({ ...prev, ...patch }))} />
        <div className="epicure-checkout__right">
          <CheckoutOrderSummary
            restaurantName={restaurantName}
            items={committed}
            comment={comment}
            onCommentChange={setComment}
          />
          <p className="epicure-checkout__error">{error ?? ''}</p>
          <button type="button" className="epicure-checkout__pay" disabled={!canPay} onClick={handlePay}>
            <img
              src={canPay ? '/icons/lock-open.svg' : '/icons/lock-close.svg'}
              alt=""
              aria-hidden="true"
              className="epicure-checkout__pay-lock"
            />
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
