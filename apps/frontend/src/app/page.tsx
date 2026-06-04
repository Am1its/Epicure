import Header from '../components/Header';
import Footer from '../components/Footer';
import { MobileSection } from '../components/MobileSection';
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
  const weeklyChef = chefs.find(c => c.chefOfTheWeek) ?? chefs[0];
  const chefRestaurants = weeklyChef
    ? restaurants.filter(r => r.chef?.id === weeklyChef.id)
    : [];

  const signatureDishes = restaurants.flatMap(r =>
    (r.dishes ?? []).filter(d => d.isSignatureDish)
  );

  return (
    <div>
      <Header />
      <main>
        {/* Desktop hero — hidden on mobile via CSS */}
        <section className="epicure-hero epicure-hero--desktop">
          <h1 className="epicure-hero__title">{TEXT.home.heroTitleLine1}<br />{TEXT.home.heroTitleLine2}</h1>
          <p className="epicure-hero__subtitle">{TEXT.home.heroSubtitle}</p>
          <button className="epicure-hero__cta">{TEXT.home.heroCta}</button>
        </section>

        {/* Mobile hero — hidden on desktop via CSS */}
        <section className="epicure-hero--mobile">
          <div className="epicure-mobile-hero">
            <div className="epicure-mobile-hero__panel">
              <h2 className="epicure-mobile-hero__headline">
                {TEXT.home.mobileHeadline}
              </h2>
              <div className="epicure-mobile-hero__search">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icons/search.svg" alt="" aria-hidden="true" width={16} height={16} />
                <span className="epicure-mobile-hero__search-placeholder">
                  {TEXT.home.mobileSearchPlaceholder}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Popular restaurants — mobile only */}
        <MobileSection
          title={TEXT.home.popularTitle}
          linkLabel={TEXT.home.allRestaurantsLink}
          linkHref="/restaurants"
        >
          {popularRestaurants.map(restaurant => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </MobileSection>

        {/* Signature dishes — mobile only */}
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

        {/* Icons legend — mobile only */}
        <div className="epicure-icons-legend">
          <h2 className="epicure-icons-legend__title">{TEXT.home.iconsTitle}</h2>
          <ul className="epicure-icons-legend__list">
            {TEXT.icons.map(icon => (
              <li key={icon.label} className="epicure-icons-legend__item">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={icon.src} alt="" aria-hidden="true" className="epicure-icons-legend__icon" />
                <span className="epicure-icons-legend__label">{icon.label}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* Chef of the week — mobile only */}
        {weeklyChef && (
          <section className="epicure-chef-week">
            <h2 className="epicure-chef-week__title">{TEXT.chefOfTheWeek.sectionTitle}</h2>
            <div className="epicure-chef-week__photo-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
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
            <p className="epicure-chef-week__restaurants-label">{TEXT.chefOfTheWeek.restaurantsLabel}</p>
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

        {/* App download + about — mobile only */}
        <div className="epicure-app-section">
          <div className="epicure-app-section__brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icons/about-logo.svg" alt="Epicure" width={102} height={102} />
          </div>
          <a href="#" className="epicure-app-section__store-btn">
            <img src="/icons/google.svg" alt="" aria-hidden="true" width={19} height={25} />
            <span>
              <small>{TEXT.appSection.googlePlay.line1}</small>
              {TEXT.appSection.googlePlay.line2}
            </span>
          </a>
          <a href="#" className="epicure-app-section__store-btn">
            <img src="/icons/apple.svg" alt="" aria-hidden="true" width={23} height={30} />
            <span>
              <small>{TEXT.appSection.appStore.line1}</small>
              {TEXT.appSection.appStore.line2}
            </span>
          </a>
          <div className="epicure-app-section__about">
            <h2 className="epicure-app-section__about-title">{TEXT.appSection.aboutTitle}</h2>
            <p className="epicure-app-section__about-text">{TEXT.appSection.aboutText}</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
