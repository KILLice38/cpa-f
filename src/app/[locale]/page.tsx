import { setRequestLocale } from 'next-intl/server';

import { BenefitsSection } from '@/features';
import { MultiplySection } from '@/features/MultiplySection';

import { HomeClient } from './HomeClient';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	setRequestLocale(locale);
	return (
		<main>
			<HomeClient>
				<BenefitsSection />
				<MultiplySection />
			</HomeClient>
		</main>
	);
}
