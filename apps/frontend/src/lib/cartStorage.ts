const STORAGE_KEY = 'epicure-cart';

export function loadCart<T>(): T | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as T) : null;
  } catch {
    return null;
  }
}

export function saveCart<T>(state: T): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
