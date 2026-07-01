const BASE_KEY = 'epicure-cart';
const cartKey = (userId?: number) => userId != null ? `${BASE_KEY}-${userId}` : BASE_KEY;

export function loadCartForUser<T>(userId?: number): T | null {
  try {
    const saved = localStorage.getItem(cartKey(userId));
    return saved ? (JSON.parse(saved) as T) : null;
  } catch {
    return null;
  }
}

export function saveCartForUser<T>(state: T, userId?: number): void {
  try {
    localStorage.setItem(cartKey(userId), JSON.stringify(state));
  } catch { /* ignore */ }
}
