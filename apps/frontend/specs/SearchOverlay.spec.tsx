import { render, screen, fireEvent } from '@testing-library/react';
import { SearchOverlay } from '../src/components/SearchOverlay';

describe('SearchOverlay', () => {
  it('renders search input with correct placeholder', () => {
    render(<SearchOverlay onClose={jest.fn()} />);
    expect(
      screen.getByPlaceholderText(/search for restaurant, cuisine, chef/i)
    ).toBeInTheDocument();
  });

  it('renders Search heading', () => {
    render(<SearchOverlay onClose={jest.fn()} />);
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    render(<SearchOverlay onClose={onClose} />);
    fireEvent.click(screen.getByRole('button', { name: /close search/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
