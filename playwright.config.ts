import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: './e2e',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: 'html',
	expect: {
		toHaveScreenshot: {
			maxDiffPixels: 100,
		},
	},
	use: {
		baseURL: 'http://localhost:3000',
		trace: 'on-first-retry',
		screenshot: 'only-on-failure',
	},
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
		},

		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'], viewport: { width: 1440, height: 900 } },
		},

		{
			name: 'webkit',
			use: { ...devices['Desktop Safari'], viewport: { width: 1440, height: 900 } },
		},
	],

	webServer: {
		command: 'pnpm run dev',
		url: 'http://localhost:3000',
		reuseExistingServer: !process.env.CI,
	},
});
