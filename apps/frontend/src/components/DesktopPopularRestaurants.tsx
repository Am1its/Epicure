'use client';

import { useRef } from 'react';
import { RestaurantCard } from '@org/ui-components';
import type { Restaurant } from '@org/shared-types';
import { strapiImageUrl } from '../lib/api';
import { TEXT } from '../lib/text';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface Props {
  restaurants: Restaurant[];
}

export function DesktopPopularRestaurants({ restaurants }: Props) {
  const ref = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(ref);

  return (
    <section
      ref={ref}
      className={`epicure-desktop-popular${isVisible ? ' epicure-desktop-popular--visible' : ''}`}
    >
      <h2 className="epicure-desktop-popular__title">{TEXT.home.popularTitle}</h2>
      <div className="epicure-desktop-popular__grid">
        {restaurants.map(restaurant => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} imageUrl={strapiImageUrl(restaurant.image?.url)} />
        ))}
      </div>
      <a href="/restaurants" className="epicure-desktop-popular__link">
        {TEXT.home.allRestaurantsLink}
        <img src="/icons/Arrow.svg" alt="" aria-hidden="true" width={24} height={24} />
      </a>
    </section>
  );
}
