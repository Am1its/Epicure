# UI Text Centralization

All visible UI strings live in `apps/frontend/src/lib/text.ts`, exported as `TEXT`.

```ts
import { TEXT } from '../lib/text';

// Good
<h2>{TEXT.home.popularTitle}</h2>
<button aria-label={TEXT.nav.searchAriaLabel}>

// Bad — never do this
<h2>POPULAR RESTAURANT IN EPICURE:</h2>
```

Rules:
- NEVER hardcode visible strings (labels, titles, placeholders, aria-labels) in JSX
- Add new strings to the correct section in `TEXT` before using them
- `TEXT` is `as const` — it's fully typed; TypeScript will catch missing keys
- Reason: single source for future i18n + keeps component JSX clean
