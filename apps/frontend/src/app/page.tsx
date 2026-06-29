import Link from 'next/link';
import { MobileSection } from '../components/MobileSection';
import { MobileChefSection } from '../components/MobileChefSection';
import { MobileAppSection } from '../components/MobileAppSection';
import { IconsLegend } from '../components/IconsLegend';
import { Hero } from '../components/Hero';
import { DesktopPopularRestaurants } from '../components/DesktopPopularRestaurants';
import { DesktopSignatureDishes } from '../components/DesktopSignatureDishes';
import { DesktopChefSection } from '../components/DesktopChefSection';
import { DesktopAboutSection } from '../components/DesktopAboutSection';
import { fetchApi, strapiImageUrl } from '../lib/api';
import type { Restaurant, Chef } from '@org/shared-types';
import { RestaurantCard, DishCard } from '@org/ui-components';
import { TEXT } from '../lib/text';

export default async function HomePage() {
  const [restaurants, chefs] = await Promise.all([
    fetchApi<Restaurant[]>('/api/restaurants'),
    fetchApi<Chef[]>('/api/chefs'),
  ]);

  const popularRestaurants = restaurants.filter(r => r.isPopular);
  const weeklyChef = chefs.find(c => c.chefOfTheWeek);
  const chefRestaurantIds = new Set(weeklyChef?.restaurants?.map(r => r.id) ?? []);
  const chefRestaurants = weeklyChef?.restaurants != null
    ? restaurants.filter(r => chefRestaurantIds.has(r.id))
    : weeklyChef
      ? restaurants.filter(r => r.chef?.id === weeklyChef.id)
      : [];

  const signatureDishes = [...new Map(
    restaurants.flatMap(r =>
      (r.dishes ?? [])
        .filter(d => d.isSignatureDish)
        .map(d => [d.id, { ...d, restaurantName: r.name, restaurantId: r.id }])
    )
  ).values()];

  return (
    <main>
      <Hero />

      <MobileSection
        title={TEXT.home.popularTitle}
        linkLabel={TEXT.home.allRestaurantsLink}
        linkHref="/restaurants"
      >
        {popularRestaurants.map(restaurant => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} imageUrl={strapiImageUrl(restaurant.image?.url)} />
        ))}
      </MobileSection>

      <DesktopPopularRestaurants restaurants={popularRestaurants} />

      {signatureDishes.length > 0 && (
        <MobileSection
          title={TEXT.home.signatureDishTitle}
          linkLabel={TEXT.home.allRestaurantsLink}
          linkHref="/restaurants"
        >
          {signatureDishes.map(dish => (
            <Link
              key={dish.id}
              href={`/restaurants/${dish.restaurantId}?highlight=${dish.id}`}
              className="epicure-dish-link"
              aria-label={TEXT.home.dishLinkAriaLabel(dish.name)}
            >
              <DishCard dish={dish} imageUrl={strapiImageUrl(dish.image?.url)} />
            </Link>
          ))}
        </MobileSection>
      )}

      <DesktopSignatureDishes dishes={signatureDishes} />

      <IconsLegend />

      {weeklyChef && <MobileChefSection chef={weeklyChef} restaurants={chefRestaurants} />}
      {weeklyChef && <DesktopChefSection chef={weeklyChef} restaurants={chefRestaurants} />}

      <MobileAppSection />
      <DesktopAboutSection />
    </main>
  );
}
