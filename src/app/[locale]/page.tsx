import { setRequestLocale } from 'next-intl/server';

import { MultiplySection } from '@/features/MultiplySection';

import { HomeClient } from './HomeClient';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	setRequestLocale(locale);
	return (
		<main>
			<HomeClient />
			<MultiplySection />
		</main>
	);
}
