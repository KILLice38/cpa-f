'use client';
import { FormDialog } from '../FormDialog';
import styles from './SuccessForm.module.css';

type SuccessFormProps = {
	onClose: () => void;
};

export function SuccessForm({ onClose }: SuccessFormProps) {
	return (
		<FormDialog onClose={onClose} className={styles.form}>
			<div className={styles.content}>
				<h2 className={styles.title}>WE HAVE RECEIVED YOUR APPLICATION!</h2>
				<p className={styles.text}>We will process your request and get in touch with you</p>
			</div>
			<button type="button" className={styles.done} onClick={onClose} aria-label="Close dialog">
				Done
			</button>
		</FormDialog>
	);
}
