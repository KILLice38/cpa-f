import clsx from 'clsx';
import type { HTMLAttributes } from 'react';

import { Logo } from '../Logo';
import styles from './RunningRow.module.css';

type RunningRowProps = HTMLAttributes<HTMLDivElement> & {
	text: string;
};

export function RunningRow({ text, className, ...rest }: RunningRowProps) {
	const item = (
		<span className={styles.item}>
			<span className={styles.text}>{text}</span>
			<Logo variant="secondary" size="row" aria-hidden="true" />
		</span>
	);

	return (
		<div className={clsx(styles.root, className)} {...rest}>
			<span className="sr-only">{text}</span>
			<div className={styles.inner} aria-hidden="true">
				<div className={styles.track}>
					{item}
					{item}
					{item}
					{item}
				</div>
			</div>
		</div>
	);
}
