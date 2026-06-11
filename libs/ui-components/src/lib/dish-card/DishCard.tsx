import type { Dish } from '@org/shared-types';

const TYPE_ICONS: Record<string, string> = {
  Spicy: '/icons/spicy.svg',
  Vegan: '/icons/vegan.svg',
  Vegetarian: '/icons/vegetarian.svg',
};

interface DishCardProps {
  dish: Dish;
  imageUrl?: string;
}

export function DishCard({ dish, imageUrl }: DishCardProps) {
  return (
    <div className="epicure-dish-card">
      <div className="epicure-dish-card__image-wrap">
        <img
          src={imageUrl ?? '/icons/logo.svg'}
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
