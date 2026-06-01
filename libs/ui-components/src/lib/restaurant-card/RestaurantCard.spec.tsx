import { render, screen } from '@testing-library/react';
import { RestaurantCard } from './RestaurantCard';
import type { Restaurant } from '@org/shared-types';

const mockRestaurant: Restaurant = {
  id: 1,
  name: 'Claro',
  chef: { id: 1, name: 'Ran Shmueli' },
  rating: 4,
};

describe('RestaurantCard', () => {
  it('renders restaurant name', () => {
    render(<RestaurantCard restaurant={mockRestaurant} />);
    expect(screen.getByText('Claro')).toBeInTheDocument();
  });

  it('renders chef name', () => {
    render(<RestaurantCard restaurant={mockRestaurant} />);
    expect(screen.getByText('Ran Shmueli')).toBeInTheDocument();
  });

  it('links to /restaurants/1', () => {
    render(<RestaurantCard restaurant={mockRestaurant} />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/restaurants/1');
  });

  it('renders star rating', () => {
    render(<RestaurantCard restaurant={mockRestaurant} />);
    expect(screen.getByRole('img', { name: 'Rating: 4 out of 5' })).toBeInTheDocument();
  });

  it('shows placeholder image when no image provided', () => {
    render(<RestaurantCard restaurant={mockRestaurant} />);
    const img = screen.getByRole('img', { name: /claro/i });
    expect(img).toHaveAttribute('src', '/icons/logo.svg');
  });
});
