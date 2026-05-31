export const BACKEND_URL = process.env['NEXT_PUBLIC_BACKEND_URL'] ?? 'http://localhost:3333';
export const STRAPI_URL = process.env['NEXT_PUBLIC_STRAPI_URL'] ?? 'http://localhost:1337';

export async function fetchApi<T>(path: string): Promise<T> {
  const res = await fetch(`${BACKEND_URL}${path}`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
  return res.json();
}

export function strapiImageUrl(url?: string): string {
  if (!url) return '/icons/placeholder.jpg';
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}
