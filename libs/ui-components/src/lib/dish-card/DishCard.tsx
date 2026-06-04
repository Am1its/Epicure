import type { Dish } from '@org/shared-types';

const STRAPI_URL = process.env['NEXT_PUBLIC_STRAPI_URL'] ?? 'http://localhost:1337';

function imageUrl(url?: string): string {
  if (!url) return '/icons/logo.svg';
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}

const TYPE_ICONS: Record<string, string> = {
  Spicy: '/icons/spicy.svg',
  Vegan: '/icons/vegan.svg',
  Vegetarian: '/icons/vegetarian.svg',
};

interface DishCardProps {
  dish: Dish;
}

export function DishCard({ dish }: DishCardProps) {
  return (
    <div className="epicure-dish-card">
      <div className="epicure-dish-card__image-wrap">
        <img
          src={imageUrl(dish.image?.url)}
          alt={dish.name}
          className="epicure-dish-card__image"
        />
      </div>
      <div className="epicure-dish-card__info">
        {dish.isSignatureDish && (
          <p className="epicure-dish-card__signature">Signature Dish</p>
        )}
        <p className="epicure-dish-card__name">{dish.name}</p>
        {dish.restaurantName && (
          <p className="epicure-dish-card__restaurant">{dish.restaurantName}</p>
        )}
        {dish.description && (
          <p className="epicure-dish-card__description">{dish.description}</p>
        )}
        {dish.type && TYPE_ICONS[dish.type] && (
          <img
            src={TYPE_ICONS[dish.type]}
            alt={dish.type}
            className="epicure-dish-card__type-icon"
          />
        )}
        <div className="epicure-dish-card__price-row">
          <img src="/icons/Shekel.svg" alt="₪" aria-hidden="true" className="epicure-dish-card__shekel-icon" />
          <span className="epicure-dish-card__price">{dish.price}</span>
        </div>
      </div>
    </div>
  );
}
