'use client';
import clsx from 'clsx';
import { useState } from 'react';

import { Logo } from '@/shared/ui';

import styles from './ApplicationForm.module.css';

const CONTACT_METHODS = ['Instagram', 'Telegram', 'LinkedIn'];

type ApplicationFormProps = {
	onClose: () => void;
};

export function ApplicationForm({ onClose }: ApplicationFormProps) {
	const [isSelectOpen, setIsSelectOpen] = useState(false);

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
			<button type="button" className={styles.close} onClick={onClose}>
				x
			</button>
			<Logo size="form" variant="primary" className={styles.logo} />
			<p className={styles.hint}>
				Fields with an asterisk (<span className={styles.span}>*</span>) are mandatory
			</p>
			<form className={styles.applicationForm} onSubmit={handleSubmit}>
				<div className={styles.fields}>
					<input name="name" type="text" placeholder="Your Name" className={styles.input} />
					<div className={styles.row}>
						<div className={styles.fieldWrap}>
							<div className={styles.selectWrapper}>
								<select
									className={styles.select}
									name="contactMethod"
									defaultValue=""
									required
									onFocus={() => setIsSelectOpen(true)}
									onBlur={() => setIsSelectOpen(false)}
								>
									<option value="" disabled>
										Contact Method
									</option>
									{CONTACT_METHODS.map((m) => (
										<option key={m} value={m}>
											{m}
										</option>
									))}
								</select>
								<span
									className={clsx(styles.selectArrow, isSelectOpen && styles.selectArrowOpen)}
									aria-hidden="true"
								/>
							</div>
						</div>
						<div className={styles.fieldWrap}>
							<input
								name="contact"
								type="text"
								placeholder="Your Contact"
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
