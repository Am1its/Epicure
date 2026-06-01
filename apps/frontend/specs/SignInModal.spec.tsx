import { render, screen, fireEvent } from '@testing-library/react';
import { SignInModal } from '../src/components/SignInModal';

describe('SignInModal', () => {
  it('renders email address field', () => {
    render(<SignInModal onClose={jest.fn()} />);
    expect(screen.getByPlaceholderText(/email address/i)).toBeInTheDocument();
  });

  it('renders password field', () => {
    render(<SignInModal onClose={jest.fn()} />);
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  });

  it('renders Sign In button', () => {
    render(<SignInModal onClose={jest.fn()} />);
    expect(screen.getByRole('button', { name: /^sign in$/i })).toBeInTheDocument();
  });

  it('calls onClose when backdrop is clicked', () => {
    const onClose = jest.fn();
    render(<SignInModal onClose={onClose} />);
    fireEvent.click(screen.getByRole('button', { name: /close sign in/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
