'use client';

import { useState } from 'react';
import { TEXT } from '../lib/text';

export function DesktopHero() {
  const [query, setQuery] = useState('');

  return (
    <div className="epicure-desktop-hero">
      <div className="epicure-desktop-hero__panel">
        <h1 className="epicure-desktop-hero__headline">{TEXT.home.mobileHeadline}</h1>
        <div className="epicure-desktop-hero__search">
          <img src="/icons/search.svg" alt="" aria-hidden="true" className="epicure-desktop-hero__search-icon" width={18} height={18} />
          <input
            type="text"
            className="epicure-desktop-hero__search-input"
            placeholder={TEXT.home.mobileSearchPlaceholder}
            value={query}
            onChange={e => setQuery(e.target.value)}
            aria-label={TEXT.nav.searchAriaLabel}
          />
        </div>
      </div>
    </div>
  );
}
