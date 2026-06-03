'use client';

interface SearchOverlayProps {
  onClose: () => void;
}

export function SearchOverlay({ onClose }: SearchOverlayProps) {
  return (
    <>
      <div
        className="epicure-search-overlay__backdrop"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="epicure-search-overlay" role="dialog" aria-label="Search">
        <div className="epicure-search-overlay__header">
          <button
            className="epicure-search-overlay__close"
            onClick={onClose}
            aria-label="Close search"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="19.3" y1="4.7" x2="4.7" y2="19.3" />
              <line x1="4.7" y1="4.7" x2="19.3" y2="19.3" />
            </svg>
          </button>
          <span className="epicure-search-overlay__title">Search</span>
          <span className="epicure-search-overlay__spacer" aria-hidden="true" />
        </div>
        <div className="epicure-search-overlay__body">
          <div className="epicure-search-overlay__input-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icons/search.svg" alt="" aria-hidden="true" width={18} height={18} />
            <input
              type="text"
              placeholder="Search for restaurant, cuisine, chef"
              className="epicure-search-overlay__input"
            />
          </div>
        </div>
      </div>
    </>
  );
}
