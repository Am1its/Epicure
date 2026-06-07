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

Available mixins (`_mixins.scss`):
- `for-normal-layout` → min-width: 768px
- `for-wide-layout` → min-width: 1200px
- `flex-align($main, $cross, $dir: row)` → shorthand for display:flex + align/justify
