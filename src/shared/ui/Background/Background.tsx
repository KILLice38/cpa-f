import clsx from 'clsx';

import styles from './Background.module.css';

type BackgroundProps = {
	type?: 'hero' | 'tasks';
};

export function Background({ type = 'hero' }: BackgroundProps) {
	return (
		<div className={clsx(styles.background, styles[type])}>
			<div className={clsx(styles.ellipse)} />
			<div className={clsx(styles.ellipse, styles.ellipseRight)} />
		</div>
	);
}
