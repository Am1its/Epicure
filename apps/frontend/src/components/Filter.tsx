'use client';

import { useRef, type ReactNode } from 'react';
import { useClickOutside } from '../hooks/useClickOutside';

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
  useClickOutside(ref, onClose, isOpen);

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
