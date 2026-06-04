import clsx from 'clsx';
import type { ReactNode } from 'react';

import styles from './Container.module.css';

export type ContainerProps = {
	children: ReactNode;
	className?: string;
};

export function Container({ children, className }: ContainerProps) {
	return <div className={clsx(styles.container, className)}>{children}</div>;
}
