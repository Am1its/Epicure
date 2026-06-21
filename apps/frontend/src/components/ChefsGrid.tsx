'use client';

import { useState, useEffect, useMemo } from 'react';
import type { Chef } from '@org/shared-types';
import { ChefCard } from '@org/ui-components';
import { TEXT } from '../lib/text';
import { fetchApi, strapiImageUrl } from '../lib/api';
import { CHEF_HIGHLIGHT_EVENT, PENDING_CHEF_KEY } from '../lib/events';
import { ChefModal } from './ChefModal';

type ChefTab = (typeof TEXT.chefsGrid.tabs)[number]['id'];

export function ChefsGrid() {
  const [chefs, setChefs] = useState<Chef[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<ChefTab>('all');
  const [highlightId, setHighlightId] = useState<number | null>(null);
  const [selectedChef, setSelectedChef] = useState<Chef | null>(null);

  useEffect(() => {
    const pending = sessionStorage.getItem(PENDING_CHEF_KEY);
    if (pending) {
      sessionStorage.removeItem(PENDING_CHEF_KEY);
      const id = parseInt(pending, 10);
      if (!isNaN(id)) setHighlightId(id);
    }
    function onChefHighlight(e: Event) {
      setHighlightId((e as CustomEvent<number>).detail);
    }
    window.addEventListener(CHEF_HIGHLIGHT_EVENT, onChefHighlight);
    return () => window.removeEventListener(CHEF_HIGHLIGHT_EVENT, onChefHighlight);
  }, []);

  useEffect(() => {
    fetchApi<Chef[]>('/api/chefs')
      .then(setChefs)
      .catch((err) => { console.error('Failed to fetch chefs:', err); setChefs([]); })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!highlightId || chefs.length === 0) return;
    // Switch to 'all' so the chef card is guaranteed to be in the DOM
    setActiveTab('all');
    let modalTimer: ReturnType<typeof setTimeout>;
    const scrollTimer = setTimeout(() => {
      const el = document.getElementById(`chef-${highlightId}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const chef = chefs.find(c => c.id === highlightId);
      // Open modal only after scroll animation finishes
      modalTimer = setTimeout(() => {
        if (chef) setSelectedChef(chef);
        setHighlightId(null);
      }, 500);
    }, 1000);
    return () => { clearTimeout(scrollTimer); clearTimeout(modalTimer); };
  }, [highlightId, chefs]);

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
      {selectedChef && (
        <ChefModal chef={selectedChef} onClose={() => setSelectedChef(null)} />
      )}
      <div className="epicure-page-tabs-wrap">
        <div className="epicure-page-tabs" role="tablist">
          {TEXT.chefsGrid.tabs.map(tab => (
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
      <div className="epicure-chef-grid">
        {filtered.map(chef => (
          <button
            key={chef.id}
            id={`chef-${chef.id}`}
            type="button"
            className={`epicure-chef-grid__item${highlightId === chef.id ? ' epicure-chef-highlight' : ''}`}
            onClick={() => setSelectedChef(chef)}
            aria-label={chef.name}
          >
            <ChefCard chef={chef} imageUrl={strapiImageUrl(chef.image?.url)} />
          </button>
        ))}
      </div>
    </>
  );
}
