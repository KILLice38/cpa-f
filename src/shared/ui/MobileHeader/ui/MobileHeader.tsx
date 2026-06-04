'use client';
import { useTranslations } from 'next-intl';

import styles from './MobileHeader.module.css';
import { Link } from '../../../i18n';
import { Logo } from '../../Logo';
import { MobileMenuButton } from '../../MobileMenu';

export function MobileHeader() {
	const t = useTranslations('Header');
	return (
		<header className={styles.header}>
			<Link href="/" className={styles.logoLink} aria-label={t('logoAria')}>
				<Logo variant="inverse" size="header" />
			</Link>
			<MobileMenuButton />
		</header>
	);
}
