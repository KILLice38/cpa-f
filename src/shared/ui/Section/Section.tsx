import clsx from 'clsx';
import type { ReactNode } from 'react';

import styles from './Section.module.css';

export type SectionProps = {
	className?: string;
	id?: string;
	children: ReactNode;
};

export function Section({ className, id, children }: SectionProps) {
	return (
		<section id={id} className={clsx(styles.section, className)}>
			{children}
		</section>
	);
}
