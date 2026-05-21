import clsx from 'clsx';
import type { ReactNode } from 'react';

import styles from './SectionTitle.module.css';

export type SectionTitleProps = {
	children: ReactNode;
	className?: string;
};

export function SectionTitle({ children, className }: SectionTitleProps) {
	return (
		<header className={clsx(styles.header, className)}>
			<h2 className={styles.title}>{children}</h2>
		</header>
	);
}
