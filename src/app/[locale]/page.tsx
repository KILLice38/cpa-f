import { setRequestLocale } from 'next-intl/server';
import type { ReactNode } from 'react';

import { BenefitsSection } from '@/features/BenefitsSection';
import { FullPage, FullPageSlide } from '@/features/fullpage';
import { HeroSection } from '@/features/HeroSection';
import { MultiplySection } from '@/features/MultiplySection';
import { MultiTasksSection } from '@/features/MultiTasksSection';
import { type BackgroundType } from '@/shared/ui';

import { HomeClient } from './HomeClient';

type Slide = {
	id: string;
	content: ReactNode;
	bgVariant?: BackgroundType;
};

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
				<FullPage>
					{SLIDES.map(({ id, content, bgVariant }) => (
						<FullPageSlide key={id} id={id} bgVariant={bgVariant}>
							{content}
						</FullPageSlide>
					))}
				</FullPage>
			</HomeClient>
		</main>
	);
}
