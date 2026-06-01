import { getTranslations } from 'next-intl/server';

import { Link } from '@/shared/i18n';
import { Container, LangSwitcher, Logo, NavLink } from '@/shared/ui';

import styles from './Header.module.css';

const NAV_ITEMS = [
	{ key: 'team', to: 'team' },
	{ key: 'benefits', to: 'benefits' },
	{ key: 'joinUs', to: 'join-us' },
] as const;

export async function Header() {
	const t = await getTranslations('Header');

	return (
		<header className={styles.header}>
			<Container className={styles.container}>
				<Link href="/" className={styles.logoLink} aria-label={t('logoAria')}>
					<Logo variant="inverse" size="header" />
				</Link>

				<nav className={styles.nav} aria-label={t('navAria')}>
					<ul className={styles.navList}>
						{NAV_ITEMS.map(({ key, to }) => (
							<li key={key}>
								<NavLink to={to}>{t(key)}</NavLink>
							</li>
						))}
					</ul>
					<LangSwitcher />
				</nav>
			</Container>
		</header>
	);
}
