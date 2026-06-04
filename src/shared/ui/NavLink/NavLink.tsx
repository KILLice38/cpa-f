import clsx from 'clsx';
import type { ComponentProps, ReactNode } from 'react';

import { Link } from '@/shared/i18n';
import { SectionLink } from '@/shared/sectionNav';

import styles from './NavLink.module.css';

type NavLinkProps = {
	to?: string;
	href?: ComponentProps<typeof Link>['href'];
	className?: string;
	children: ReactNode;
};

export function NavLink({ to, href, className, children }: NavLinkProps) {
	const cls = clsx(styles.link, className);

	if (to) {
		return (
			<SectionLink to={to} className={cls}>
				{children}
			</SectionLink>
		);
	}

	return (
		<Link href={href ?? '#'} className={cls}>
			{children}
		</Link>
	);
}
