import type { Restaurant, SearchResults } from '@org/shared-types';

export const BACKEND_URL = process.env['NEXT_PUBLIC_BACKEND_URL'] ?? 'http://localhost:3333';
export const STRAPI_URL = process.env['NEXT_PUBLIC_STRAPI_URL'] ?? 'http://localhost:1337';

export async function fetchApi<T>(path: string): Promise<T> {
  const res = await fetch(`${BACKEND_URL}${path}`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
  return res.json();
}

export async function fetchSearch(q: string): Promise<SearchResults> {
  const res = await fetch(`${BACKEND_URL}/api/search?q=${encodeURIComponent(q)}`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`API error ${res.status}: /api/search`);
  return res.json();
}

export async function fetchRestaurantsWithDistances(lat: number, lng: number): Promise<Restaurant[]> {
  const res = await fetch(`${BACKEND_URL}/api/restaurants/distances`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lat, lng }),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`API error ${res.status}: /api/restaurants/distances`);
  return res.json();
}

export function strapiImageUrl(url?: string): string {
  if (!url) return '/icons/logo.svg';
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}
