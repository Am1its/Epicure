import type { Restaurant, SearchResults, Order, CreateOrderRequest } from '@org/shared-types';

export const BACKEND_URL = process.env['NEXT_PUBLIC_BACKEND_URL'] ?? 'http://localhost:3333';
export const STRAPI_URL = process.env['NEXT_PUBLIC_STRAPI_URL'] ?? 'http://localhost:1337';

let authToken: string | null = null;
export function setAuthToken(token: string | null): void { authToken = token; }

let onUnauthorized: (() => void) | null = null;
export function setOnUnauthorized(cb: (() => void) | null): void { onUnauthorized = cb; }

function authHeaders(): Record<string, string> {
  return authToken ? { Authorization: `Bearer ${authToken}` } : {};
}

async function extractErrorMessage(res: Response, path: string): Promise<string> {
  try {
    const body: { error?: { message?: string }; message?: string } = await res.json();
    return body?.error?.message ?? body?.message ?? `API error ${res.status}: ${path}`;
  } catch {
    return `API error ${res.status}: ${path}`;
  }
}

export async function fetchApi<T>(path: string, init?: RequestInit): Promise<T> {
  // Default to no-store unless the caller provides explicit caching directives (cache or next.revalidate)
  const hasCustomCache =
    init?.cache != null ||
    (init as RequestInit & { next?: { revalidate?: number } })?.next?.revalidate != null;
  const res = await fetch(`${BACKEND_URL}${path}`, {
    ...(hasCustomCache ? {} : { cache: 'no-store' }),
    ...init,
    headers: { ...authHeaders(), ...(init?.headers as Record<string, string> ?? {}) },
  });
  if (!res.ok) {
    if (res.status === 401) onUnauthorized?.();
    throw new Error(await extractErrorMessage(res, path));
  }
  return res.json();
}

export async function fetchSearch(q: string): Promise<SearchResults> {
  const path = `/api/search?q=${encodeURIComponent(q)}`;
  const res = await fetch(`${BACKEND_URL}${path}`, { cache: 'no-store', headers: authHeaders() });
  if (!res.ok) {
    if (res.status === 401) onUnauthorized?.();
    throw new Error(await extractErrorMessage(res, path));
  }
  return res.json();
}

export async function fetchRestaurantsWithDistances(lat: number, lng: number): Promise<Restaurant[]> {
  const path = '/api/restaurants/distances';
  const res = await fetch(`${BACKEND_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ lat, lng }),
    cache: 'no-store',
  });
  if (!res.ok) {
    if (res.status === 401) onUnauthorized?.();
    throw new Error(await extractErrorMessage(res, path));
  }
  return res.json();
}

export async function postApi<T>(path: string, body: Record<string, unknown>): Promise<T> {
  const res = await fetch(`${BACKEND_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(body),
    cache: 'no-store',
  });
  if (!res.ok) {
    if (res.status === 401) onUnauthorized?.();
    throw new Error(await extractErrorMessage(res, path));
  }
  return res.json() as Promise<T>;
}

export function strapiImageUrl(url?: string): string {
  if (!url) return '/icons/logo.svg';
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}

export async function createOrder(body: CreateOrderRequest): Promise<Order> {
  return postApi<Order>('/api/orders', body as unknown as Record<string, unknown>);
}

export async function fetchOrders(): Promise<Order[]> {
  return fetchApi<Order[]>('/api/orders');
}
