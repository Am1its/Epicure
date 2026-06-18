'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { TEXT } from '../lib/text';
import { useSearch } from '../hooks/useSearch';
import { useClickOutside } from '../hooks/useClickOutside';

interface SearchOverlayProps {
  onClose: () => void;
}

export function SearchOverlay({ onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const results = useSearch(query);
  const hasResults = results.restaurants.length > 0 || results.chefs.length > 0;
  const inputWrapRef = useRef<HTMLDivElement>(null);

  useClickOutside(inputWrapRef, () => setQuery(''), query.length > 0);

  return (
    <>
      <div
        className="epicure-search-overlay__backdrop"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="epicure-search-overlay" role="dialog" aria-label={TEXT.searchOverlay.dialogAriaLabel}>
        <div className="epicure-search-overlay__header">
          <button
            className="epicure-search-overlay__close"
            onClick={onClose}
            aria-label={TEXT.searchOverlay.closeAriaLabel}
          >
            <img src="/icons/x.svg" alt="" aria-hidden="true" width={24} height={24} />
          </button>
          <span className="epicure-search-overlay__title">{TEXT.searchOverlay.title}</span>
          <span className="epicure-search-overlay__spacer" aria-hidden="true" />
        </div>
        <div className="epicure-search-overlay__body">
          <div className="epicure-search-overlay__input-wrap" ref={inputWrapRef}>
            <img src="/icons/search.svg" alt="" aria-hidden="true" width={18} height={18} />
            <input
              type="text"
              placeholder={TEXT.searchOverlay.placeholder}
              className="epicure-search-overlay__input"
              value={query}
              onChange={e => setQuery(e.target.value)}
              autoFocus
            />
            {query && (
              <button
                className="epicure-search-overlay__clear"
                onClick={() => setQuery('')}
                aria-label={TEXT.home.searchClearAriaLabel}
              >
                <img src="/icons/x.svg" alt="" aria-hidden="true" width={12} height={12} />
              </button>
            )}
          </div>

          {query && hasResults && (
            <div className="epicure-search-overlay__results">
              {results.restaurants.length > 0 && (
                <div className="epicure-search-overlay__results-group">
                  <span className="epicure-search-overlay__results-label">{TEXT.home.searchResultsRestaurants}</span>
                  {results.restaurants.map(r => (
                    <Link
                      key={r.id}
                      href={`/restaurants/${r.id}`}
                      className="epicure-search-overlay__results-item"
                      onClick={onClose}
                    >
                      {r.name}
                    </Link>
                  ))}
                </div>
              )}
              {results.chefs.length > 0 && (
                <div className="epicure-search-overlay__results-group">
                  <span className="epicure-search-overlay__results-label">{TEXT.home.searchResultsChefs}</span>
                  {results.chefs.map(c => (
                    <span key={c.id} className="epicure-search-overlay__results-item">{c.name}</span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
