'use client';

import { useState, useEffect, useMemo, type ReactNode } from 'react';
import type { Restaurant } from '@org/shared-types';
import { RestaurantCard } from '@org/ui-components';
import { Filter } from './Filter';
import { PriceFilter } from './PriceFilter';
import { DistanceFilter } from './DistanceFilter';
import { RatingFilter } from './RatingFilter';
import { TEXT } from '../lib/text';
import { fetchRestaurantsWithDistances } from '../lib/api';
import { useUserLocation } from '../hooks/useUserLocation';

type Tab = (typeof TEXT.restaurantsGrid.tabs)[number]['id'];

interface FilterConfig {
  id: string;
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  dropdownClassName?: string;
  content: ReactNode;
}

export function RestaurantsGrid() {
  const { coords, loading: locationLoading } = useUserLocation();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<Tab>('all');
  const [selectedRatings, setSelectedRatings] = useState<Set<number>>(new Set());
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);
  const [distanceKm, setDistanceKm] = useState<number>(20);
  const [ratingOpen, setRatingOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [distanceOpen, setDistanceOpen] = useState(false);

  useEffect(() => {
    if (!coords) return;
    fetchRestaurantsWithDistances(coords.lat, coords.lng)
      .then(setRestaurants)
      .catch(() => setRestaurants([]))
      .finally(() => setFetchLoading(false));
  }, [coords]);

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
        .filter(r => r.distance == null || r.distance <= distanceKm)
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
    [restaurants, selectedRatings, priceRange, globalPrices, activeTab, distanceKm],
  );

  const filterConfigs: FilterConfig[] = [
    {
      id: 'price',
      label: TEXT.restaurantsGrid.priceFilter,
      isOpen: priceOpen,
      onToggle: () => { setPriceOpen(o => !o); setDistanceOpen(false); setRatingOpen(false); },
      onClose: () => setPriceOpen(false),
      dropdownClassName: 'epicure-filter-dropdown--slider',
      content: <PriceFilter globalPrices={globalPrices} value={sliderValue} onChange={setPriceRange} />,
    },
    {
      id: 'distance',
      label: TEXT.restaurantsGrid.distanceFilter,
      isOpen: distanceOpen,
      onToggle: () => { setDistanceOpen(o => !o); setPriceOpen(false); setRatingOpen(false); },
      onClose: () => setDistanceOpen(false),
      dropdownClassName: 'epicure-filter-dropdown--slider',
      content: <DistanceFilter value={distanceKm} onChange={setDistanceKm} />,
    },
    {
      id: 'rating',
      label: TEXT.restaurantsGrid.ratingFilter,
      isOpen: ratingOpen,
      onToggle: () => { setRatingOpen(o => !o); setPriceOpen(false); setDistanceOpen(false); },
      onClose: () => setRatingOpen(false),
      content: <RatingFilter selectedRatings={selectedRatings} onToggle={toggleRating} />,
    },
  ];

  if (locationLoading || fetchLoading) {
    return (
      <div className="epicure-restaurant-grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="epicure-restaurant-card-skeleton">
            <div className="epicure-restaurant-card-skeleton__image" />
            <div className="epicure-restaurant-card-skeleton__info">
              <div className="epicure-restaurant-card-skeleton__line epicure-restaurant-card-skeleton__line--name" />
              <div className="epicure-restaurant-card-skeleton__line epicure-restaurant-card-skeleton__line--chef" />
              <div className="epicure-restaurant-card-skeleton__line epicure-restaurant-card-skeleton__line--stars" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="epicure-page-tabs-wrap">
        <div className="epicure-page-tabs" role="tablist">
          {TEXT.restaurantsGrid.tabs.map(tab => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`epicure-page-tab epicure-page-tab--${tab.id}${activeTab === tab.id ? ' epicure-page-tab--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="epicure-filter-row">
        {filterConfigs.map(({ id, content, ...props }) => (
          <Filter key={id} {...props}>{content}</Filter>
        ))}
      </div>

      {activeTab === 'map' ? (
        <div className="epicure-map-placeholder">{TEXT.restaurantsGrid.mapPlaceholder}</div>
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
