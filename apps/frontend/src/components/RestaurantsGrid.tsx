'use client';

import { useState, useMemo } from 'react';
import type { Restaurant } from '@org/shared-types';
import { RestaurantCard, StarRating } from '@org/ui-components';

type Tab = 'all' | 'new' | 'popular' | 'open' | 'map';

type PriceTier = '₪' | '₪₪' | '₪₪₪';

const PRICE_TIERS: PriceTier[] = ['₪', '₪₪', '₪₪₪'];

const DISTANCE_OPTIONS = ['Under 1 km', '1–3 km', '3–5 km', 'Over 5 km'] as const;

function getPriceTier(restaurant: Restaurant): PriceTier {
  const prices = (restaurant.dishes ?? [])
    .map(d => d.price)
    .filter((p): p is number => p != null && isFinite(p));
  if (!prices.length) return '₪₪';
  const avg = prices.reduce((a, b) => a + b, 0) / prices.length;
  if (avg < 80) return '₪';
  if (avg <= 150) return '₪₪';
  return '₪₪₪';
}

interface RestaurantsGridProps {
  restaurants: Restaurant[];
}

export function RestaurantsGrid({ restaurants }: RestaurantsGridProps) {
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const [selectedRatings, setSelectedRatings] = useState<Set<number>>(new Set());
  const [selectedPriceTiers, setSelectedPriceTiers] = useState<Set<PriceTier>>(new Set());
  const [ratingOpen, setRatingOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [distanceOpen, setDistanceOpen] = useState(false);

  const toggleRating = (r: number) => {
    setSelectedRatings(prev => {
      const next = new Set(prev);
      if (next.has(r)) next.delete(r);
      else next.add(r);
      return next;
    });
  };

  const togglePriceTier = (tier: PriceTier) => {
    setSelectedPriceTiers(prev => {
      const next = new Set(prev);
      if (next.has(tier)) next.delete(tier);
      else next.add(tier);
      return next;
    });
  };

  const filtered = useMemo(
    () =>
      restaurants
        .filter(r => selectedRatings.size === 0 || selectedRatings.has(r.rating))
        .filter(r => selectedPriceTiers.size === 0 || selectedPriceTiers.has(getPriceTier(r)))
        .sort((a, b) => {
          if (activeTab === 'popular') return b.rating - a.rating;
          if (activeTab === 'new') {
            return new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime();
          }
          return 0;
        }),
    [restaurants, selectedRatings, selectedPriceTiers, activeTab],
  );

  const tabs: { id: Tab; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'new', label: 'New' },
    { id: 'popular', label: 'Most Popular' },
    { id: 'open', label: 'Open Now' },
    { id: 'map', label: 'Map View' },
  ];

  return (
    <>
      <div className="epicure-page-tabs-wrap">
        <div className="epicure-page-tabs" role="tablist">
          {tabs.map(tab => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`epicure-page-tab${activeTab === tab.id ? ' epicure-page-tab--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="epicure-filter-row">
        {/* Price Range */}
        <div className="epicure-filter-wrap">
          <button
            className={`epicure-filter-btn${priceOpen ? ' epicure-filter-btn--active' : ''}`}
            onClick={() => { setPriceOpen(o => !o); setDistanceOpen(false); setRatingOpen(false); }}
          >
            Price Range ▾
          </button>
          {priceOpen && (
            <div className="epicure-filter-dropdown">
              {PRICE_TIERS.map(tier => (
                <label key={tier}>
                  <input
                    type="checkbox"
                    checked={selectedPriceTiers.has(tier)}
                    onChange={() => togglePriceTier(tier)}
                  />
                  {tier}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Distance */}
        <div className="epicure-filter-wrap">
          <button
            className={`epicure-filter-btn${distanceOpen ? ' epicure-filter-btn--active' : ''}`}
            onClick={() => { setDistanceOpen(o => !o); setPriceOpen(false); setRatingOpen(false); }}
          >
            Distance ▾
          </button>
          {distanceOpen && (
            <div className="epicure-filter-dropdown">
              {DISTANCE_OPTIONS.map(opt => (
                <label key={opt} className="epicure-filter-label--muted">
                  <input type="checkbox" disabled />
                  {opt}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Rating */}
        <div className="epicure-filter-wrap">
          <button
            className={`epicure-filter-btn${ratingOpen ? ' epicure-filter-btn--active' : ''}`}
            onClick={() => { setRatingOpen(o => !o); setPriceOpen(false); setDistanceOpen(false); }}
          >
            Rating ▾
          </button>
          {ratingOpen && (
            <div className="epicure-filter-dropdown">
              {[1, 2, 3, 4, 5].map(r => (
                <label key={r}>
                  <input
                    type="checkbox"
                    checked={selectedRatings.has(r)}
                    onChange={() => toggleRating(r)}
                  />
                  <StarRating rating={r} />
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {activeTab === 'map' ? (
        <div className="epicure-map-placeholder">Map view coming soon</div>
      ) : (
        <div className="epicure-restaurant-grid">
          {filtered.map(restaurant => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      )}
    </>
  );
}
