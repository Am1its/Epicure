import Link from 'next/link';
import type { Restaurant } from '@org/shared-types';
import { StarRating } from '../star-rating/StarRating';

interface RestaurantCardProps {
  restaurant: Restaurant;
  imageUrl?: string;
}

export function RestaurantCard({ restaurant, imageUrl }: RestaurantCardProps) {
  return (
    <Link href={`/restaurants/${restaurant.id}`} className="epicure-restaurant-card">
      <img
        src={imageUrl ?? '/icons/logo.svg'}
        alt={restaurant.name}
        className="epicure-restaurant-card__image"
      />
      <div className="epicure-restaurant-card__info">
        <p className="epicure-restaurant-card__name">{restaurant.name}</p>
        {restaurant.chef && (
          <p className="epicure-restaurant-card__chef">{restaurant.chef.name}</p>
        )}
        <StarRating rating={restaurant.rating} />
      </div>
    </Link>
  );
}
