'use client';
import Image from 'next/image';

import type { Benefits } from '@/shared/api';
import { snakeBenefitsImg } from '@/shared/assets';
import { Card, Container, RunningRow, Section, SectionTitle } from '@/shared/ui';

import styles from './BenefitsSection.module.css';

export function BenefitsSectionClient({ data }: { data: Benefits | null }) {
	return (
		<Section id="benefits">
			<Container className={styles.container}>
				<SectionTitle className={styles.title} id="benefits-title">
					Multi-Benefits
				</SectionTitle>
				<div className={styles.content}>
					<div className={styles.left} data-benefits-left>
						<h3 className={styles.heading}>{data?.title}</h3>
						<p className={styles.description}>{data?.description}</p>
					</div>
					<RunningRow text="DREAM BIG EARN BIGGER!" className={styles.rowMobile} />
					<Image
						className={styles.snake}
						src={snakeBenefitsImg}
						width={390}
						height={390}
						alt=""
						aria-hidden="true"
						data-benefits-image
					/>
					<ul className={styles.cards} data-benefits-cards>
						{data?.benefits.map((text) => (
							<li key={text}>
								<Card variant="benefit">{text}</Card>
							</li>
						))}
					</ul>
				</div>
			</Container>
			<RunningRow text="DREAM BIG EARN BIGGER!" className={styles.rowDesktop} data-benefits-row />
		</Section>
	);
}
