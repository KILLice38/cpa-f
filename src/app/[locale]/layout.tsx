import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import { routing } from '@/shared/i18n';
import { LocaleHtml, MobileMenuRoot, PreloaderRoot } from '@/shared/ui';

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
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
		<NextIntlClientProvider>
			<LocaleHtml locale={locale} />
			<MobileMenuRoot>
				<PreloaderRoot>{children}</PreloaderRoot>
			</MobileMenuRoot>
		</NextIntlClientProvider>
	);
}
