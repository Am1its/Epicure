import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchApi } from '../lib/api';
import type { Chef, Restaurant } from '@org/shared-types';
import { RestaurantCard } from '@org/ui-components';

export default async function HomePage() {
  const [chefs, restaurants] = await Promise.all([
    fetchApi<Chef[]>('/api/chefs'),
    fetchApi<Restaurant[]>('/api/restaurants'),
  ]);

  return (
    <div>
      <Header />
      <main>
        {/* Desktop hero — hidden on mobile via CSS */}
        <section className="epicure-hero epicure-hero--desktop">
          <h1 className="epicure-hero__title">Good food,<br />good mood</h1>
          <p className="epicure-hero__subtitle">Discover the finest restaurants near you</p>
          <button className="epicure-hero__cta">Explore Restaurants</button>
        </section>

        {/* Mobile hero — hidden on desktop via CSS */}
        <section className="epicure-hero--mobile">
          <div className="epicure-mobile-hero">
            <div className="epicure-mobile-hero__overlay" />
            <div className="epicure-mobile-hero__chef-circles">
              {chefs.map(chef => (
                <div key={chef.id} className="epicure-mobile-hero__chef-circle">
                  {chef.name.charAt(0).toUpperCase()}
                </div>
              ))}
            </div>
            <div className="epicure-mobile-hero__content">
              <h2 className="epicure-mobile-hero__headline">
                Epicure works with the top chef restaurants in Tel Aviv
              </h2>
              <div className="epicure-mobile-hero__search">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icons/search.svg" alt="" aria-hidden="true" width={18} height={18} />
                <span className="epicure-mobile-hero__search-placeholder">
                  Search for restaurant cuisine, chef
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Popular restaurants — mobile only, hidden on desktop via CSS */}
        <section className="epicure-popular">
          <h2 className="epicure-popular__title">POPULAR RESTAURANT IN EPICURE:</h2>
          <div className="epicure-popular__cards">
            {restaurants.map(restaurant => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
