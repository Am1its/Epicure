import { render, screen, fireEvent } from '@testing-library/react';
import { SignInModal } from '../src/components/SignInModal';

describe('SignInModal', () => {
  it('renders SIGN IN title', () => {
    render(<SignInModal onClose={jest.fn()} />);
    expect(screen.getByRole('heading', { name: /sign in/i })).toBeInTheDocument();
  });

  it('renders email address field', () => {
    render(<SignInModal onClose={jest.fn()} />);
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
  });

  it('renders password field', () => {
    render(<SignInModal onClose={jest.fn()} />);
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('renders LOGIN button', () => {
    render(<SignInModal onClose={jest.fn()} />);
    expect(screen.getByRole('button', { name: /^login$/i })).toBeInTheDocument();
  });

  it('renders SIGN UP button', () => {
    render(<SignInModal onClose={jest.fn()} />);
    expect(screen.getByRole('button', { name: /^sign up$/i })).toBeInTheDocument();
  });

  it('renders Forget password link', () => {
    render(<SignInModal onClose={jest.fn()} />);
    expect(screen.getByRole('link', { name: /forget password/i })).toBeInTheDocument();
  });

  it('calls onClose when backdrop is clicked', () => {
    const onClose = jest.fn();
    render(<SignInModal onClose={onClose} />);
    fireEvent.click(screen.getByRole('button', { name: /close sign in$/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
