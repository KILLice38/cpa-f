import clsx from 'clsx';
import type { ComponentProps } from 'react';

import { Link } from '@/shared/i18n';

import styles from './NavLink.module.css';

type NavLinkProps = ComponentProps<typeof Link>;

export function NavLink({ className, children, ...props }: NavLinkProps) {
	return (
		<Link className={clsx(styles.link, className)} {...props}>
			{children}
		</Link>
	);
}
