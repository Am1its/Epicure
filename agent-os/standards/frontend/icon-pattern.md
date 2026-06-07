# Icon Usage Pattern

All icons are `<img>` tags — never inline SVGs.

```tsx
// Good
<img src="/icons/search.svg" alt="" aria-hidden="true" width={22} height={22} />

// Decorative icons: alt="" + aria-hidden="true"
// Meaningful icons: alt="descriptive text", no aria-hidden
```

Icon files live in `apps/frontend/public/icons/`. Active icons:
- `logo.svg`, `search.svg`, `cart.svg`, `user.svg`, `Hamburger.svg`, `x.svg`
- `spicy.svg`, `vegan.svg`, `vegetarian.svg`
- `Shekel.svg` (7.5×7.5px in DishCard price row)
- `about-logo.svg` — mobile: 102px (MobileAppSection); desktop: 178×166px (DesktopAboutSection). EPICURE text is baked in — don't add a separate span.
- `apple.svg`, `google.svg` (app store buttons)

Fallback image: `/icons/logo.svg` (not `/placeholder.jpg` — doesn't exist).

## Forcing an SVG icon to render black

Use `filter: brightness(0)` on the `<img>` or its wrapper — do not add a color prop or tint the SVG source:

```scss
.epicure-nav__search-clear {
  filter: brightness(0); // forces the SVG to full black regardless of its fill
}
```
