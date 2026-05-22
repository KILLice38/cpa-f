import clsx from 'clsx';
import type { ReactNode } from 'react';

import styles from './Header.module.css';

type HeaderProps = {
	children: ReactNode;
	className?: string;
};

export function Header({ children, className }: HeaderProps) {
	return <header className={clsx(styles.header, className)}>{children}</header>;
}
