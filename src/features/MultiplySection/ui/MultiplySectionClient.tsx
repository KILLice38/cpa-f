'use client';

import Image from 'next/image';

import type { Multiply } from '@/shared/api';
import { multiplyImg } from '@/shared/assets';
import { Arrow, Container, NavLink, Section, SectionTitle } from '@/shared/ui';

import styles from './MultiplySection.module.css';
import { MultiplyTabs } from './MultiplyTabs';

interface MultiplySectionClientProps {
	tabs: Multiply[];
	buttonLabels: string[];
	scrollToTopLabel: string;
}

export function MultiplySectionClient({
	tabs,
	buttonLabels,
	scrollToTopLabel,
}: MultiplySectionClientProps) {
	return (
		<Section id="join-us" className={styles.section}>
			<Container className={styles.container}>
				<SectionTitle className={styles.title}>Multiply With Us</SectionTitle>
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
				<footer className={styles.footer}>
					<nav className={styles.nav}>
						<div className={styles.socials}>
							<NavLink href={'#'}>Instagram</NavLink>
							<NavLink href={'#'}>Telegram</NavLink>
							<NavLink href={'#'}>Linkedin</NavLink>
						</div>
						<NavLink href={'#'} className={styles.navToTop}>
							{scrollToTopLabel} <Arrow color="inverse" className={styles.navArrow} />
						</NavLink>
					</nav>
				</footer>
			</Container>
		</Section>
	);
}
