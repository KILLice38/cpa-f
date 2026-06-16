import { resolve } from 'path';

import { defineConfig, type Plugin } from 'vitest/config';

const serverOnlyMock: Plugin = {
	name: 'mock-server-only',
	resolveId: (id) => (id === 'server-only' ? id : undefined),
	load: (id) => (id === 'server-only' ? '' : undefined),
};

export default defineConfig({
	plugins: [serverOnlyMock],
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: ['@testing-library/jest-dom/vitest'],
		coverage: {
			provider: 'v8',
			include: ['src/**/*.{ts,tsx}'],
			exclude: ['src/app/**', 'src/**/*.d.ts', 'src/tests/**'],
		},
	},
	resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
		},
	},
});
