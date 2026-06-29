'use client';

import Link from 'next/link';
import { DishCard } from '@org/ui-components';
import type { Dish } from '@org/shared-types';
import { strapiImageUrl } from '../lib/api';
import { TEXT } from '../lib/text';
import { MobileSection } from './MobileSection';

interface Props {
  dishes: Dish[];
}

export function MobileSignatureDishes({ dishes }: Props) {
  if (dishes.length === 0) return null;

  return (
    <MobileSection
      title={TEXT.home.signatureDishTitle}
      linkLabel={TEXT.home.allRestaurantsLink}
      linkHref="/restaurants"
    >
      {dishes.map(dish => (
        dish.restaurantId != null ? (
          <Link
            key={dish.id}
            href={`/restaurants/${dish.restaurantId}`}
            className="epicure-dish-link"
            aria-label={TEXT.home.dishLinkAriaLabel(dish.name)}
            onClick={() => sessionStorage.setItem('pending_dish_highlight', String(dish.id))}
          >
            <DishCard dish={dish} imageUrl={strapiImageUrl(dish.image?.url)} />
          </Link>
        ) : (
          <DishCard key={dish.id} dish={dish} imageUrl={strapiImageUrl(dish.image?.url)} />
        )
      ))}
    </MobileSection>
  );
}
