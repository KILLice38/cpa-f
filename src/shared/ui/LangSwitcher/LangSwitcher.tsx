'use client';

import clsx from 'clsx';
import { useLocale } from 'next-intl';
import { Fragment } from 'react';

import { Link, routing, usePathname } from '@/shared/i18n';

import styles from './LangSwitcher.module.css';

const localeLabels: Record<(typeof routing.locales)[number], string> = {
	en: 'ENG',
	ru: 'РУС',
};

type LangSwitcherProps = {
	className?: string;
};

export function LangSwitcher({ className }: LangSwitcherProps) {
	const pathname = usePathname();
	const currentLocale = useLocale();

	return (
		<nav aria-label="Language selection" className={clsx(styles.root, className)}>
			{routing.locales.map((locale, index) => {
				const isActive = locale === currentLocale;

				return (
					<Fragment key={locale}>
						{index > 0 ? (
							<span className={styles.separator} aria-hidden="true">
								/
							</span>
						) : null}
						<Link
							href={pathname}
							locale={locale}
							className={clsx(styles.part, isActive && styles.partActive)}
							aria-current={isActive ? 'true' : undefined}
						>
							{localeLabels[locale]}
						</Link>
					</Fragment>
				);
			})}
		</nav>
	);
}
