import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import { mainTasksDesktopImg } from '@/shared/assets';

import styles from './BenefitCard.module.css';
import { highlightDescription } from '../lib/highlightDescription';

type BenefitCardProps = {
	description: string;
};

export async function BenefitCard({ description }: BenefitCardProps) {
	const t = await getTranslations('MultiTasksSection');

	return (
		<article className={styles.card}>
			<p className={styles.text}>
				{highlightDescription(description, t('descriptionHighlight'), styles.accent)}
			</p>
			<div className={styles.imageSlot}>
				<Image
					src={mainTasksDesktopImg}
					alt=""
					fill
					className={styles.image}
					sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
				/>
			</div>
		</article>
	);
}
