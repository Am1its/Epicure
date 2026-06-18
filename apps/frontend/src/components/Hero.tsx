'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { TEXT } from '../lib/text';
import { useClickOutside } from '../hooks/useClickOutside';
import { useSearch } from '../hooks/useSearch';

export function Hero() {
  const [query, setQuery] = useState('');
  const results = useSearch(query);
  const searchRef = useRef<HTMLDivElement>(null);

  const hasResults = results.restaurants.length > 0 || results.chefs.length > 0 || results.cuisines.length > 0;

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
              {results.restaurants.length > 0 && (
                <div className="epicure-hero__results-group">
                  <span className="epicure-hero__results-label">{TEXT.home.searchResultsRestaurants}</span>
                  {results.restaurants.map(r => (
                    <Link key={r.id} href={`/restaurants/${r.id}`} className="epicure-hero__results-item" onClick={() => setQuery('')}>
                      {r.name}
                    </Link>
                  ))}
                </div>
              )}
              {results.chefs.length > 0 && (
                <div className="epicure-hero__results-group">
                  <span className="epicure-hero__results-label">{TEXT.home.searchResultsChefs}</span>
                  {results.chefs.map(c => (
                    <Link key={c.id} href={`/chefs?highlight=${c.id}`} className="epicure-hero__results-item" onClick={() => setQuery('')}>
                      {c.name}
                    </Link>
                  ))}
                </div>
              )}
              {results.cuisines.length > 0 && (
                <div className="epicure-hero__results-group">
                  <span className="epicure-hero__results-label">{TEXT.home.searchResultsCuisines}</span>
                  {results.cuisines.map(c => (
                    <Link key={c.label} href="/restaurants" className="epicure-hero__results-item" onClick={() => { sessionStorage.setItem('epicure_pending_cuisine_filter', JSON.stringify([c.label])); window.dispatchEvent(new CustomEvent('epicure:cuisine-filter', { detail: [c.label] })); setQuery(''); }}>
                      {c.label}
                    </Link>
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
