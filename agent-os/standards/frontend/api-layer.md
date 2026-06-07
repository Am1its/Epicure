# Frontend API Layer

All API calls go through `apps/frontend/src/lib/api.ts`. Never call NestJS or Strapi directly from components.

```ts
import { fetchApi, strapiImageUrl } from '../lib/api';

// Fetch from NestJS backend
const restaurants = await fetchApi<Restaurant[]>('/api/restaurants');
const restaurant  = await fetchApi<Restaurant>(`/api/restaurants/${id}`);

// Build Strapi image URLs (handles relative paths + missing images)
<img src={strapiImageUrl(item.image?.url)} />
```

## Rules
- `fetchApi` uses `cache: 'no-store'` — always fresh data
- `strapiImageUrl` falls back to `/icons/logo.svg` when url is undefined
- Backend base URL: `NEXT_PUBLIC_BACKEND_URL` (default `http://localhost:3333`)
- Strapi image base URL: `NEXT_PUBLIC_STRAPI_URL` (default `http://localhost:1337`)
- Types for responses come from `@org/shared-types` (Restaurant, Chef, Dish, StrapiImage)

## Architecture
Frontend → NestJS (port 3333) → Strapi (port 1337)

Strapi is internal only. Frontend never calls Strapi directly.
