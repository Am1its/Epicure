interface StarRatingProps {
  rating: number;
}

export function StarRating({ rating }: StarRatingProps) {
  return (
    <div
      className="epicure-star-rating"
      role="img"
      aria-label={`Rating: ${rating} out of 5`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={i < rating ? 'epicure-star epicure-star--filled' : 'epicure-star epicure-star--empty'}
        >
          {i < rating ? '★' : '☆'}
        </span>
      ))}
    </div>
  );
}
