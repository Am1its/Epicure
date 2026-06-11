# SCSS Folder Structure (SMACSS)

Single entry point: `apps/frontend/src/styles/main.scss` — imported once in `layout.tsx`.

Folder layout:
- `setup/` — variables, typography, mixins, placeholders
- `basics/` — CSS reset, page-wide layout containers
- `components/` — one `_[name].scss` per component
- `pages/` — one `_[name].scss` per page

Rules:
- NEVER import SCSS files inside components — all styles flow through `main.scss`
- Add new component styles to `components/` and register the `@use` in `main.scss`
- Do NOT recreate `global.css` — it was intentionally replaced
