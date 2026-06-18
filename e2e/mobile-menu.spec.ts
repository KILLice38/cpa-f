import { test, expect } from '@playwright/test';

test.describe('mobile menu', () => {
	test.use({ viewport: { width: 768, height: 900 } });

	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');
	});

	test('open button is visible', async ({ page }) => {
		await expect(page.getByRole('button', { name: 'Open menu' })).toBeVisible();
	});
	test('opens on button click', async ({ page }) => {
		await page.getByRole('button', { name: 'Open menu' }).click();
		await expect(page.getByRole('dialog')).toBeVisible();
	});

	test('aria-expanded reflects open state', async ({ page }) => {
		const button = page.getByRole('button', { name: 'Open menu' });
		await expect(button).toHaveAttribute('aria-expanded', 'false');
		await button.click();
		await expect(button).toHaveAttribute('aria-expanded', 'true');
	});

	test('closes on close button click', async ({ page }) => {
		await page.getByRole('button', { name: 'Open menu' }).click();
		await expect(page.getByRole('dialog')).toBeVisible();
		await page.getByRole('button', { name: 'Close menu' }).click();
		await expect(page.getByRole('dialog')).not.toBeVisible();
	});

	test('closes on Escape key', async ({ page }) => {
		await page.getByRole('button', { name: 'Open menu' }).click();
		await expect(page.getByRole('dialog')).toBeVisible();
		await page.keyboard.press('Escape');
		await expect(page.getByRole('dialog')).not.toBeVisible();
	});

	test('closes on nav link click', async ({ page }) => {
		await page.getByRole('button', { name: 'Open menu' }).click();
		await page.getByRole('link', { name: 'TEAM' }).click();
		await expect(page.getByRole('dialog')).not.toBeVisible();
	});

	test('focus moves to close button on open', async ({ page }) => {
		await page.getByRole('button', { name: 'Open menu' }).click();
		await expect(page.getByRole('button', { name: 'Close menu' })).toBeFocused();
	});

	test('focus returns to open button after close', async ({ page }) => {
		await page.getByRole('button', { name: 'Open menu' }).click();
		await page.keyboard.press('Escape');
		await expect(page.getByRole('dialog')).not.toBeVisible();
		await expect(page.getByRole('button', { name: 'Open menu' })).toBeFocused();
	});

	test('closes on resize to desktop', async ({ page }) => {
		await page.getByRole('button', { name: 'Open menu' }).click();
		await expect(page.getByRole('dialog')).toBeVisible();
		await page.setViewportSize({ width: 1440, height: 900 });
		await expect(page.getByRole('dialog')).not.toBeVisible();
	});
});
