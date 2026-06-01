import { setRequestLocale } from 'next-intl/server';

import { BenefitsSection } from '@/features/BenefitsSection';
import { FullPage, type Slide } from '@/features/Fullpage';
import { HeroSection } from '@/features/HeroSection';
import { MultiplySection } from '@/features/MultiplySection';
import { MultiTasksSection } from '@/features/MultiTasksSection';

import { HomeClient } from './HomeClient';

const SLIDES: Slide[] = [
	{ id: 'hero', content: <HeroSection /> },
	{ id: 'tasks', content: <MultiTasksSection />, bgVariant: 'secondary' },
	{ id: 'benefits', content: <BenefitsSection /> },
	{ id: 'multiply', content: <MultiplySection /> },
];

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	setRequestLocale(locale);

	return (
		<main>
			<HomeClient>
				<FullPage slides={SLIDES} />
			</HomeClient>
		</main>
	);
}
