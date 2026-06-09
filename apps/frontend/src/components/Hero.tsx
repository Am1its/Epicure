'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { TEXT } from '../lib/text';
import { useClickOutside } from '../hooks/useClickOutside';
import type { SearchResults } from '@org/shared-types';
import { fetchSearch } from '../lib/api';

export function Hero() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResults>({ restaurants: [], chefs: [] });
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults({ restaurants: [], chefs: [] });
      return;
    }
    let cancelled = false;
    const timer = setTimeout(() => {
      fetchSearch(query.trim())
        .then(data => { if (!cancelled) setResults(data); })
        .catch(() => { if (!cancelled) setResults({ restaurants: [], chefs: [] }); });
    }, 300);
    return () => { cancelled = true; clearTimeout(timer); };
  }, [query]);

  const hasResults = results.restaurants.length > 0 || results.chefs.length > 0;

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
                    <Link key={r.id} href={`/restaurants/${r.id}`} className="epicure-hero__results-item">
                      {r.name}
                    </Link>
                  ))}
                </div>
              )}
              {results.chefs.length > 0 && (
                <div className="epicure-hero__results-group">
                  <span className="epicure-hero__results-label">{TEXT.home.searchResultsChefs}</span>
                  {results.chefs.map(c => (
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
