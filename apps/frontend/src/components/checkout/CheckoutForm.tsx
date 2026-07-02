'use client';

import { TEXT } from '../../lib/text';
import type { CheckoutFormState } from '../../lib/checkoutValidation';

interface Props {
  form: CheckoutFormState;
  onChange: (patch: Partial<CheckoutFormState>) => void;
}

export function CheckoutForm({ form, onChange }: Props) {
  function handleExpiryChange(raw: string) {
    const deleting = raw.length < form.expiry.length;
    if (deleting) {
      // Respect exactly what's left after the user's edit — don't recompute the
      // slash position from a flattened digit string. Reformatting from scratch
      // reshuffles digits across the MM/YY boundary and corrupts edits made
      // anywhere but the very end of the field.
      onChange({ expiry: raw.replace(/[^\d/]/g, '').slice(0, 5) });
      return;
    }
    const digits = raw.replace(/\D/g, '').slice(0, 4);
    onChange({ expiry: digits.length >= 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits });
  }

  return (
    <div className="epicure-checkout-form">
      <section className="epicure-checkout-form__section">
        <h2 className="epicure-checkout-form__heading">{TEXT.checkout.deliveryDetails}</h2>
        <label className="epicure-checkout-form__field">
          <span className="epicure-checkout-form__label">{TEXT.checkout.fullName}</span>
          <input className="epicure-checkout-form__input" value={form.fullName} onChange={e => onChange({ fullName: e.target.value })} />
        </label>
        <label className="epicure-checkout-form__field">
          <span className="epicure-checkout-form__label">{TEXT.checkout.address}</span>
          <input className="epicure-checkout-form__input" value={form.address} onChange={e => onChange({ address: e.target.value })} />
        </label>
        <label className="epicure-checkout-form__field">
          <span className="epicure-checkout-form__label">{TEXT.checkout.phone}</span>
          <input className="epicure-checkout-form__input" inputMode="tel" value={form.phone} onChange={e => onChange({ phone: e.target.value })} />
        </label>
      </section>

      <section className="epicure-checkout-form__section">
        <h2 className="epicure-checkout-form__heading">{TEXT.checkout.paymentDetails}</h2>
        <label className="epicure-checkout-form__field">
          <span className="epicure-checkout-form__label">{TEXT.checkout.cardNumber}</span>
          <input className="epicure-checkout-form__input" inputMode="numeric" value={form.cardNumber} onChange={e => onChange({ cardNumber: e.target.value })} />
        </label>
        <label className="epicure-checkout-form__field">
          <span className="epicure-checkout-form__label">{TEXT.checkout.nameOnCard}</span>
          <input className="epicure-checkout-form__input" value={form.nameOnCard} onChange={e => onChange({ nameOnCard: e.target.value })} />
        </label>
        <label className="epicure-checkout-form__field">
          <span className="epicure-checkout-form__label">{TEXT.checkout.cvv}</span>
          <input className="epicure-checkout-form__input" inputMode="numeric" value={form.cvv} onChange={e => onChange({ cvv: e.target.value })} />
        </label>
        <label className="epicure-checkout-form__field">
          <span className="epicure-checkout-form__label">{TEXT.checkout.expiry}</span>
          <input className="epicure-checkout-form__input" inputMode="numeric" placeholder={TEXT.checkout.expiryPlaceholder} value={form.expiry} onChange={e => handleExpiryChange(e.target.value)} />
        </label>
      </section>
    </div>
  );
}
