import { render, screen } from '@testing-library/react';
import { ChefCard } from './ChefCard';
import type { Chef } from '@org/shared-types';

const mockChef: Chef = {
  id: 1,
  name: 'Yossi Shitrit',
};

describe('ChefCard', () => {
  it('renders chef name', () => {
    render(<ChefCard chef={mockChef} />);
    expect(screen.getByText('Yossi Shitrit')).toBeInTheDocument();
  });

  it('renders image with chef name as alt text', () => {
    render(<ChefCard chef={mockChef} imageUrl="/uploads/yossi.jpg" />);
    const img = screen.getByRole('img', { name: 'Yossi Shitrit' });
    expect(img).toHaveAttribute('src', '/uploads/yossi.jpg');
  });

  it('shows placeholder image when no imageUrl provided', () => {
    render(<ChefCard chef={mockChef} />);
    const img = screen.getByRole('img', { name: 'Yossi Shitrit' });
    expect(img).toHaveAttribute('src', '/icons/logo.svg');
  });

  it('applies grayscale class to image', () => {
    render(<ChefCard chef={mockChef} />);
    const img = screen.getByRole('img', { name: 'Yossi Shitrit' });
    expect(img).toHaveClass('epicure-chef-card__image');
  });
});
