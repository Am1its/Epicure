'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { TEXT } from '../lib/text';
import { useClickOutside } from '../hooks/useClickOutside';
import type { Restaurant, Chef } from '@org/shared-types';

interface HeroProps {
  restaurants: Restaurant[];
  chefs: Chef[];
}

export function Hero({ restaurants, chefs }: HeroProps) {
  const [query, setQuery] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);

  const q = query.toLowerCase();
  const matchedRestaurants = query
    ? restaurants.filter(r => r.name.toLowerCase().includes(q)).slice(0, 5)
    : [];
  const matchedChefs = query
    ? chefs.filter(c => c.name.toLowerCase().includes(q)).slice(0, 3)
    : [];
  const hasResults = matchedRestaurants.length > 0 || matchedChefs.length > 0;

  useClickOutside(searchRef, () => setQuery(''), query.length > 0);

  return (
    <section className="epicure-hero">
      <div className="epicure-hero__panel">
        <h1 className="epicure-hero__headline">{TEXT.home.mobileHeadline}</h1>
        <div className="epicure-hero__search-wrap" ref={searchRef}>
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
            {query && (
              <button
                className="epicure-hero__search-clear"
                onClick={() => setQuery('')}
                aria-label={TEXT.home.searchClearAriaLabel}
              >
                <img src="/icons/x.svg" alt="" aria-hidden="true" width={12} height={12} />
              </button>
            )}
          </div>

          {query && hasResults && (
            <div className="epicure-hero__results">
              {matchedRestaurants.length > 0 && (
                <div className="epicure-hero__results-group">
                  <span className="epicure-hero__results-label">{TEXT.home.searchResultsRestaurants}</span>
                  {matchedRestaurants.map(r => (
                    <Link key={r.id} href={`/restaurants/${r.id}`} className="epicure-hero__results-item">
                      {r.name}
                    </Link>
                  ))}
                </div>
              )}
              {matchedChefs.length > 0 && (
                <div className="epicure-hero__results-group">
                  <span className="epicure-hero__results-label">{TEXT.home.searchResultsChefs}</span>
                  {matchedChefs.map(c => (
                    <span key={c.id} className="epicure-hero__results-item">{c.name}</span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
