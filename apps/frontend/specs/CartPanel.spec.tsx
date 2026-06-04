import { render, screen, fireEvent } from '@testing-library/react';
import { CartPanel } from '../src/components/CartPanel';

describe('CartPanel', () => {
  it('renders empty bag message', () => {
    render(<CartPanel onClose={jest.fn()} />);
    expect(screen.getByText(/your bag is empty/i)).toBeInTheDocument();
  });

  it('renders cart icon', () => {
    render(<CartPanel onClose={jest.fn()} />);
    expect(screen.getByAltText(/cart/i)).toBeInTheDocument();
  });

  it('calls onClose when backdrop is clicked', () => {
    const onClose = jest.fn();
    render(<CartPanel onClose={onClose} />);
    fireEvent.click(screen.getByRole('button', { name: /close cart/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
