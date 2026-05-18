import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier';
import boundaries from 'eslint-plugin-boundaries';

const eslintConfig = defineConfig([
	...nextVitals,
	...nextTs,
	// Override default ignores of eslint-config-next.
	{
		rules: {
			'import/no-cycle': 'error',
			'import/no-duplicates': 'error',
			'import/order': [
				'warn',
				{
					groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
					pathGroups: [{ pattern: '@/**', group: 'internal', position: 'before' }],
					pathGroupsExcludedImportTypes: ['builtin'],
					'newlines-between': 'always',
					alphabetize: { order: 'asc', caseInsensitive: true },
				},
			],
		},
	},
	{
		files: ['src/**/*'],
		rules: {
			'import/no-internal-modules': [
				'warn',
				{
					allow: [
						'@/features/*',
						'@/entities/*',
						'@/shared/*',
						'@/app/**',
						'next/**',
						'react-dom/**',
					],
				},
			],
		},
	},
	{
		plugins: { boundaries },
		settings: {
			'boundaries/elements': [
				{ type: 'app', pattern: 'src/app/**' },
				{ type: 'features', pattern: 'src/features/**' },
				{ type: 'entities', pattern: 'src/entities/**' },
				{ type: 'shared', pattern: 'src/shared/**' },
			],
		},
		rules: {
			'boundaries/dependencies': [
				'error',
				{
					default: 'disallow',
					rules: [
						{ from: { type: 'app' },      allow: [{ to: { type: 'features' } }, { to: { type: 'entities' } }, { to: { type: 'shared' } }] },
						{ from: { type: 'features' }, allow: [{ to: { type: 'entities' } }, { to: { type: 'shared' } }] },
						{ from: { type: 'entities' }, allow: [{ to: { type: 'shared' } }] },
						{ from: { type: 'shared' },   allow: [] },
					],
				},
			],
		},
	},
	{
		rules: {
			'no-restricted-imports': [
				'error',
				{
					paths: [
						{
							name: 'next/link',
							message: 'Use Link from @/shared/i18n/navigation',
						},
						{
							name: 'next/navigation',
							importNames: ['useRouter', 'usePathname', 'redirect'],
							message: 'Use from @/shared/i18n/navigation',
						},
					],
				},
			],
		},
	},
	{
		rules: {
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{ argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
			],
			'@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
		},
	},
	prettier,
	globalIgnores([
		// Default ignores of eslint-config-next:
		'.next/**',
		'out/**',
		'build/**',
		'next-env.d.ts',
	]),
]);

export default eslintConfig;
