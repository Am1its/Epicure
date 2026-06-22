import { useEffect } from 'react';
import type { RefObject } from 'react';

export function useTabIndicator(
  containerRef: RefObject<HTMLElement | null>,
  activeTab: string,
): void {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const active = container.querySelector('.epicure-page-tab--active') as HTMLElement | null;
    if (!active) return;
    container.style.setProperty('--tab-offset', `${active.offsetLeft}px`);
    container.style.setProperty('--tab-width', `${active.offsetWidth}px`);
  }, [activeTab, containerRef]);
}
