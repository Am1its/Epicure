'use client';

import { useState, useEffect, useRef } from 'react';
import type { Dish } from '@org/shared-types';
import { DishCard } from '@org/ui-components';
import { strapiImageUrl } from '../lib/api';
import { TEXT } from '../lib/text';
import { useTabIndicator } from '../hooks/useTabIndicator';
import { DishModal } from './DishModal';
import { PENDING_DISH_KEY } from '../lib/events';

type MealTime = (typeof TEXT.dishGrid.tabs)[number];

interface DishGridProps {
  dishes: Dish[];
  restaurantId: number;
  restaurantName: string;
}

export function DishGrid({ dishes, restaurantId, restaurantName }: DishGridProps) {
  const [activeTab, setActiveTab] = useState<MealTime>(TEXT.dishGrid.tabs[0]);
  const tabsRef = useRef<HTMLDivElement>(null);
  useTabIndicator(tabsRef, activeTab);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>('');

  const pendingScrollRef = useRef<{ dishId: number; dish: Dish } | null>(null);

  useEffect(() => {
    const pending = sessionStorage.getItem(PENDING_DISH_KEY);
    if (!pending) return;
    const dishId = parseInt(pending, 10);
    if (isNaN(dishId) || dishes.length === 0) return;
    const dish = dishes.find(d => d.id === dishId);
    if (!dish) return;
    pendingScrollRef.current = { dishId, dish };
    setActiveTab((dish.mealTime ?? TEXT.dishGrid.tabs[0]) as MealTime);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!pendingScrollRef.current) return;
    const { dishId, dish } = pendingScrollRef.current;
    const el = document.getElementById(`dish-${dishId}`);
    if (!el) return;
    pendingScrollRef.current = null;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const t = setTimeout(() => {
      sessionStorage.removeItem(PENDING_DISH_KEY);
      setSelectedDish(dish);
      setSelectedImageUrl(strapiImageUrl(dish.image?.url));
    }, isMobile ? 1200 : 500);
    return () => clearTimeout(t);
  }, [activeTab]); // eslint-disable-line react-hooks/exhaustive-deps

  const filtered = dishes.filter(d => d.mealTime?.trim() === activeTab);
  const tabs = [...TEXT.dishGrid.tabs] as MealTime[];

  function handleDishClick(dish: Dish) {
    setSelectedDish(dish);
    setSelectedImageUrl(strapiImageUrl(dish.image?.url));
  }

  return (
    <>
      <div className="epicure-detail-tabs epicure-page-tabs-wrap">
        <div ref={tabsRef} className="epicure-page-tabs" role="tablist">
          {tabs.map(tab => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              aria-controls="dish-grid-panel"
              className={`epicure-page-tab${activeTab === tab ? ' epicure-page-tab--active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
          <span className="epicure-page-tabs__indicator" aria-hidden="true" />
        </div>
      </div>
      {filtered.length === 0 ? (
        <div className="epicure-dish-grid__empty">
          <p>{TEXT.dishGrid.nodishes}</p>
        </div>
      ) : (
        <div id="dish-grid-panel" role="tabpanel" className="epicure-dish-grid">
          {filtered.map(dish => (
            <div
              key={dish.id}
              id={`dish-${dish.id}`}
              className="epicure-dish-grid-item"
              role="button"
              tabIndex={0}
              aria-label={TEXT.dishGrid.openAriaLabel(dish.name)}
              onClick={() => handleDishClick(dish)}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleDishClick(dish); } }}
            >
              <DishCard dish={dish} imageUrl={strapiImageUrl(dish.image?.url)} />
            </div>
          ))}
        </div>
      )}

      {selectedDish && (
        <DishModal
          dish={selectedDish}
          imageUrl={selectedImageUrl}
          restaurantId={restaurantId}
          restaurantName={restaurantName}
          onClose={() => setSelectedDish(null)}
        />
      )}
    </>
  );
}
