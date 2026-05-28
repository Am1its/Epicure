import React from 'react';
import { render, screen } from '@testing-library/react';
import Page from '../src/app/page';

describe('HomePage', () => {
  it('renders the EPICURE logo', () => {
    render(<Page />);
    expect(screen.getByText('EPICURE')).toBeInTheDocument();
  });

  it('renders the hero headline', () => {
    render(<Page />);
    expect(screen.getByRole('heading', { level: 1, name: /good food/i })).toBeInTheDocument();
  });

  it('renders nav links for Restaurants and Chefs', () => {
    render(<Page />);
    expect(screen.getByRole('link', { name: 'Restaurants' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Chefs' })).toBeInTheDocument();
  });

  it('renders footer links', () => {
    render(<Page />);
    expect(screen.getByRole('link', { name: 'Contact Us' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Term of Use' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Privacy Policy' })).toBeInTheDocument();
  });
});
