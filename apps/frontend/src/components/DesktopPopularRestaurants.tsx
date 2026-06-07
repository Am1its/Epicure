import { RestaurantCard } from '@org/ui-components';
import type { Restaurant } from '@org/shared-types';
import { TEXT } from '../lib/text';

interface Props {
  restaurants: Restaurant[];
}

export function DesktopPopularRestaurants({ restaurants }: Props) {
  return (
    <section className="epicure-desktop-popular">
      <h2 className="epicure-desktop-popular__title">{TEXT.home.popularTitle}</h2>
      <div className="epicure-desktop-popular__grid">
        {restaurants.map(restaurant => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
      <a href="/restaurants" className="epicure-desktop-popular__link">
        {TEXT.home.allRestaurantsLink} &raquo;&raquo;
      </a>
    </section>
  );
}
