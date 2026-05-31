import { Section } from '@/shared/ui';

import { Header } from './Header';
import { HeroContent } from './HeroContent';
import styles from './HeroSection.module.css';

export function HeroSection() {
	return (
		<Section className={styles.section}>
			<Header />
			<HeroContent />
		</Section>
	);
}
