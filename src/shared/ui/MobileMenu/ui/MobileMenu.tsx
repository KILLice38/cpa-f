'use client';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';

import { Link } from '@/shared/i18n';

import styles from './MobileMenu.module.css';
import { LangSwitcher } from '../../LangSwitcher';
import { Logo } from '../../Logo';
import { NavLink } from '../../NavLink';
import { SocialLinks } from '../../SocialLinks';
import { MOBILE_MENU_ID, useMobileMenu } from '../model/MobileMenuContext';
import { MOBILE_NAV_ITEMS } from '../model/navitems';

export function MobileMenu() {
	const { isOpen, close } = useMobileMenu();
	const t = useTranslations('Header');
	const closeButtonRef = useRef<HTMLButtonElement>(null);
	const previousFocusRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		document.body.style.overflow = isOpen ? 'hidden' : '';

		return () => {
			document.body.style.overflow = '';
		};
	}, [isOpen]);

	useEffect(() => {
		if (!isOpen) {
			previousFocusRef.current?.focus();
			previousFocusRef.current = null;

			return;
		}

		previousFocusRef.current = document.activeElement as HTMLElement | null;
		closeButtonRef.current?.focus();

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') close();
		};

		window.addEventListener('keydown', onKeyDown);

		return () => window.removeEventListener('keydown', onKeyDown);
	}, [isOpen, close]);

	useEffect(() => {
		if (!isOpen) return;

		const onResize = () => {
			if (window.matchMedia('(min-width: 769px)').matches) {
				close();
			}
		};

		window.addEventListener('resize', onResize);

		return () => window.removeEventListener('resize', onResize);
	}, [isOpen, close]);

	if (!isOpen) return null;

	return (
		<div
			id={MOBILE_MENU_ID}
			className={styles.overlay}
			role="dialog"
			aria-modal="true"
			aria-label={t('navAria')}
		>
			<div className={styles.grid} />
			<div className={styles.ellipse} />
			<div className={clsx(styles.ellipse, styles.ellipseRight)} />
			<div className={styles.topBar}>
				<Link href="/" className={styles.logoLink} aria-label={t('logoAria')} onClick={close}>
					<Logo variant="inverse" size="headerOpen" />
				</Link>
				<button
					type="button"
					ref={closeButtonRef}
					className={styles.closeButton}
					onClick={close}
					aria-label={t('closeAria')}
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
					>
						<path
							d="M5 5L19 19M19 5L5 19"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
						/>
					</svg>
				</button>
			</div>
			<nav className={styles.nav} aria-label={t('navAria')}>
				<ul className={styles.navList}>
					{MOBILE_NAV_ITEMS.map(({ key, href }) => (
						<li key={key}>
							<NavLink href={href} className={styles.navLink} onClick={close}>
								{t(key)}
							</NavLink>
						</li>
					))}
				</ul>
			</nav>
			<SocialLinks className={styles.socials} />
			<LangSwitcher className={styles.langSwitcher} />
		</div>
	);
}
