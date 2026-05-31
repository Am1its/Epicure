import { render, screen } from '@testing-library/react';
import { DishCard } from './DishCard';
import type { Dish } from '@org/shared-types';

const mockDish: Dish = {
  id: 1,
  name: 'Pad Ki Mao',
  description: 'Shrimps, Glass Noodles, Kemiri Nuts',
  price: 88,
  type: 'Spicy',
  mealTime: 'Breakfast',
  isSignatureDish: false,
};

describe('DishCard', () => {
  it('renders dish name', () => {
    render(<DishCard dish={mockDish} />);
    expect(screen.getByText('Pad Ki Mao')).toBeInTheDocument();
  });

  it('renders price with shekel symbol', () => {
    render(<DishCard dish={mockDish} />);
    expect(screen.getByText('₪88')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<DishCard dish={mockDish} />);
    expect(screen.getByText('Shrimps, Glass Noodles, Kemiri Nuts')).toBeInTheDocument();
  });

  it('shows spicy type icon', () => {
    render(<DishCard dish={mockDish} />);
    const icon = screen.getByRole('img', { name: /spicy/i });
    expect(icon).toHaveAttribute('src', '/icons/spicy.svg');
  });

  it('shows no type icon when type is undefined', () => {
    render(<DishCard dish={{ ...mockDish, type: undefined }} />);
    expect(screen.queryByRole('img', { name: /spicy|vegan|vegetarian/i })).not.toBeInTheDocument();
  });

  it('shows Signature Dish label when isSignatureDish is true', () => {
    render(<DishCard dish={{ ...mockDish, isSignatureDish: true }} />);
    expect(screen.getByText(/signature dish/i)).toBeInTheDocument();
  });

  it('does not show Signature Dish label when isSignatureDish is false', () => {
    render(<DishCard dish={mockDish} />);
    expect(screen.queryByText(/signature dish/i)).not.toBeInTheDocument();
  });
});
