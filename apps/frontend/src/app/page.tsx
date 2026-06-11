import Header from '../components/Header';
import Footer from '../components/Footer';
import { MobileSection } from '../components/MobileSection';
import { MobileChefSection } from '../components/MobileChefSection';
import { MobileAppSection } from '../components/MobileAppSection';
import { IconsLegend } from '../components/IconsLegend';
import { Hero } from '../components/Hero';
import { DesktopPopularRestaurants } from '../components/DesktopPopularRestaurants';
import { DesktopSignatureDishes } from '../components/DesktopSignatureDishes';
import { DesktopChefSection } from '../components/DesktopChefSection';
import { DesktopAboutSection } from '../components/DesktopAboutSection';
import { fetchApi } from '../lib/api';
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
  const chefRestaurants = weeklyChef
    ? restaurants.filter(r => r.chef?.id === weeklyChef.id)
    : [];

  const signatureDishes = restaurants.flatMap(r =>
    (r.dishes ?? [])
      .filter(d => d.isSignatureDish)
      .map(d => ({ ...d, restaurantName: r.name }))
  );

  return (
    <div>
      <Header />
      <main>
        <Hero />

        <MobileSection
          title={TEXT.home.popularTitle}
          linkLabel={TEXT.home.allRestaurantsLink}
          linkHref="/restaurants"
        >
          {popularRestaurants.map(restaurant => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
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
              <DishCard key={dish.id} dish={dish} />
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
      <Footer />
    </div>
  );
}
