import { test, expect } from '@playwright/test';

test.describe('Restaurants list page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/restaurants');
  });

  test('renders tab bar with all tabs', async ({ page }) => {
    await expect(page.getByRole('tab', { name: 'All' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'New' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Most Popular' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Open Now' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Map View' })).toBeVisible();
  });

  test('renders filter buttons', async ({ page }) => {
    await expect(page.getByRole('button', { name: /price range/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /distance/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /rating/i })).toBeVisible();
  });

  test('renders restaurant cards', async ({ page }) => {
    await expect(page.locator('.epicure-restaurant-card').first()).toBeVisible();
  });

  test('Most Popular tab sorts by rating descending', async ({ page }) => {
    await page.getByRole('tab', { name: 'Most Popular' }).click();
    await expect(page.getByRole('tab', { name: 'Most Popular' })).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('.epicure-restaurant-card').first()).toBeVisible();
  });

  test('Map View tab shows coming soon message', async ({ page }) => {
    await page.getByRole('tab', { name: 'Map View' }).click();
    await expect(page.getByText(/map view coming soon/i)).toBeVisible();
  });

  test('Rating filter dropdown opens on click', async ({ page }) => {
    await page.getByRole('button', { name: /rating/i }).click();
    await expect(page.locator('.epicure-filter-dropdown')).toBeVisible();
  });
});

test.describe('Restaurant detail page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/restaurants');
    const href = await page.locator('.epicure-restaurant-card').first().getAttribute('href');
    await page.goto(href!);
  });

  test('renders restaurant name', async ({ page }) => {
    await expect(page.locator('.epicure-detail-name')).toBeVisible();
  });

  test('renders hero image', async ({ page }) => {
    await expect(page.locator('.epicure-detail-hero')).toBeVisible();
  });

  test('renders meal time tabs', async ({ page }) => {
    await expect(page.getByRole('tab', { name: 'Breakfast' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Lunch' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Dinner' })).toBeVisible();
  });

  test('clicking Lunch tab switches dish list', async ({ page }) => {
    const lunchTab = page.getByRole('tab', { name: 'Lunch' });
    await expect(lunchTab).toBeVisible();
    await lunchTab.click();
    await expect(lunchTab).toHaveAttribute('aria-selected', 'true');
  });

  test('renders dish cards', async ({ page }) => {
    const dishCards = page.locator('.epicure-dish-card');
    await expect(dishCards.first()).toBeVisible();
  });
});
