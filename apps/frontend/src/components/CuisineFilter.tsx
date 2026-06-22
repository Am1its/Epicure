'use client';

import { TEXT } from '../lib/text';

interface CuisineFilterProps {
  availableCuisines: string[];
  selected: Set<string>;
  onToggle: (c: string) => void;
  onClear: () => void;
}

export function CuisineFilter({ availableCuisines, selected, onToggle, onClear }: CuisineFilterProps) {
  return (
    <>
      <p className="epicure-filter-dropdown__title">{TEXT.restaurantsGrid.cuisineFilter}</p>
      {availableCuisines.map(c => (
        <button
          key={c}
          className={`epicure-filter-dropdown__option${selected.has(c) ? ' epicure-filter-dropdown__option--active' : ''}`}
          onClick={() => onToggle(c)}
        >
          {c}
        </button>
      ))}
      {selected.size > 0 && (
        <button className="epicure-filter-clear-btn" onClick={onClear}>{TEXT.restaurantsGrid.clearLabel}</button>
      )}
    </>
  );
}
