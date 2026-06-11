# Chef List Page — Shaping Notes

## Scope
/chefs list page only (no detail page). 3-column grid of chef cards with All / New / Most Viewed tabs.

## Decisions
- Card design: full-bleed image + white name band at bottom (from Figma — no star rating, no bio in card)
- ChefCard is a non-linking div (no /chefs/:id page yet)
- "Most Viewed" tab = same as All for now (no view tracking in backend)
- "New" tab = sort by id descending (Chef has no createdAt field)
- No filter dropdowns (chefs have no rating/price/distance attributes)
- ChefsGrid fetches chefs client-side via fetchApi('/api/chefs')

## Context
- Visuals: Figma screenshots confirmed — Desktop 3-col grid, Mobile single column, square cards with white name band
- References: RestaurantsGrid + RestaurantCard patterns
- Product alignment: mirrors existing restaurants section
