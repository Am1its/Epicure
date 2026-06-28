'use client';

import { useRef } from 'react';
import { RestaurantCard } from '@org/ui-components';
import type { Chef, Restaurant } from '@org/shared-types';
import { strapiImageUrl } from '../lib/api';
import { TEXT } from '../lib/text';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface Props {
  chef: Chef;
  restaurants: Restaurant[];
}

export function DesktopChefSection({ chef, restaurants }: Props) {
  const ref = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(ref);

  return (
    <section
      ref={ref}
      className={`epicure-desktop-chef${isVisible ? ' epicure-desktop-chef--visible' : ''}`}
    >
      <h2 className="epicure-desktop-chef__title">{TEXT.chefOfTheWeek.sectionTitle}</h2>
      <div className="epicure-desktop-chef__row">
        <div className="epicure-desktop-chef__photo-col">
          <img
            src={strapiImageUrl(chef.image?.url)}
            alt={chef.name}
            className="epicure-desktop-chef__photo"
          />
          <div className="epicure-desktop-chef__name-bar">{chef.name}</div>
        </div>
        <p className="epicure-desktop-chef__bio">{chef.bio ?? TEXT.chefOfTheWeek.bioPlaceholder}</p>
      </div>
      <p className="epicure-desktop-chef__label">{chef.name.split(' ')[0] || chef.name}&apos;s Restaurants</p>
      <div className="epicure-desktop-chef__cards">
        {restaurants.map(restaurant => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} imageUrl={strapiImageUrl(restaurant.image?.url)} />
        ))}
      </div>
    </section>
  );
}
