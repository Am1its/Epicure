export interface CheckoutFormState {
  fullName: string;
  address: string;
  phone: string;
  cardNumber: string;
  nameOnCard: string;
  cvv: string;
  expiry: string;
}

export function isValidCardNumber(v: string): boolean {
  return /^\d{16}$/.test(v.replace(/\s/g, ''));
}

export function isValidCVV(v: string): boolean {
  return /^\d{3}$/.test(v.trim());
}

export function isValidExpiry(v: string): boolean {
  const m = v.trim().match(/^(\d{2})\/(\d{2})$/);
  if (!m) return false;
  const month = parseInt(m[1], 10);
  return month >= 1 && month <= 12;
}

export function isCheckoutValid(f: CheckoutFormState): boolean {
  return (
    f.fullName.trim() !== '' &&
    f.address.trim() !== '' &&
    /^\d{6,}$/.test(f.phone.replace(/[\s-]/g, '')) &&
    isValidCardNumber(f.cardNumber) &&
    f.nameOnCard.trim() !== '' &&
    isValidCVV(f.cvv) &&
    isValidExpiry(f.expiry)
  );
}
