import clsx from 'clsx';
import type { ReactNode } from 'react';

import { Link } from '@/shared/i18n';

import styles from './SocialLink.module.css';

type SocialLinkProps = {
	href: string;
	label: string;
	children: ReactNode;
	className?: string;
};

export function SocialLink({ href, label, children, className }: SocialLinkProps) {
	return (
		<Link
			href={href}
			className={clsx(styles.link, className)}
			target="_blank"
			rel="noopener noreferrer"
			aria-label={label}
		>
			{children}
		</Link>
	);
}
