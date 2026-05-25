'use client';
import { Logo, Select, type SelectOption } from '@/shared/ui';

import styles from './ApplicationForm.module.css';

const CONTACT_METHODS: SelectOption[] = [
	{ value: 'Instagram', label: 'Instagram' },
	{ value: 'Telegram', label: 'Telegram' },
	{ value: 'LinkedIn', label: 'LinkedIn' },
];

type ApplicationFormProps = {
	onClose: () => void;
};

export function ApplicationForm({ onClose }: ApplicationFormProps) {
	const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		console.log({
			name: data.get('name'),
			contactMethod: data.get('contactMethod'),
			contact: data.get('contact'),
		});
		// TODO: Api call
	};

	return (
		<div className={styles.form}>
			<button type="button" className={styles.close} onClick={onClose} aria-label="Close">
				x
			</button>
			<Logo size="form" variant="primary" className={styles.logo} />
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
					/>
					<div className={styles.row}>
						<div className={styles.fieldWrap}>
							<Select
								name="contactMethod"
								options={CONTACT_METHODS}
								placeholder="Contact Method"
								required
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
							/>
						</div>
					</div>
				</div>
				<button type="submit" className={styles.submit}>
					Submit
				</button>
			</form>
		</div>
	);
}
