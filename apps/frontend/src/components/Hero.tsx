'use client';

import { useState } from 'react';
import { TEXT } from '../lib/text';

export function Hero() {
  const [query, setQuery] = useState('');

  return (
    <section className="epicure-hero">
      <div className="epicure-hero__panel">
        <h1 className="epicure-hero__headline">{TEXT.home.mobileHeadline}</h1>
        <div className="epicure-hero__search">
          <img src="/icons/search.svg" alt="" aria-hidden="true" className="epicure-hero__search-icon" width={18} height={18} />
          <input
            type="text"
            className="epicure-hero__search-input"
            placeholder={TEXT.home.mobileSearchPlaceholder}
            value={query}
            onChange={e => setQuery(e.target.value)}
            aria-label={TEXT.nav.searchAriaLabel}
          />
        </div>
      </div>
    </section>
  );
}
