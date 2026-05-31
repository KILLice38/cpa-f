import clsx from 'clsx';

import { Logo } from '../Logo';
import styles from './RunningRow.module.css';

type RunningRowProps = {
	text: string;
	className?: string;
};

export function RunningRow({ text, className }: RunningRowProps) {
	const item = (
		<span className={styles.item}>
			<span className={styles.text}>{text}</span>
			<Logo variant="secondary" size="row" aria-hidden="true" />
		</span>
	);

	return (
		<div className={clsx(styles.root, className)}>
			<div className={styles.inner}>
				<div className={styles.track} aria-hidden="true">
					{item}
					{item}
					{item}
					{item}
				</div>
			</div>
		</div>
	);
}
