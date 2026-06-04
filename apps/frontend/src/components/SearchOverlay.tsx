'use client';

import { TEXT } from '../lib/text';

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
          <div className="epicure-search-overlay__input-wrap">
            { }
            <img src="/icons/search.svg" alt="" aria-hidden="true" width={18} height={18} />
            <input
              type="text"
              placeholder={TEXT.searchOverlay.placeholder}
              className="epicure-search-overlay__input"
            />
          </div>
        </div>
      </div>
    </>
  );
}
