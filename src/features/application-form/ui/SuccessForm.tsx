'use client';
import { Logo } from '@/shared/ui';

import styles from './SuccessForm.module.css';

type SuccessFormProps = {
	onClose: () => void;
};

export function SuccessForm({ onClose }: SuccessFormProps) {
	return (
		<div className={styles.form}>
			<button type="button" className={styles.close} onClick={onClose} aria-label="Close">
				x
			</button>
			<Logo size="form" variant="primary" className={styles.logo} />
			<div className={styles.content}>
				<h2 className={styles.title}>WE HAVE RECEIVED YOUR APPLICATION!</h2>
				<p className={styles.text}>We will process your request and get in touch with you</p>
			</div>
			<button type="button" className={styles.done} onClick={onClose} aria-label="Close dialog">
				Done
			</button>
		</div>
	);
}
