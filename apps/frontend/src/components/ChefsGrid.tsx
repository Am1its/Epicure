'use client';

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import type { Chef } from '@org/shared-types';
import { ChefCard } from '@org/ui-components';
import { TEXT } from '../lib/text';
import { fetchApi, strapiImageUrl } from '../lib/api';
import { CHEF_HIGHLIGHT_EVENT, PENDING_CHEF_KEY } from '../lib/events';
import { ChefModal } from './ChefModal';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useTabIndicator } from '../hooks/useTabIndicator';

const PAGE_SIZE = 6;

type ChefTab = (typeof TEXT.chefsGrid.tabs)[number]['id'];

export function ChefsGrid() {
  const [chefs, setChefs] = useState<Chef[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<ChefTab>('all');
  const [highlightId, setHighlightId] = useState<number | null>(null);
  const [selectedChef, setSelectedChef] = useState<Chef | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const gridRef = useRef<HTMLDivElement>(null);
  const gridVisible = useIntersectionObserver(gridRef);
  const tabsRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  useTabIndicator(tabsRef, activeTab);

  useEffect(() => {
    const pending = sessionStorage.getItem(PENDING_CHEF_KEY);
    if (pending) {
      sessionStorage.removeItem(PENDING_CHEF_KEY);
      const id = parseInt(pending, 10);
      if (!isNaN(id)) setHighlightId(id);
    }
    function onChefHighlight(e: Event) {
      sessionStorage.removeItem(PENDING_CHEF_KEY);
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

  const filtered = useMemo(() => {
    if (activeTab === 'new') return [...chefs].sort((a, b) => b.id - a.id);
    if (activeTab === 'most-viewed')
      return chefs.filter(c => c.chefOfTheWeek);
    return chefs;
  }, [chefs, activeTab]);

  useEffect(() => { setVisibleCount(PAGE_SIZE); }, [filtered]);

  const loadMore = useCallback(() => setVisibleCount(prev => prev + PAGE_SIZE), []);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) loadMore();
    }, { threshold: 0 });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore, filtered]);

  useEffect(() => {
    if (!highlightId || chefs.length === 0) return;
    // Switch to 'all' and show all chefs so the target card is in the DOM
    setActiveTab('all');
    setVisibleCount(chefs.length);
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    let modalTimer: ReturnType<typeof setTimeout>;
    const scrollTimer = setTimeout(() => {
      const el = document.getElementById(`chef-${highlightId}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const chef = chefs.find(c => c.id === highlightId);
      // On mobile the chef may be far down the page — give the scroll more time
      modalTimer = setTimeout(() => {
        if (chef) setSelectedChef(chef);
        setHighlightId(null);
      }, isMobile ? 1200 : 500);
    }, 1000);
    return () => { clearTimeout(scrollTimer); clearTimeout(modalTimer); };
  }, [highlightId, chefs]);

  return (
    <>
      {selectedChef && (
        <ChefModal chef={selectedChef} onClose={() => setSelectedChef(null)} />
      )}
      <div className="epicure-page-tabs-wrap">
        <div ref={tabsRef} className="epicure-page-tabs" role="tablist">
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
          <span className="epicure-page-tabs__indicator" aria-hidden="true" />
        </div>
      </div>
      {loading ? (
        <div ref={gridRef} className="epicure-chef-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="epicure-chef-card-skeleton">
              <div className="epicure-chef-card-skeleton__image" />
              <div className="epicure-chef-card-skeleton__info" />
            </div>
          ))}
        </div>
      ) : (
        <div
          ref={gridRef}
          className={`epicure-chef-grid${gridVisible ? ' epicure-chef-grid--visible' : ''}`}
        >
          {filtered.slice(0, visibleCount).map(chef => (
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
          {visibleCount < filtered.length && (
            <div ref={sentinelRef} className="epicure-scroll-sentinel" aria-hidden="true" />
          )}
        </div>
      )}
    </>
  );
}
