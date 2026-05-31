import type { Dish } from '@org/shared-types';

const STRAPI_URL = 'http://localhost:1337';

function imageUrl(url?: string): string {
  if (!url) return '/icons/placeholder.jpg';
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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl(dish.image?.url)}
          alt={dish.name}
          className="epicure-dish-card__image"
        />
        {dish.type && TYPE_ICONS[dish.type] && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={TYPE_ICONS[dish.type]}
            alt={dish.type}
            className="epicure-dish-card__type-icon"
          />
        )}
      </div>
      <div className="epicure-dish-card__info">
        {dish.isSignatureDish && (
          <p className="epicure-dish-card__signature">Signature Dish</p>
        )}
        <p className="epicure-dish-card__name">{dish.name}</p>
        {dish.description && (
          <p className="epicure-dish-card__description">{dish.description}</p>
        )}
        <p className="epicure-dish-card__price">₪{dish.price}</p>
      </div>
    </div>
  );
}
