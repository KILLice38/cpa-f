import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import { getMultiply } from '@/shared/api';
import { multiplyImg } from '@/shared/assets';
import { Arrow, Container, NavLink, Section, SectionTitle } from '@/shared/ui';

import styles from './MultiplySection.module.css';
import { MultiplyTabs } from './MultiplyTabs';

export async function MultiplySection() {
	const [tabs, t] = await Promise.all([
		getMultiply().catch(() => []),
		getTranslations('MultiplySection'),
	]);

	const buttonLabels = [t('button_0'), t('button_1'), t('button_2')];

	return (
		<Section className={styles.section}>
			<Container className={styles.container}>
				<SectionTitle>Multiply With Us</SectionTitle>
				<div className={styles.layout}>
					<MultiplyTabs tabs={tabs} buttonLabels={buttonLabels} />
				</div>
				<Image
					src={multiplyImg}
					width={630}
					height={360}
					alt=""
					aria-hidden="true"
					className={styles.image}
				/>
				<nav className={styles.nav}>
					<div className={styles.socials}>
						<NavLink href={'#'}>Instagram</NavLink>
						<NavLink href={'#'}>Telegram</NavLink>
						<NavLink href={'#'}>Linkedin</NavLink>
					</div>
					<NavLink href={'#'} className={styles.navToTop}>
						{t('scrollToTop')} <Arrow color="inverse" className={styles.navArrow} />
					</NavLink>
				</nav>
			</Container>
		</Section>
	);
}
