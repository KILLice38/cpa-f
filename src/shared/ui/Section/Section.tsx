import clsx from 'clsx';
import type { ReactNode } from 'react';

import styles from './Section.module.css';

export type SectionProps = {
	className?: string;
	children: ReactNode;
};

export function Section({ className, children }: SectionProps) {
	return <section className={clsx(styles.section, className)}>{children}</section>;
}
