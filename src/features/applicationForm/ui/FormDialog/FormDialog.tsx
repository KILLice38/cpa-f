'use client';
import clsx from 'clsx';

import { Logo } from '@/shared/ui';

import styles from './FormDialog.module.css';

type FormDialogProps = {
	onClose: () => void;
	children: React.ReactNode;
	className?: string;
};

export function FormDialog({ onClose, children, className }: FormDialogProps) {
	return (
		<div className={clsx(styles.shell, className)}>
			<button type="button" className={styles.close} onClick={onClose} aria-label="Close">
				x
			</button>
			<Logo size="form" variant="primary" className={styles.logo} />
			{children}
		</div>
	);
}
