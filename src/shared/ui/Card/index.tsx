import clsx from 'clsx';

import styles from './index.module.css';

type CardProps =
	| { variant: 'benefit'; children: React.ReactNode }
	| { variant: 'task'; title: string; children: React.ReactNode };

export function Card(props: CardProps) {
	const { variant, children } = props;
	if (variant === 'task') {
		return (
			<div className={clsx(styles.card, styles.cardTask)}>
				<h3 className={styles.title}>{props.title}</h3>
				<p className={styles.text}>{children}</p>
			</div>
		);
	}

	return (
		<div className={clsx(styles.card, styles.cardBenefit)}>
			<p className={styles.textBenefit}>{children}</p>
		</div>
	);
}
