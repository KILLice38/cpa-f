import { Section } from '@/shared/ui';

import { Header } from './Header';
import { HeroContent } from './HeroContent';
import { SocialLinks } from './SocialLinks';

export function HeroSection() {
	return (
		<Section>
			<Header />
			<HeroContent />
			<SocialLinks />
		</Section>
	);
}
