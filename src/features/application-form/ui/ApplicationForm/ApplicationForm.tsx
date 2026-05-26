'use client';
import { useTransition, useState } from 'react';

import { Select, type SelectOption } from '@/shared/ui';

import styles from './ApplicationForm.module.css';
import { submitApplication } from '../../api';
import { CONTACT_METHODS, validateApplication, type ApplicationErrors } from '../../model';
import { FormDialog } from '../FormDialog';

const CONTACT_OPTIONS: SelectOption[] = CONTACT_METHODS.map((m) => ({ value: m, label: m }));

type ApplicationFormProps = {
	onClose: () => void;
	onSuccess?: () => void;
};

export function ApplicationForm({ onClose, onSuccess }: ApplicationFormProps) {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | null>(null);
	const [fieldErrors, setFieldErrors] = useState<ApplicationErrors>({});

	const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = new FormData(e.currentTarget);

		const name = (data.get('name') as string).trim();
		const contactMethod = data.get('contactMethod') as string;
		const contact = (data.get('contact') as string).trim();

		const errors = validateApplication({ name, contactMethod, contact });
		if (Object.keys(errors).length > 0) {
			setFieldErrors(errors);
			return;
		}

		setFieldErrors({});
		setError(null);

		startTransition(async () => {
			try {
				await submitApplication({ name, contactMethod, contact });
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
			<form className={styles.applicationForm} onSubmit={handleSubmit} noValidate>
				<div className={styles.fields}>
					<input
						name="name"
						type="text"
						placeholder="Your Name"
						aria-label="Your Name"
						className={styles.input}
						maxLength={100}
						disabled={isPending}
					/>
					<div className={styles.row}>
						<div className={styles.column}>
							<div className={styles.fieldWrap}>
								<Select
									name="contactMethod"
									options={CONTACT_OPTIONS}
									placeholder="Contact Method"
									required
									disabled={isPending}
								/>
							</div>
							{fieldErrors.contactMethod && (
								<p className={styles.error}>{fieldErrors.contactMethod}</p>
							)}
						</div>
						<div className={styles.column}>
							<div className={styles.fieldWrap}>
								<input
									name="contact"
									type="text"
									placeholder="Your Contact"
									aria-label="Your Contact"
									className={styles.input}
									minLength={2}
									maxLength={200}
									disabled={isPending}
								/>
							</div>
							{fieldErrors.contact && <p className={styles.error}>{fieldErrors.contact}</p>}
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
