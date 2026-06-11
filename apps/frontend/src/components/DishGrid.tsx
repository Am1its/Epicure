'use client';

import { useState } from 'react';
import type { Dish } from '@org/shared-types';
import { DishCard } from '@org/ui-components';
import { strapiImageUrl } from '../lib/api';
import { TEXT } from '../lib/text';

type MealTime = (typeof TEXT.dishGrid.tabs)[number];

interface DishGridProps {
  dishes: Dish[];
}

export function DishGrid({ dishes }: DishGridProps) {
  const [activeTab, setActiveTab] = useState<MealTime>('Breakfast');

  const filtered = dishes.filter(
    d => d.mealTime?.trim() === activeTab
  );

  const tabs = [...TEXT.dishGrid.tabs] as MealTime[];

  return (
    <>
      <div className="epicure-page-tabs-wrap">
        <div className="epicure-page-tabs" role="tablist">
          {tabs.map(tab => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              className={`epicure-page-tab${activeTab === tab ? ' epicure-page-tab--active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="epicure-dish-grid">
        {filtered.map(dish => (
          <DishCard key={dish.id} dish={dish} imageUrl={strapiImageUrl(dish.image?.url)} />
        ))}
      </div>
    </>
  );
}
