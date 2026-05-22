import clsx from 'clsx';
import type { ReactNode } from 'react';

import styles from './SectionTitle.module.css';

export type SectionTitleProps = {
	children: ReactNode;
	className?: string;
};

export function SectionTitle({ children, className }: SectionTitleProps) {
	return <h2 className={clsx(styles.title, className)}>{children}</h2>;
}
