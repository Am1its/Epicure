# Server vs Client Components

## Server components (default)
- Page files (`app/**/page.tsx`) are async server components — fetch data directly with `fetchApi`
- No hooks, no event handlers, no browser APIs
- Fetch in parallel with `Promise.all` when possible

```ts
// app/page.tsx
export default async function Page() {
  const [restaurants, chefs] = await Promise.all([
    fetchApi<Restaurant[]>('/api/restaurants'),
    fetchApi<Chef[]>('/api/chefs'),
  ]);
  return <ClientComponent data={restaurants} />;
}
```

## Client components
- Add `'use client'` at the top when the component uses: `useState`, `useEffect`, event handlers, browser APIs
- Keep client components lean — pass server-fetched data as props, don't re-fetch

```ts
'use client';
import { useState } from 'react';
```

## Rule
- Default to server component. Only add `'use client'` when you have a concrete reason (state, effects, events).
- Dynamic route params ARE a Promise in Next.js 16 — always `await params`:

```ts
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
}
```
