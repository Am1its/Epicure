import { haversineKm } from './haversine';

describe('haversineKm', () => {
  it('returns 0 for the same point', () => {
    expect(haversineKm(32.0782, 34.7748, 32.0782, 34.7748)).toBe(0);
  });

  it('returns ~55km between Tel Aviv center and Jerusalem center', () => {
    // Tel Aviv: 32.0782, 34.7748 — Jerusalem: 31.7683, 35.2137
    const dist = haversineKm(32.0782, 34.7748, 31.7683, 35.2137);
    expect(dist).toBeGreaterThan(50);
    expect(dist).toBeLessThan(60);
  });

  it('returns ~82km between Tel Aviv center and Haifa center', () => {
    // Haifa: 32.7940, 34.9896
    const dist = haversineKm(32.0782, 34.7748, 32.7940, 34.9896);
    expect(dist).toBeGreaterThan(80);
    expect(dist).toBeLessThan(84);
  });

  it('returns the same distance regardless of direction', () => {
    const d1 = haversineKm(32.0782, 34.7748, 31.7683, 35.2137);
    const d2 = haversineKm(31.7683, 35.2137, 32.0782, 34.7748);
    expect(d1).toBe(d2);
  });
});
