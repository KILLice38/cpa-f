import clsx from 'clsx';
import type { ReactNode } from 'react';

import styles from './SectionTitle.module.css';

export type SectionTitleProps = {
	children: ReactNode;
	className?: string;
	id?: string;
};

export function SectionTitle({ children, className, id }: SectionTitleProps) {
	return (
		<h2 className={clsx(styles.title, className)} id={id}>
			{children}
		</h2>
	);
}
