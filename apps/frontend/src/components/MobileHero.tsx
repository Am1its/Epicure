'use client';

import { TEXT } from '../lib/text';

export function MobileHero() {
  return (
    <div className="epicure-mobile-hero">
      <div className="epicure-mobile-hero__panel">
        <h2 className="epicure-mobile-hero__headline">
          {TEXT.home.mobileHeadline}
        </h2>
        <div className="epicure-mobile-hero__search">
          { }
          <img src="/icons/search.svg" alt="" aria-hidden="true" width={16} height={16} />
          <input
            className="epicure-mobile-hero__search-input"
            type="text"
            placeholder={TEXT.home.mobileSearchPlaceholder}
          />
        </div>
      </div>
    </div>
  );
}
