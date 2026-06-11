# Navigation Links & Mobile/Desktop Layout Pattern

## Always use Link for internal navigation

```tsx
// Good — no full page reload
import Link from 'next/link';
<Link href="/restaurants">Restaurants</Link>

// Bad — triggers full reload, re-fetches all assets
<a href="/restaurants">Restaurants</a>
```

Use `<a href>` only for external links or anchor links.

## Dual mobile/desktop component pattern

Sections with significantly different layouts have two components:
- A **mobile** version (carousel via `MobileSection`) — visible on mobile, hidden on desktop via CSS
- A **desktop** version (grid layout component) — hidden on mobile (`display: none`), shown on desktop via `@include for-normal-layout`

Both are rendered in `page.tsx`. Visibility is controlled entirely by SCSS — no JS breakpoint detection.

```tsx
// page.tsx — render both, CSS decides what's visible
<MobileSection title={TEXT.home.popularTitle}>
  {restaurants.map(r => <RestaurantCard key={r.id} restaurant={r} />)}
</MobileSection>
<DesktopPopularRestaurants restaurants={restaurants} />
```
