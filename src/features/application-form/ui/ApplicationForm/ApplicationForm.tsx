'use client';
import { useTransition, useState } from 'react';

import { Select, type SelectOption } from '@/shared/ui';

import { submitApplication } from '../../actions';
import { FormDialog } from '../FormDialog';
import styles from './ApplicationForm.module.css';

const CONTACT_METHODS: SelectOption[] = [
	{ value: 'Instagram', label: 'Instagram' },
	{ value: 'Telegram', label: 'Telegram' },
	{ value: 'LinkedIn', label: 'LinkedIn' },
];

type ApplicationFormProps = {
	onClose: () => void;
	onSuccess?: () => void;
};

export function ApplicationForm({ onClose, onSuccess }: ApplicationFormProps) {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError(null);
		const data = new FormData(e.currentTarget);

		startTransition(async () => {
			try {
				await submitApplication({
					name: data.get('name') as string,
					contactMethod: data.get('contactMethod') as string,
					contact: data.get('contact') as string,
				});
				onSuccess?.();
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
			}
		});
	};

	return (
		<FormDialog onClose={onClose} className={styles.form}>
			<p className={styles.hint}>
				Fields with an asterisk (<span className={styles.span}>*</span>) are mandatory
			</p>
			<form className={styles.applicationForm} onSubmit={handleSubmit}>
				<div className={styles.fields}>
					<input
						name="name"
						type="text"
						placeholder="Your Name"
						aria-label="Your Name"
						className={styles.input}
						disabled={isPending}
					/>
					<div className={styles.row}>
						<div className={styles.fieldWrap}>
							<Select
								name="contactMethod"
								options={CONTACT_METHODS}
								placeholder="Contact Method"
								required
								disabled={isPending}
							/>
						</div>
						<div className={styles.fieldWrap}>
							<input
								name="contact"
								type="text"
								placeholder="Your Contact"
								aria-label="Your Contact"
								className={styles.input}
								required
								disabled={isPending}
							/>
						</div>
					</div>
				</div>
				{error && <p className={styles.error}>{error}</p>}
				<button type="submit" className={styles.submit} disabled={isPending}>
					{isPending ? 'Sending...' : 'Submit'}
				</button>
			</form>
		</FormDialog>
	);
}
