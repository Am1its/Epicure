import { StarRating } from '@org/ui-components';
import { TEXT } from '../lib/text';

interface RatingFilterProps {
  selectedRatings: Set<number>;
  onToggle: (rating: number) => void;
  onClear: () => void;
}

export function RatingFilter({ selectedRatings, onToggle, onClear }: RatingFilterProps) {
  return (
    <>
      <p className="epicure-filter-dropdown__title">{TEXT.restaurantsGrid.ratingFilter}</p>
      {[1, 2, 3, 4, 5].map(r => (
        <label key={r} htmlFor={`rating-${r}`}>
          <input
            id={`rating-${r}`}
            type="checkbox"
            checked={selectedRatings.has(r)}
            onChange={() => onToggle(r)}
          />
          <StarRating rating={r} />
        </label>
      ))}
      {selectedRatings.size > 0 && (
        <button className="epicure-filter-clear-btn" onClick={onClear}>CLEAR</button>
      )}
    </>
  );
}
