import { StarRating } from '@org/ui-components';

interface RatingFilterProps {
  selectedRatings: Set<number>;
  onToggle: (rating: number) => void;
  onClear: () => void;
}

export function RatingFilter({ selectedRatings, onToggle, onClear }: RatingFilterProps) {
  return (
    <>
      <p className="epicure-filter-dropdown__title">Rating</p>
      {[1, 2, 3, 4, 5].map(r => (
        <label key={r}>
          <input
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
