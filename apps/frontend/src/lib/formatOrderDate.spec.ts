import { formatOrderDate } from './formatOrderDate';

describe('formatOrderDate', () => {
  it('formats an ISO date as DD-MM-YYYY, HH:MM in local time', () => {
    const d = new Date(2022, 2, 29, 11, 54);
    expect(formatOrderDate(d.toISOString())).toBe('29-03-2022, 11:54');
  });

  it('zero-pads single-digit parts', () => {
    const d = new Date(2026, 0, 5, 9, 7);
    expect(formatOrderDate(d.toISOString())).toBe('05-01-2026, 09:07');
  });
});
