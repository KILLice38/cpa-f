import { test, expect } from '@playwright/test';

const SECTIONS = ['hero', 'team', 'benefits', 'join-us'];

test('homepage loads', async ({ page }) => {
	await page.goto('/');
	await expect(page).toHaveTitle(/CPA/);
});

for (const section of SECTIONS) {
	test(`screenshot: ${section}`, async ({ page }) => {
		await page.goto(`/#${section}`);
		await page.waitForLoadState('networkidle');
		await page.locator('[class*="ready"]').waitFor();
		await page.getByTestId('preloader').waitFor({
			state: 'detached',
		});
		await page.evaluate(
			() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))),
		);
		await expect(page).toHaveScreenshot(`${section}.png`);
	});
}
