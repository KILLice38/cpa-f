import Image from 'next/image';

import { getMultiply } from '@/shared/api';
import { multiplyImg } from '@/shared/assets';
import { Arrow, Container, NavLink, Section, SectionTitle } from '@/shared/ui';

import styles from './MultiplySection.module.css';
import { MultiplyTabs } from './MultiplyTabs';

export async function MultiplySection() {
	const tabs = await getMultiply().catch(() => []);

	return (
		<Section className={styles.section}>
			<Container className={styles.container}>
				<SectionTitle>Multiply With Us</SectionTitle>
				<div className={styles.layout}>
					<MultiplyTabs tabs={tabs} />
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
						Scroll To Top <Arrow color="inverse" className={styles.navArrow} />
					</NavLink>
				</nav>
			</Container>
		</Section>
	);
}
