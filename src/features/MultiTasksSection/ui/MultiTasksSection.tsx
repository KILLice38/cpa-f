import { getTranslations } from 'next-intl/server';

import { getTasks } from '@/shared/api';
import { Container, MobileMenuButton, Section, SectionTitle } from '@/shared/ui';

import styles from './MultiTasksSection.module.css';
import { TasksGrid } from './TasksGrid';

export async function MultiTasksSection() {
	const [{ description, tiles }, t] = await Promise.all([
		getTasks(),
		getTranslations('MultiTasksSection'),
	]);

	return (
		<Section id="team" className={styles.section}>
			<Container className={styles.container}>
				<SectionTitle className={styles.title}>{t('title')}</SectionTitle>
				<TasksGrid description={description} tiles={tiles} />
			</Container>
		</Section>
	);
}
