vi.mock('next-intl', () => ({
	useLocale: vi.fn(),
}));

vi.mock('@/shared/i18n', async () => {
	const { createElement } = await import('react');
	return {
		routing: { locales: ['en', 'ru'] },
		usePathname: vi.fn(),
		Link: ({ href, locale, children, className, 'aria-current': ariaCurrent }: MockLinkProps) =>
			createElement(
				'a',
				{ href, className, 'aria-current': ariaCurrent, 'data-locale': locale },
				children as string,
			),
	};
});

import { render, screen } from '@testing-library/react';
import { useLocale } from 'next-intl';
import type { ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { usePathname } from '@/shared/i18n';

import { LangSwitcher } from './LangSwitcher';

type MockLinkProps = {
	href: string;
	locale: string;
	children?: ReactNode;
	className?: string;
	'aria-current'?: string;
};

function renderSwitcher(locale = 'en', pathname = '/') {
	vi.mocked(useLocale).mockReturnValue(locale);
	vi.mocked(usePathname).mockReturnValue(pathname);
	return render(<LangSwitcher />);
}

describe('LangSwitcher', () => {
	describe('structure', () => {
		it('renders a nav with aria-label="Language selection"', () => {
			renderSwitcher();
			expect(screen.getByRole('navigation', { name: 'Language selection' })).toBeInTheDocument();
		});

		it('renders a link for each locale', () => {
			renderSwitcher();
			expect(screen.getAllByRole('link')).toHaveLength(2);
		});

		it('renders ENG label for en locale', () => {
			renderSwitcher();
			expect(screen.getByText('ENG')).toBeInTheDocument();
		});

		it('renders РУС label for ru locale', () => {
			renderSwitcher();
			expect(screen.getByText('РУС')).toBeInTheDocument();
		});

		it('renders a separator "/" between locales', () => {
			renderSwitcher();
			expect(screen.getByText('/')).toBeInTheDocument();
		});

		it('applies optional className to nav element', () => {
			vi.mocked(useLocale).mockReturnValue('en');
			vi.mocked(usePathname).mockReturnValue('/');
			const { container } = render(<LangSwitcher className="custom" />);
			expect(container.querySelector('nav')?.className).toContain('custom');
		});
	});

	describe('active state', () => {
		it('sets aria-current="true" on the active locale link', () => {
			renderSwitcher('ru');
			const ruLink = screen.getByText('РУС').closest('a');
			expect(ruLink).toHaveAttribute('aria-current', 'true');
		});

		it('does not set aria-current on the inactive locale link', () => {
			renderSwitcher('ru');
			const enLink = screen.getByText('ENG').closest('a');
			expect(enLink).not.toHaveAttribute('aria-current');
		});
	});

	describe('navigation', () => {
		it('passes current pathname as href prop to each Link', () => {
			renderSwitcher('en', '/about');
			screen.getAllByRole('link').forEach((link) => {
				expect(link).toHaveAttribute('href', expect.stringContaining('/about'));
			});
		});

		it('passes correct locale to the en link', () => {
			renderSwitcher();
			expect(screen.getByText('ENG').closest('a')).toHaveAttribute('data-locale', 'en');
		});

		it('passes correct locale to the ru link', () => {
			renderSwitcher();
			expect(screen.getByText('РУС').closest('a')).toHaveAttribute('data-locale', 'ru');
		});
	});
});
