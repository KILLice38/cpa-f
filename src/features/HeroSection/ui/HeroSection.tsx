import { Section } from '@/shared/ui';

import { Header } from './Header';
import { HeroContent } from './HeroContent';
import styles from './HeroSection.module.css';

export function HeroSection() {
	return (
		<Section id="hero" className={styles.section}>
			<Header />
			<HeroContent />
		</Section>
	);
}
