'use client';

import { TEXT } from '../lib/text';

interface CuisineFilterProps {
  availableCuisines: string[];
  selected: string | null;
  onSelect: (c: string | null) => void;
}

export function CuisineFilter({ availableCuisines, selected, onSelect }: CuisineFilterProps) {
  return (
    <>
      <p className="epicure-filter-dropdown__title">{TEXT.restaurantsGrid.cuisineFilter}</p>
      {availableCuisines.map(c => (
        <button
          key={c}
          className={`epicure-filter-dropdown__option${selected === c ? ' epicure-filter-dropdown__option--active' : ''}`}
          onClick={() => onSelect(selected === c ? null : c)}
        >
          {c}
        </button>
      ))}
      {selected && (
        <button className="epicure-filter-clear-btn" onClick={() => onSelect(null)}>CLEAR</button>
      )}
    </>
  );
}
