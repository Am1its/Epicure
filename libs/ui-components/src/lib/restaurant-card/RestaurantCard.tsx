import Link from 'next/link';
import type { Restaurant } from '@org/shared-types';
import { StarRating } from '../star-rating/StarRating';

const STRAPI_URL = process.env['NEXT_PUBLIC_STRAPI_URL'] ?? 'http://localhost:1337';

function imageUrl(url?: string): string {
  if (!url) return '/icons/logo.svg';
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Link href={`/restaurants/${restaurant.id}`} className="epicure-restaurant-card">
      <img
        src={imageUrl(restaurant.image?.url)}
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
