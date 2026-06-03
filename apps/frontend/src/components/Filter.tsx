'use client';

import { useRef, useEffect, type ReactNode } from 'react';

interface FilterProps {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  dropdownClassName?: string;
  children: ReactNode;
}

export function Filter({ label, isOpen, onToggle, onClose, dropdownClassName, children }: FilterProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <div className="epicure-filter-wrap" ref={ref}>
      <button
        className={`epicure-filter-btn${isOpen ? ' epicure-filter-btn--active' : ''}`}
        onClick={onToggle}
      >
        {label} ∨
      </button>
      {isOpen && (
        <div className={`epicure-filter-dropdown${dropdownClassName ? ` ${dropdownClassName}` : ''}`}>
          {children}
        </div>
      )}
    </div>
  );
}
