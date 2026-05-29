import { getTranslations } from 'next-intl/server';

import { Button, Container } from '@/shared/ui';

import styles from './HeroContent.module.css';

export async function HeroContent() {
	const t = await getTranslations('HeroSection');

	return (
		<Container className={styles.container}>
			<div className={styles.content}>
				<h1 className={styles.title}>
					<span>PRACTICE</span>
					<span>
						MAKES
						<span className={styles.titleAccent}> PROFIT</span>
					</span>
				</h1>
				<p className={styles.text}>{t('text')}</p>
				<Button className={styles.button} type="button">
					{t('btn')}
				</Button>
			</div>
		</Container>
	);
}
