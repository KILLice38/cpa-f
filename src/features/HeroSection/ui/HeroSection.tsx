import Image from 'next/image';

import { heroImg } from '@/shared/assets';
import { Section } from '@/shared/ui';

import { Header } from './Header';
import { HeroContent } from './HeroContent';
import styles from './HeroSection.module.css';
import { SocialLinks } from './SocialLinks';

export function HeroSection() {
	return (
		<Section className={styles.section}>
			<Header />
			<HeroContent />
			<SocialLinks />
			<Image
				src={heroImg}
				alt=""
				className={styles.image}
				priority
				sizes="(max-width: 768px) 100vw, 60vw"
			/>
		</Section>
	);
}
