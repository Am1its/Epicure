# Mobile-First Responsive Pattern

Write mobile styles first (no media query). Override for desktop inside `@include for-normal-layout {}` (≥768px).

```scss
@use '../setup/variables' as *;
@use '../setup/mixins' as *;

.epicure-section {
  padding: 1rem;          // mobile default

  @include for-normal-layout {
    padding: 3rem 5rem;   // desktop override
  }
}
```

Desktop-only sections:
- Set `display: none` in base styles (outside any mixin)
- Set `display: block` (or `grid`/`flex`) inside `@include for-normal-layout`

Mobile-only sections:
- Write normally in base styles
- Hide with `display: none` inside `@include for-normal-layout`

## Reordering flex children for desktop without changing HTML

Use CSS `order` to change visual order in desktop without touching the HTML structure (which would break the mobile layout):

```scss
// Mobile: natural HTML order (name → description → price)
// Desktop: name → type-icon → description → price
@include for-normal-layout {
  &__name        { order: 1; }
  &__type-icon   { order: 2; }
  &__description { order: 3; }
  &__price-row   { order: 4; }
}
```

## Aligning variable-height elements across sibling cards

When a flex column item has variable content (e.g. a dish name that may be 1 or 2 lines), use `min-height` so the next element always starts at the same vertical position across all cards:

```scss
&__name {
  min-height: 6rem; // 2 lines × font-size(2.5rem) × line-height(1.2)
}
```

Available mixins (`_mixins.scss`):
- `for-normal-layout` → min-width: 768px
- `for-wide-layout` → min-width: 1200px
- `flex-align($main, $cross, $dir: row)` → shorthand for display:flex + align/justify
