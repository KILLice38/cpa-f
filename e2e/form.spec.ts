import { test, expect, type Page } from '@playwright/test';

test.describe('application form', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');
		await page.locator('[class*="ready"]').waitFor();
	});

	const openForm = async (page: Page) => {
		await page.getByRole('button', { name: 'GET IN TOUCH' }).click();
		await expect(page.getByRole('dialog', { name: 'Submit application' })).toBeVisible();
	};

	const fillAndSubmit = async (page: Page) => {
		await page.getByLabel('Your Name').fill('Playwright Test');
		await page.getByRole('button', { name: 'Contact Method, required' }).click();
		await page.getByRole('option', { name: 'Telegram' }).click();
		await page.getByLabel('Your Contact').fill('@playwright_test');
		await page.getByRole('button', { name: 'Submit' }).click();
	};

	test('opens on GET IN TOUCH click', async ({ page }) => {
		await openForm(page);
	});

	test('closes on close button click', async ({ page }) => {
		await openForm(page);
		await page
			.getByRole('dialog', { name: 'Submit application' })
			.getByRole('button', { name: 'Close' })
			.click();
		await expect(page.getByRole('dialog', { name: 'Submit application' })).not.toBeVisible();
	});

	test('closes on Escape key', async ({ page }) => {
		await openForm(page);
		await page.keyboard.press('Escape');
		await expect(page.getByRole('dialog', { name: 'Submit application' })).not.toBeVisible();
	});

	test('closes on overlay click', async ({ page }) => {
		await openForm(page);
		await page.mouse.click(10, 10);
		await expect(page.getByRole('dialog', { name: 'Submit application' })).not.toBeVisible();
	});

	test('focuses first field on open', async ({ page }) => {
		await openForm(page);
		await expect(
			page
				.getByRole('dialog', { name: 'Submit application' })
				.getByRole('button', { name: 'Close' }),
		).toBeFocused();
	});

	test('shows validation errors on empty submit', async ({ page }) => {
		await openForm(page);
		await page.getByRole('button', { name: 'Submit' }).click();
		const alerts = page.getByRole('alert');
		await expect(alerts.filter({ hasText: 'Select a contact method' })).toBeVisible();
		await expect(alerts.filter({ hasText: 'Contact is required' })).toBeVisible();
	});

	test('validates email format', async ({ page }) => {
		await openForm(page);
		await page.getByRole('button', { name: 'Contact Method, required' }).click();
		await page.getByRole('option', { name: 'Email' }).click();
		await page.getByLabel('Your Contact').fill('notanemail');
		await page.getByRole('button', { name: 'Submit' }).click();
		await expect(
			page.getByRole('alert').filter({ hasText: 'Enter a valid email address' }),
		).toBeVisible();
	});

	test('focus returns to trigger after close', async ({ page }) => {
		await openForm(page);
		await page.keyboard.press('Escape');
		await expect(page.getByRole('button', { name: 'GET IN TOUCH' })).toBeFocused();
	});

	test('shows success screen after valid submit', async ({ page }) => {
		await openForm(page);
		await fillAndSubmit(page);
		await expect(page.getByText('WE HAVE RECEIVED YOUR APPLICATION!')).toBeVisible();
	});

	test('success screen closes on Done click', async ({ page }) => {
		await openForm(page);
		await fillAndSubmit(page);
		await expect(page.getByText('WE HAVE RECEIVED YOUR APPLICATION!')).toBeVisible();
		await page.getByRole('button', { name: 'Close dialog' }).click();
		await expect(page.getByRole('dialog', { name: 'Application received' })).not.toBeVisible();
	});
});
