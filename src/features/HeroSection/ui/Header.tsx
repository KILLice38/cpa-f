import { getTranslations } from 'next-intl/server';

import { Link } from '@/shared/i18n';
import { Container, LangSwitcher, Logo, MobileMenuButton, NavLink } from '@/shared/ui';

import styles from './Header.module.css';

const NAV_ITEMS = [
	{ key: 'team', href: '#team' },
	{ key: 'benefits', href: '#benefits' },
	{ key: 'joinUs', href: '#join-us' },
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
						{NAV_ITEMS.map(({ key, href }) => (
							<li key={key}>
								<NavLink href={href}>{t(key)}</NavLink>
							</li>
						))}
					</ul>
					<LangSwitcher />
				</nav>

				<MobileMenuButton />
			</Container>
		</header>
	);
}
