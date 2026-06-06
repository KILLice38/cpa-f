import type { Metadata } from 'next';
import '../globals.css';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import { fontHalvarBreit, fontStolzl } from '@/shared/fonts';
import { routing } from '@/shared/i18n';
import { MobileMenuRoot, PreloaderRoot } from '@/shared/ui';

export const metadata: Metadata = {
	title: 'CPA-F',
	description: '',
};

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}>) {
	const { locale } = await params;
	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	setRequestLocale(locale);

	return (
		<html lang={locale} className={`${fontHalvarBreit.variable} ${fontStolzl.variable}`}>
			<body>
				<NextIntlClientProvider>
					<MobileMenuRoot>
						<PreloaderRoot>{children}</PreloaderRoot>
					</MobileMenuRoot>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
