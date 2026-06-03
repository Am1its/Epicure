'use client';

import { useState, useMemo } from 'react';
import type { Restaurant } from '@org/shared-types';
import { RestaurantCard } from '@org/ui-components';
import { Filter } from './Filter';
import { PriceFilter } from './PriceFilter';
import { DistanceFilter } from './DistanceFilter';
import { RatingFilter } from './RatingFilter';

type Tab = 'all' | 'new' | 'popular' | 'open' | 'map';

interface RestaurantsGridProps {
  restaurants: Restaurant[];
}

export function RestaurantsGrid({ restaurants }: RestaurantsGridProps) {
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const [selectedRatings, setSelectedRatings] = useState<Set<number>>(new Set());
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);
  const [distanceKm, setDistanceKm] = useState<number>(4);
  const [ratingOpen, setRatingOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [distanceOpen, setDistanceOpen] = useState(false);

  const globalPrices = useMemo(() => {
    const all = restaurants.flatMap(r =>
      (r.dishes ?? []).map(d => d.price).filter((p): p is number => p != null && isFinite(p))
    );
    return {
      min: all.length ? Math.min(...all) : 0,
      max: all.length ? Math.max(...all) : 500,
    };
  }, [restaurants]);

  const sliderValue: [number, number] = priceRange ?? [globalPrices.min, globalPrices.max];

  const toggleRating = (r: number) => {
    setSelectedRatings(prev => {
      const next = new Set(prev);
      if (next.has(r)) next.delete(r); else next.add(r);
      return next;
    });
  };

  const filtered = useMemo(
    () =>
      restaurants
        .filter(r => selectedRatings.size === 0 || selectedRatings.has(r.rating))
        .filter(r => {
          if (!priceRange) return true;
          const [lo, hi] = priceRange;
          if (lo === globalPrices.min && hi === globalPrices.max) return true;
          const prices = (r.dishes ?? []).map(d => d.price).filter((p): p is number => p != null && isFinite(p));
          if (!prices.length) return true;
          const avg = prices.reduce((a, b) => a + b, 0) / prices.length;
          return avg >= lo && avg <= hi;
        })
        .sort((a, b) => {
          if (activeTab === 'popular') return b.rating - a.rating;
          if (activeTab === 'new') {
            return new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime();
          }
          return 0;
        }),
    [restaurants, selectedRatings, priceRange, globalPrices, activeTab],
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
        <Filter
          label="Price Range"
          isOpen={priceOpen}
          onToggle={() => { setPriceOpen(o => !o); setDistanceOpen(false); setRatingOpen(false); }}
          onClose={() => setPriceOpen(false)}
          dropdownClassName="epicure-filter-dropdown--slider"
        >
          <PriceFilter globalPrices={globalPrices} value={sliderValue} onChange={setPriceRange} />
        </Filter>

        <Filter
          label="Distance"
          isOpen={distanceOpen}
          onToggle={() => { setDistanceOpen(o => !o); setPriceOpen(false); setRatingOpen(false); }}
          onClose={() => setDistanceOpen(false)}
          dropdownClassName="epicure-filter-dropdown--slider"
        >
          <DistanceFilter value={distanceKm} onChange={setDistanceKm} />
        </Filter>

        <Filter
          label="Rating"
          isOpen={ratingOpen}
          onToggle={() => { setRatingOpen(o => !o); setPriceOpen(false); setDistanceOpen(false); }}
          onClose={() => setRatingOpen(false)}
        >
          <RatingFilter selectedRatings={selectedRatings} onToggle={toggleRating} />
        </Filter>
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
