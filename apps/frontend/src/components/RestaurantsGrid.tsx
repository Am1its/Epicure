'use client';

import { useState, useEffect, useMemo, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import type { Restaurant } from '@org/shared-types';
import { RestaurantCard } from '@org/ui-components';
import { Filter } from './Filter';
import { PriceFilter } from './PriceFilter';
import { DistanceFilter } from './DistanceFilter';
import { RatingFilter } from './RatingFilter';
import { CuisineFilter } from './CuisineFilter';
import { TEXT } from '../lib/text';
import { fetchRestaurantsWithDistances, strapiImageUrl } from '../lib/api';
import { CUISINE_FILTER_EVENT, PENDING_CUISINE_KEY } from '../lib/events';
import { useUserLocation } from '../hooks/useUserLocation';
import { isOpenNow } from '../lib/openingHours';

const MapView = dynamic(() => import('./MapView').then(m => m.MapView), { ssr: false });

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
  const [selectedCuisines, setSelectedCuisines] = useState<Set<string>>(new Set());
  const [openFilterId, setOpenFilterId] = useState<string | null>(null);

  useEffect(() => {
    const pending = sessionStorage.getItem(PENDING_CUISINE_KEY);
    if (pending) {
      sessionStorage.removeItem(PENDING_CUISINE_KEY);
      try { setSelectedCuisines(new Set(JSON.parse(pending) as string[])); } catch { /* ignore */ }
    }
    function onCuisineFilter(e: Event) {
      setSelectedCuisines(new Set((e as CustomEvent<string[]>).detail));
    }
    window.addEventListener(CUISINE_FILTER_EVENT, onCuisineFilter);
    return () => window.removeEventListener(CUISINE_FILTER_EVENT, onCuisineFilter);
  }, []);

  useEffect(() => {
    if (!coords) return;
    fetchRestaurantsWithDistances(coords.lat, coords.lng)
      .then(setRestaurants)
      .catch((err) => { console.error('Failed to fetch restaurants:', err); setRestaurants([]); })
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

  const availableCuisines = useMemo(
    () =>
      [...new Set(restaurants.map(r => r.cuisine).filter((c): c is string => !!c))].sort(),
    [restaurants],
  );

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
        .filter(r => activeTab !== 'open' || isOpenNow(r.openingHours))
        .filter(r => selectedRatings.size === 0 || selectedRatings.has(r.rating))
        .filter(r => r.distance == null || r.distance <= distanceKm)
        .filter(r => selectedCuisines.size === 0 || (r.cuisine !== undefined && selectedCuisines.has(r.cuisine)))
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
    [restaurants, selectedRatings, priceRange, globalPrices, activeTab, distanceKm, selectedCuisines],
  );

  function clearAllFilters() {
    setSelectedRatings(new Set());
    setPriceRange(null);
    setDistanceKm(20);
    setSelectedCuisines(new Set());
    setOpenFilterId(null);
    setActiveTab('all');
  }

  function toggleFilter(id: string) {
    setOpenFilterId(prev => (prev === id ? null : id));
  }

  const filterConfigs: FilterConfig[] = [
    {
      id: 'price',
      label: TEXT.restaurantsGrid.priceFilter,
      isOpen: openFilterId === 'price',
      onToggle: () => toggleFilter('price'),
      onClose: () => setOpenFilterId(null),
      dropdownClassName: 'epicure-filter-dropdown--slider',
      content: <PriceFilter globalPrices={globalPrices} value={sliderValue} onChange={setPriceRange} onClear={() => setPriceRange(null)} />,
    },
    {
      id: 'distance',
      label: TEXT.restaurantsGrid.distanceFilter,
      isOpen: openFilterId === 'distance',
      onToggle: () => toggleFilter('distance'),
      onClose: () => setOpenFilterId(null),
      dropdownClassName: 'epicure-filter-dropdown--slider',
      content: <DistanceFilter value={distanceKm} onChange={setDistanceKm} onClear={() => setDistanceKm(20)} />,
    },
    {
      id: 'rating',
      label: TEXT.restaurantsGrid.ratingFilter,
      isOpen: openFilterId === 'rating',
      onToggle: () => toggleFilter('rating'),
      onClose: () => setOpenFilterId(null),
      content: <RatingFilter selectedRatings={selectedRatings} onToggle={toggleRating} onClear={() => setSelectedRatings(new Set())} />,
    },
    {
      id: 'cuisine',
      label: TEXT.restaurantsGrid.cuisineFilter,
      isOpen: openFilterId === 'cuisine',
      onToggle: () => toggleFilter('cuisine'),
      onClose: () => setOpenFilterId(null),
      content: (
        <CuisineFilter
          availableCuisines={availableCuisines}
          selected={selectedCuisines}
          onToggle={c => {
            setSelectedCuisines(prev => {
              const next = new Set(prev);
              if (next.has(c)) next.delete(c); else next.add(c);
              return next;
            });
          }}
          onClear={() => setSelectedCuisines(new Set())}
        />
      ),
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
              type="button"
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

      {selectedCuisines.size > 0 && (
        <div className="epicure-cuisine-banner">
          <span>{TEXT.restaurantsGrid.cuisineBannerPrefix} {[...selectedCuisines].join(', ')}</span>
          <button
            className="epicure-cuisine-banner__clear"
            onClick={() => setSelectedCuisines(new Set())}
            aria-label={TEXT.restaurantsGrid.clearAllFilters}
          >
            <img src="/icons/x.svg" alt="" aria-hidden="true" width={12} height={12} />
          </button>
        </div>
      )}

      {activeTab === 'map' ? (
        <MapView restaurants={filtered} />
      ) : filtered.length === 0 ? (
        <div className="epicure-restaurant-grid__empty">
          <p>{TEXT.restaurantsGrid.noResults}</p>
          <button className="epicure-filter-clear-btn" onClick={clearAllFilters}>
            {TEXT.restaurantsGrid.clearAllFilters}
          </button>
        </div>
      ) : (
        <div className="epicure-restaurant-grid">
          {filtered.map(restaurant => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} imageUrl={strapiImageUrl(restaurant.image?.url)} />
          ))}
        </div>
      )}
    </>
  );
}
