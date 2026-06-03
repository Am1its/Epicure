import { render, screen } from '@testing-library/react';
import { StarRating } from './StarRating';

describe('StarRating', () => {
  it('renders 5 stars total', () => {
    const { container } = render(<StarRating rating={3} />);
    expect(container.querySelectorAll('.epicure-star')).toHaveLength(5);
  });

  it('marks correct count as filled', () => {
    const { container } = render(<StarRating rating={3} />);
    expect(container.querySelectorAll('.epicure-star--filled')).toHaveLength(3);
    expect(container.querySelectorAll('.epicure-star--empty')).toHaveLength(2);
  });

  it('renders 0 filled stars for rating 0', () => {
    const { container } = render(<StarRating rating={0} />);
    expect(container.querySelectorAll('.epicure-star--filled')).toHaveLength(0);
    expect(container.querySelectorAll('.epicure-star--empty')).toHaveLength(5);
  });

  it('renders all filled for rating 5', () => {
    const { container } = render(<StarRating rating={5} />);
    expect(container.querySelectorAll('.epicure-star--filled')).toHaveLength(5);
  });

  it('has accessible label', () => {
    render(<StarRating rating={4} />);
    expect(screen.getByRole('img', { name: 'Rating: 4 out of 5' })).toBeInTheDocument();
  });
});
