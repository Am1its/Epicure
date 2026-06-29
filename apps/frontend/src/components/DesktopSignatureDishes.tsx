'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { DishCard } from '@org/ui-components';
import type { Dish } from '@org/shared-types';
import { strapiImageUrl } from '../lib/api';
import { TEXT } from '../lib/text';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { PENDING_DISH_KEY } from '../lib/events';

interface Props {
  dishes: Dish[];
}

export function DesktopSignatureDishes({ dishes }: Props) {
  const ref = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(ref);

  if (dishes.length === 0) return null;

  return (
    <section
      ref={ref}
      className={`epicure-desktop-signature${isVisible ? ' epicure-desktop-signature--visible' : ''}`}
    >
      <h2 className="epicure-desktop-signature__title">{TEXT.home.signatureDishTitle}</h2>
      <div className="epicure-desktop-signature__grid">
        {dishes.map(dish => (
          dish.restaurantId != null ? (
            <Link
              key={dish.id}
              href={`/restaurants/${dish.restaurantId}`}
              className="epicure-dish-link"
              aria-label={TEXT.home.dishLinkAriaLabel(dish.name)}
              onClick={() => sessionStorage.setItem(PENDING_DISH_KEY, String(dish.id))}
            >
              <DishCard dish={dish} imageUrl={strapiImageUrl(dish.image?.url)} />
            </Link>
          ) : (
            <DishCard key={dish.id} dish={dish} imageUrl={strapiImageUrl(dish.image?.url)} />
          )
        ))}
      </div>
    </section>
  );
}
