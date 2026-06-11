interface StarRatingProps {
  rating: number;
}

export function StarRating({ rating }: StarRatingProps) {
  const clamped = Math.min(5, Math.max(0, rating));
  return (
    <div
      className="epicure-star-rating"
      role="img"
      aria-label={`Rating: ${clamped} out of 5`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={i < clamped ? 'epicure-star epicure-star--filled' : 'epicure-star epicure-star--empty'}
        >
          {i < clamped ? '★' : '☆'}
        </span>
      ))}
    </div>
  );
}
