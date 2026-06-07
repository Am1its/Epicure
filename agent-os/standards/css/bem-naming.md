# BEM Naming Convention

All blocks use the `epicure-` prefix to avoid global class collisions.

Pattern:
```scss
.epicure-[block] { }
.epicure-[block]__[element] { }    // child element
.epicure-[block]--[modifier] { }   // variant (use sparingly)
```

Example:
```scss
.epicure-nav { }
.epicure-nav__hamburger { }
.epicure-nav__logo { }
```

Rules:
- NEVER use unprefixed class names (e.g. `.header`, `.card`) — always `.epicure-header`
- Nest element selectors with `&__child` inside the block
- Active/open states are driven by JS className toggling (`className={isOpen ? 'epicure-panel epicure-panel--open' : 'epicure-panel'}`), not inline styles
