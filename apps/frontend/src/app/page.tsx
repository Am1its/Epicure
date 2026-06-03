import Header from '../components/Header';
import Footer from '../components/Footer';
import { MobileSection } from '../components/MobileSection';
import { fetchApi } from '../lib/api';
import type { Restaurant } from '@org/shared-types';
import { RestaurantCard, DishCard } from '@org/ui-components';
import { TEXT } from '../lib/text';

export default async function HomePage() {
  const restaurants = await fetchApi<Restaurant[]>('/api/restaurants');

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
          {restaurants.map(restaurant => (
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
        {/* Chef of the week — mobile only, no data yet */}
        <section className="epicure-chef-week">
          <h2 className="epicure-chef-week__title">{TEXT.chefOfTheWeek.sectionTitle}</h2>
          <div className="epicure-chef-week__photo-wrap">
            <div className="epicure-chef-week__photo-placeholder" />
            <div className="epicure-chef-week__name-bar">
              <span className="epicure-chef-week__name">{TEXT.chefOfTheWeek.namePlaceholder}</span>
            </div>
          </div>
          <p className="epicure-chef-week__bio">{TEXT.chefOfTheWeek.bioPlaceholder}</p>
          <p className="epicure-chef-week__restaurants-label">{TEXT.chefOfTheWeek.restaurantsLabel}</p>
          <div className="epicure-chef-week__cards-row">
            {/* restaurant cards go here once data is wired */}
          </div>
          <a href="/restaurants" className="epicure-chef-week__all-link">
            {TEXT.chefOfTheWeek.allRestaurantsLink} <span aria-hidden="true">&raquo;&raquo;</span>
          </a>
        </section>

        {/* App download + about — mobile only */}
        <div className="epicure-app-section">
          <div className="epicure-app-section__brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icons/logo.svg" alt="" aria-hidden="true" width={60} height={60} />
            <span>{TEXT.appSection.brandName}</span>
          </div>
          <a href="#" className="epicure-app-section__store-btn">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <polygon points="4,2 14,8 4,14" />
            </svg>
            <span>
              <small>{TEXT.appSection.googlePlay.line1}</small>
              {TEXT.appSection.googlePlay.line2}
            </span>
          </a>
          <a href="#" className="epicure-app-section__store-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
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
