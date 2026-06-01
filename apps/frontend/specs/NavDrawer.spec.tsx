import { render, screen, fireEvent } from '@testing-library/react';
import { NavDrawer } from '../src/components/NavDrawer';

describe('NavDrawer', () => {
  it('renders Restaurants link to /restaurants', () => {
    render(<NavDrawer onClose={jest.fn()} />);
    expect(screen.getByRole('link', { name: 'Restaurants' })).toHaveAttribute('href', '/restaurants');
  });

  it('renders Chefs link to /chefs', () => {
    render(<NavDrawer onClose={jest.fn()} />);
    expect(screen.getByRole('link', { name: 'Chefs' })).toHaveAttribute('href', '/chefs');
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    render(<NavDrawer onClose={onClose} />);
    fireEvent.click(screen.getByRole('button', { name: /close navigation/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders footer links', () => {
    render(<NavDrawer onClose={jest.fn()} />);
    expect(screen.getByRole('link', { name: 'Contact Us' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Term of Use' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Privacy Policy' })).toBeInTheDocument();
  });
});
