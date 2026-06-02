'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import type { Restaurant } from '@org/shared-types';
import { RestaurantCard, StarRating } from '@org/ui-components';

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

  const priceRef = useRef<HTMLDivElement>(null);
  const distanceRef = useRef<HTMLDivElement>(null);
  const ratingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (priceOpen && priceRef.current && !priceRef.current.contains(e.target as Node)) setPriceOpen(false);
      if (distanceOpen && distanceRef.current && !distanceRef.current.contains(e.target as Node)) setDistanceOpen(false);
      if (ratingOpen && ratingRef.current && !ratingRef.current.contains(e.target as Node)) setRatingOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [priceOpen, distanceOpen, ratingOpen]);

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
        {/* Price Range */}
        <div className="epicure-filter-wrap" ref={priceRef}>
          <button
            className={`epicure-filter-btn${priceOpen ? ' epicure-filter-btn--active' : ''}`}
            onClick={() => { setPriceOpen(o => !o); setDistanceOpen(false); setRatingOpen(false); }}
          >
            Price Range ∨
          </button>
          {priceOpen && (
            <div className="epicure-filter-dropdown epicure-filter-dropdown--slider">
              <p className="epicure-filter-dropdown__title">Price Range Selected</p>
              <p className="epicure-filter-dropdown__sublabel">₪{sliderValue[0]} – ₪{sliderValue[1]}</p>
              <div className="epicure-filter-slider-wrap">
                <span className="epicure-filter-slider-edge">₪{globalPrices.min}</span>
                <Slider
                  range
                  min={globalPrices.min}
                  max={globalPrices.max}
                  value={sliderValue}
                  onChange={(v) => setPriceRange(v as [number, number])}
                />
                <span className="epicure-filter-slider-edge">₪{globalPrices.max}</span>
              </div>
            </div>
          )}
        </div>

        {/* Distance */}
        <div className="epicure-filter-wrap" ref={distanceRef}>
          <button
            className={`epicure-filter-btn${distanceOpen ? ' epicure-filter-btn--active' : ''}`}
            onClick={() => { setDistanceOpen(o => !o); setPriceOpen(false); setRatingOpen(false); }}
          >
            Distance ∨
          </button>
          {distanceOpen && (
            <div className="epicure-filter-dropdown epicure-filter-dropdown--slider">
              <p className="epicure-filter-dropdown__title">Distance</p>
              <div className="epicure-filter-slider-wrap">
                <span className="epicure-filter-slider-edge">My location</span>
                <Slider
                  min={0}
                  max={4}
                  step={0.5}
                  value={distanceKm}
                  onChange={(v) => setDistanceKm(v as number)}
                />
                <span className="epicure-filter-slider-edge">{distanceKm}km</span>
              </div>
            </div>
          )}
        </div>

        {/* Rating */}
        <div className="epicure-filter-wrap" ref={ratingRef}>
          <button
            className={`epicure-filter-btn${ratingOpen ? ' epicure-filter-btn--active' : ''}`}
            onClick={() => { setRatingOpen(o => !o); setPriceOpen(false); setDistanceOpen(false); }}
          >
            Rating ∨
          </button>
          {ratingOpen && (
            <div className="epicure-filter-dropdown">
              <p className="epicure-filter-dropdown__title">Rating</p>
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
