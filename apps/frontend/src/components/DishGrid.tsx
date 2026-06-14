'use client';

import { useState } from 'react';
import type { Dish } from '@org/shared-types';
import { DishCard } from '@org/ui-components';
import { strapiImageUrl } from '../lib/api';
import { TEXT } from '../lib/text';
import { DishModal } from './DishModal';

type MealTime = (typeof TEXT.dishGrid.tabs)[number];

interface DishGridProps {
  dishes: Dish[];
  restaurantId: number;
  restaurantName: string;
}

export function DishGrid({ dishes, restaurantId, restaurantName }: DishGridProps) {
  const [activeTab, setActiveTab] = useState<MealTime>(TEXT.dishGrid.tabs[0]);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>('');

  const filtered = dishes.filter(d => d.mealTime?.trim() === activeTab);
  const tabs = [...TEXT.dishGrid.tabs] as MealTime[];

  function handleDishClick(dish: Dish) {
    setSelectedDish(dish);
    setSelectedImageUrl(strapiImageUrl(dish.image?.url));
  }

  return (
    <>
      <div className="epicure-detail-tabs epicure-page-tabs-wrap">
        <div className="epicure-page-tabs" role="tablist">
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
        </div>
      </div>
      <div id="dish-grid-panel" role="tabpanel" className="epicure-dish-grid">
        {filtered.map(dish => (
          <div
            key={dish.id}
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
