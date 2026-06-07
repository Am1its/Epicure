import Header from '../components/Header';
import Footer from '../components/Footer';
import { MobileSection } from '../components/MobileSection';
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

        {/* Popular Restaurants — mobile carousel */}
        <MobileSection
          title={TEXT.home.popularTitle}
          linkLabel={TEXT.home.allRestaurantsLink}
          linkHref="/restaurants"
        >
          {popularRestaurants.map(restaurant => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </MobileSection>

        {/* Popular Restaurants — desktop grid */}
        <DesktopPopularRestaurants restaurants={popularRestaurants} />

        {/* Signature Dishes — mobile carousel */}
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

        {/* Signature Dishes — desktop grid */}
        <DesktopSignatureDishes dishes={signatureDishes} />

        {/* Icons legend — shared, layout differs mobile vs desktop via CSS */}
        <div className="epicure-icons-legend">
          <h2 className="epicure-icons-legend__title">{TEXT.home.iconsTitle}</h2>
          <ul className="epicure-icons-legend__list">
            {TEXT.icons.map(icon => (
              <li key={icon.label} className="epicure-icons-legend__item">
                <img src={icon.src} alt="" aria-hidden="true" className="epicure-icons-legend__icon" />
                <span className="epicure-icons-legend__label">{icon.label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Chef of the Week — mobile */}
        {weeklyChef && (
          <section className="epicure-chef-week">
            <h2 className="epicure-chef-week__title">{TEXT.chefOfTheWeek.sectionTitle}</h2>
            <div className="epicure-chef-week__photo-wrap">
              <img
                src={strapiImageUrl(weeklyChef.image?.url)}
                alt={weeklyChef.name}
                className="epicure-chef-week__photo"
              />
              <div className="epicure-chef-week__name-bar">
                <span className="epicure-chef-week__name">{weeklyChef.name}</span>
              </div>
            </div>
            <p className="epicure-chef-week__bio">{weeklyChef.bio ?? TEXT.chefOfTheWeek.bioPlaceholder}</p>
            <p className="epicure-chef-week__restaurants-label">{weeklyChef.name.split(' ')[0].toUpperCase()}&apos;S RESTAURANTS</p>
            <div className="epicure-chef-week__cards-row">
              {chefRestaurants.map(restaurant => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
            <a href="/restaurants" className="epicure-chef-week__all-link">
              {TEXT.chefOfTheWeek.allRestaurantsLink} <span aria-hidden="true">&raquo;&raquo;</span>
            </a>
          </section>
        )}

        {/* Chef of the Week — desktop */}
        {weeklyChef && <DesktopChefSection chef={weeklyChef} restaurants={chefRestaurants} />}

        {/* About / App — mobile */}
        <div className="epicure-app-section">
          <div className="epicure-app-section__brand">
            <img src="/icons/about-logo.svg" alt="Epicure" width={102} height={102} />
          </div>
          <a href="#" className="epicure-app-section__store-btn">
            <img src="/icons/google.svg" alt="" aria-hidden="true" width={19} height={25} />
            <span className="epicure-app-section__store-text">
              <small className="epicure-app-section__store-subtext">{TEXT.appSection.googlePlay.line1}</small>
              {TEXT.appSection.googlePlay.line2}
            </span>
          </a>
          <a href="#" className="epicure-app-section__store-btn">
            <img src="/icons/apple.svg" alt="" aria-hidden="true" width={23} height={30} />
            <span className="epicure-app-section__store-text">
              <small className="epicure-app-section__store-subtext">{TEXT.appSection.appStore.line1}</small>
              {TEXT.appSection.appStore.line2}
            </span>
          </a>
          <div className="epicure-app-section__about">
            <h2 className="epicure-app-section__about-title">{TEXT.appSection.aboutTitle}</h2>
            <p className="epicure-app-section__about-text">{TEXT.appSection.aboutText}</p>
          </div>
        </div>

        {/* About — desktop */}
        <DesktopAboutSection />
      </main>
      <Footer />
    </div>
  );
}
