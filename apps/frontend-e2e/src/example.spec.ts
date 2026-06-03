import { test, expect } from '@playwright/test';

test('homepage has hero title', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Good food');
});
