import { getTranslations } from 'next-intl/server';

import { getMultiply } from '@/shared/api';

import { MultiplySectionClient } from './MultiplySectionClient';

export async function MultiplySection() {
	const [tabs, t] = await Promise.all([
		getMultiply().catch(() => []),
		getTranslations('MultiplySection'),
	]);

	return (
		<MultiplySectionClient
			tabs={tabs}
			buttonLabels={[t('button_0'), t('button_1'), t('button_2')]}
			scrollToTopLabel={t('scrollToTop')}
		/>
	);
}
