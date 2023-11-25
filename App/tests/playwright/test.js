import { expect, test } from '@playwright/test';

test('index page has expected Main Header', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'La Tua Community Universitaria Online' })).toBeVisible();
});
