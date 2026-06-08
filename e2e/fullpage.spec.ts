import { test, expect } from '@playwright/test';

const NAV_TIMEOUT = 2000;

test.describe('fullpage navigation', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');
		await page.locator('[class*="ready"]').waitFor();
		await page.evaluate(
			() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))),
		);
	});

	test('initial slide is hero', async ({ page }) => {
		await expect(page).toHaveURL('/#hero');
	});

	test('wheel down goes to next section', async ({ page }) => {
		await page.mouse.wheel(0, 300);
		await page.waitForFunction(() => window.location.hash === '#team');
	});

	test('wheel down twice reaches benefits', async ({ page }) => {
		await page.mouse.wheel(0, 300);
		await page.waitForFunction(() => window.location.hash === '#team');
		await page.waitForTimeout(NAV_TIMEOUT);
		await page.mouse.wheel(0, 300);
		await page.waitForFunction(() => window.location.hash === '#benefits');
	});

	test('wheel up from team goes back to hero', async ({ page }) => {
		await page.mouse.wheel(0, 300);
		await page.waitForFunction(() => window.location.hash === '#team');
		await page.waitForTimeout(NAV_TIMEOUT);
		await page.mouse.wheel(0, -300);
		await page.waitForFunction(() => window.location.hash === '#hero');
	});

	test('keyboard arrow down navigates forward', async ({ page }) => {
		await page.keyboard.press('ArrowDown');
		await page.waitForFunction(() => window.location.hash === '#team');
	});

	test('keyboard arrow up navigates backward', async ({ page }) => {
		await page.mouse.wheel(0, 300);
		await page.waitForFunction(() => window.location.hash === '#team');
		await page.waitForTimeout(NAV_TIMEOUT);
		await page.keyboard.press('ArrowUp');
		await page.waitForFunction(() => window.location.hash === '#hero');
	});
});
