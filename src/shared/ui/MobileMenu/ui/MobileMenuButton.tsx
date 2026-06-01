'use client';
import { useTranslations } from 'next-intl';

import styles from './MobileMenuButton.module.css';
import { MOBILE_MENU_ID, useMobileMenu } from '../model/MobileMenuContext';

export function MobileMenuButton() {
	const { open, isOpen } = useMobileMenu();
	const t = useTranslations('Header');

	return (
		<button
			type="button"
			className={styles.button}
			onClick={open}
			aria-expanded={isOpen}
			aria-controls={MOBILE_MENU_ID}
			aria-label={t('openMenuAria')}
		>
			{t('menu')}
		</button>
	);
}
