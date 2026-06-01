import { render, screen } from '@testing-library/react';
import Page from '../src/app/page';

jest.mock('../src/lib/api', () => ({
  fetchApi: jest.fn().mockResolvedValue([]),
}));

describe('HomePage', () => {
  it('renders the EPICURE logo', async () => {
    render(await Page());
    expect(screen.getByText('EPICURE')).toBeInTheDocument();
  });

  it('renders the desktop hero headline', async () => {
    render(await Page());
    expect(screen.getByRole('heading', { level: 1, name: /good food/i })).toBeInTheDocument();
  });

  it('renders nav links for Restaurants and Chefs', async () => {
    render(await Page());
    expect(screen.getByRole('link', { name: 'Restaurants' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Chefs' })).toBeInTheDocument();
  });

  it('renders footer links', async () => {
    render(await Page());
    expect(screen.getByRole('link', { name: 'Contact Us' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Term of Use' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Privacy Policy' })).toBeInTheDocument();
  });

  it('renders mobile hero headline', async () => {
    render(await Page());
    expect(
      screen.getByText(/epicure works with the top chef restaurants/i)
    ).toBeInTheDocument();
  });

  it('renders popular restaurants section heading', async () => {
    render(await Page());
    expect(screen.getByText(/popular restaurant in epicure/i)).toBeInTheDocument();
  });

  it('renders All Restaurants link', async () => {
    render(await Page());
    expect(screen.getByRole('link', { name: /all restaurants/i })).toBeInTheDocument();
  });
});
