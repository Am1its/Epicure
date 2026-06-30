'use client';

import { useRef } from 'react';
import { RestaurantCard } from '@org/ui-components';
import type { Chef, Restaurant } from '@org/shared-types';
import { strapiImageUrl } from '../lib/api';
import { TEXT } from '../lib/text';
import { Carousel } from './Carousel';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface Props {
  chef: Chef;
  restaurants: Restaurant[];
}

export function MobileChefSection({ chef, restaurants }: Props) {
  const ref = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(ref);

  return (
    <section
      ref={ref}
      className={`epicure-chef-week${isVisible ? ' epicure-chef-week--visible' : ''}`}
    >
      <h2 className="epicure-chef-week__title">{TEXT.chefOfTheWeek.sectionTitle}</h2>
      <div className="epicure-chef-week__photo-wrap">
        <img
          src={strapiImageUrl(chef.image?.url)}
          alt={chef.name}
          className="epicure-chef-week__photo"
        />
        <div className="epicure-chef-week__name-bar">
          <span className="epicure-chef-week__name">{chef.name}</span>
        </div>
      </div>
      <p className="epicure-chef-week__bio">{chef.bio ?? TEXT.chefOfTheWeek.bioPlaceholder}</p>
      <p className="epicure-chef-week__restaurants-label">
        {(chef.name.split(' ')[0] || chef.name).toUpperCase()}&apos;S RESTAURANTS
      </p>
      <Carousel className="epicure-chef-week__cards-row">
        {restaurants.map(restaurant => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} imageUrl={strapiImageUrl(restaurant.image?.url)} />
        ))}
      </Carousel>
      <a href="/restaurants" className="epicure-chef-week__all-link">
        {TEXT.chefOfTheWeek.allRestaurantsLink}
        <img src="/icons/Arrow.svg" alt="" aria-hidden="true" width={24} height={24} />
      </a>
    </section>
  );
}
