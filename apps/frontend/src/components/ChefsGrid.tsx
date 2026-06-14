'use client';

import { useState, useEffect, useMemo } from 'react';
import type { Chef } from '@org/shared-types';
import { ChefCard } from '@org/ui-components';
import { TEXT } from '../lib/text';
import { fetchApi, strapiImageUrl } from '../lib/api';

type ChefTab = (typeof TEXT.chefsGrid.tabs)[number]['id'];

export function ChefsGrid() {
  const [chefs, setChefs] = useState<Chef[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<ChefTab>('all');

  useEffect(() => {
    fetchApi<Chef[]>('/api/chefs')
      .then(setChefs)
      .catch((err) => { console.error('Failed to fetch chefs:', err); setChefs([]); })
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    if (activeTab === 'new') return [...chefs].sort((a, b) => b.id - a.id);
    if (activeTab === 'most-viewed')
      return chefs.filter(c => c.chefOfTheWeek);
    return chefs;
  }, [chefs, activeTab]);

  if (loading) {
    return (
      <div className="epicure-chef-grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="epicure-chef-card-skeleton">
            <div className="epicure-chef-card-skeleton__image" />
            <div className="epicure-chef-card-skeleton__info" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="epicure-page-tabs-wrap">
        <div className="epicure-page-tabs" role="tablist">
          {TEXT.chefsGrid.tabs.map(tab => (
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
      <div className="epicure-chef-grid">
        {filtered.map(chef => (
          <ChefCard key={chef.id} chef={chef} imageUrl={strapiImageUrl(chef.image?.url)} />
        ))}
      </div>
    </>
  );
}
