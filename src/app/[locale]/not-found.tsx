import { headers } from 'next/headers';
import Image from 'next/image';
import { hasLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { heroImg } from '@/shared/assets';
import { routing } from '@/shared/i18n';
import { Background, Container } from '@/shared/ui';

import styles from './not-found.module.css';
import { NotFoundButton } from './NotFoundButton';

export default async function NotFound() {
	const headersList = await headers();
	const requested = headersList.get('X-NEXT-INTL-LOCALE');
	const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
	const t = await getTranslations({ locale, namespace: 'NotFound' });
	return (
		<>
			<Background />
			<div className={styles.page}>
				<Container>
					<h1 className={styles.title}>404</h1>
					<NotFoundButton label={t('button')} className={styles.button} />
					<Image
						src={heroImg}
						alt=""
						className={styles.image}
						priority
						sizes="(max-width: 768px) 100vw, 60vw"
					/>
				</Container>
			</div>
		</>
	);
}
