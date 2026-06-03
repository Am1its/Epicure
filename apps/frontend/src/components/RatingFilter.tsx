import { StarRating } from '@org/ui-components';

interface RatingFilterProps {
  selectedRatings: Set<number>;
  onToggle: (rating: number) => void;
}

export function RatingFilter({ selectedRatings, onToggle }: RatingFilterProps) {
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
    </>
  );
}
