import { getTranslations } from 'next-intl/server';

import styles from './MobileHeader.module.css';
import { Link } from '../../../i18n';
import { Logo } from '../../Logo';
import { MobileMenuButton } from '../../MobileMenu';

export async function MobileHeader() {
	const t = await getTranslations('Header');
	return (
		<header className={styles.header}>
			<Link href="/" className={styles.logoLink} aria-label={t('logoAria')}>
				<Logo variant="inverse" size="header" />
			</Link>
			<MobileMenuButton />
		</header>
	);
}
