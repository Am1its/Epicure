import { isValidCardNumber, isValidCVV, isValidExpiry, isCheckoutValid, type CheckoutFormState } from './checkoutValidation';

describe('checkout validation', () => {
  it('validates card number (16 digits, spaces allowed)', () => {
    expect(isValidCardNumber('1234 5678 1234 5678')).toBe(true);
    expect(isValidCardNumber('1234567812345678')).toBe(true);
    expect(isValidCardNumber('1234')).toBe(false);
    expect(isValidCardNumber('abcd5678efgh5678')).toBe(false);
  });

  it('validates CVV (3 digits)', () => {
    expect(isValidCVV('123')).toBe(true);
    expect(isValidCVV('12')).toBe(false);
    expect(isValidCVV('12a')).toBe(false);
  });

  it('validates expiry (MM/YY, month 01-12)', () => {
    expect(isValidExpiry('01/27')).toBe(true);
    expect(isValidExpiry('12/30')).toBe(true);
    expect(isValidExpiry('13/27')).toBe(false);
    expect(isValidExpiry('00/27')).toBe(false);
    expect(isValidExpiry('1/27')).toBe(false);
  });

  it('aggregate validity requires every field', () => {
    const valid: CheckoutFormState = {
      fullName: 'Moshe Levi', address: 'Har Sinai 1', phone: '052123456',
      cardNumber: '1234 5678 1234 5678', nameOnCard: 'Moshe Levi', cvv: '123', expiry: '01/27',
    };
    expect(isCheckoutValid(valid)).toBe(true);
    expect(isCheckoutValid({ ...valid, address: '' })).toBe(false);
    expect(isCheckoutValid({ ...valid, phone: '12' })).toBe(false);
    expect(isCheckoutValid({ ...valid, cvv: 'xx' })).toBe(false);
  });
});
