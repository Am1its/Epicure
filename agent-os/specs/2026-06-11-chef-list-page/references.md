# References for Chef List Page

## RestaurantCard
- **Location:** `libs/ui-components/src/lib/restaurant-card/RestaurantCard.tsx`
- **Relevance:** Same card pattern — accepts `imageUrl?: string`, renders img + info div
- **Key patterns:** imageUrl prop (caller passes strapiImageUrl), BEM class names

## RestaurantsGrid
- **Location:** `apps/frontend/src/components/RestaurantsGrid.tsx`
- **Relevance:** Same grid + tabs pattern to mirror for ChefsGrid
- **Key patterns:** 'use client', fetchApi in useEffect, tab type from TEXT, useMemo for sort/filter

## _restaurants.scss
- **Location:** `apps/frontend/src/styles/pages/_restaurants.scss`
- **Relevance:** Page layout pattern to mirror
- **Key patterns:** mobile 1-col, desktop repeat(3, 379px) centered, skeleton animation
