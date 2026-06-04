import clsx from 'clsx';

import styles from './Background.module.css';

export type BackgroundType = 'primary' | 'secondary';

type BackgroundProps = {
	type?: BackgroundType;
};

export function Background({ type = 'primary' }: BackgroundProps) {
	return (
		<div className={clsx(styles.background, styles[type])}>
			<div className={clsx(styles.ellipse)} />
			<div className={clsx(styles.ellipse, styles.ellipseRight)} />
		</div>
	);
}
