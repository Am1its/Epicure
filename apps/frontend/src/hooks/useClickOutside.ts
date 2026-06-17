import { useEffect, type RefObject } from 'react';

export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  onClose: () => void,
  enabled = true,
  excludeRef?: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    if (!enabled) return;
    function handleMouseDown(e: MouseEvent) {
      if (excludeRef?.current?.contains(e.target as Node)) return;
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [ref, onClose, enabled, excludeRef]);
}
