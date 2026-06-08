import { test, expect } from '@playwright/test';

test.describe('language switcher', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');
		await page.locator('[class*="ready"]').waitFor();
	});

	test('ENG is active by default', async ({ page }) => {
		const langNav = page.getByRole('navigation', { name: 'Language selection' }).first();
		await expect(langNav.getByRole('link', { name: 'ENG' })).toHaveAttribute(
			'aria-current',
			'true',
		);
		await expect(langNav.getByRole('link', { name: 'РУС' })).not.toHaveAttribute('aria-current');
	});

	test('switching to RU changes URL to /ru', async ({ page }) => {
		const langNav = page.getByRole('navigation', { name: 'Language selection' }).first();
		await langNav.getByRole('link', { name: 'РУС' }).click();
		await expect(page).toHaveURL(/\/ru/);
	});

	test('RU is active on /ru page', async ({ page }) => {
		await page.goto('/ru');
		await page.waitForLoadState('networkidle');
		await page.locator('[class*="ready"]').waitFor();

		const langNav = page.getByRole('navigation', { name: 'Language selection' }).first();
		await expect(langNav.getByRole('link', { name: 'РУС' })).toHaveAttribute(
			'aria-current',
			'true',
		);
		await expect(langNav.getByRole('link', { name: 'ENG' })).not.toHaveAttribute('aria-current');
	});

	test('switching back to ENG goes to /', async ({ page }) => {
		await page.goto('/ru');
		await page.waitForLoadState('networkidle');
		await page.locator('[class*="ready"]').waitFor();

		const langNav = page.getByRole('navigation', { name: 'Language selection' }).first();
		await langNav.getByRole('link', { name: 'ENG' }).click();
		await expect(page).not.toHaveURL(/\/ru/);
	});
});
