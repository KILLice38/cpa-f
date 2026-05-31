import { setRequestLocale } from 'next-intl/server';

import { BenefitsSection } from '@/features';
import { HeroSection } from '@/features/HeroSection';
import { MultiplySection } from '@/features/MultiplySection';
import { MultiTasksSection } from '@/features/MultiTasksSection';
import { Background } from '@/shared/ui';

import { HomeClient } from './HomeClient';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	setRequestLocale(locale);
	return (
		<main>
			<Background />
			<HomeClient>
				<HeroSection />
				<MultiTasksSection />
				<BenefitsSection />
				<MultiplySection />
			</HomeClient>
		</main>
	);
}
