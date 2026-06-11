import styles from './Preloader.module.css';
import { Background } from '../../Background';
import { Container } from '../../Container';
import { Logo } from '../../Logo';

export function Preloader({ progress }: { progress: number }) {
	return (
		<div data-testid="preloader" className={styles.wrapper}>
			<Background type="primary" />
			<Container className={styles.container}>
				<Logo className={styles.logo} variant="inverse" />
			</Container>
			<div className={styles.overlay}>
				<div className={styles.content}>
					<div id="preloader-counter" className={styles.percent}>
						{progress}%
					</div>
					<div className={styles.bar}>
						<div
							id="preloader-progress"
							className={styles.progress}
							style={{ transform: `translateX(${progress - 100}%)` }}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
