import { useEffect, useState } from 'react';
import type { RefObject } from 'react';

export function useIntersectionObserver(
  ref: RefObject<Element | null>,
): boolean {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return isVisible;
}
