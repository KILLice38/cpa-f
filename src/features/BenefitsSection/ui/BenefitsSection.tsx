import Image from 'next/image';

import { getBenefits } from '@/shared/api';
import { snakeBenefitsImg } from '@/shared/assets';
import { Card, Container, Section, SectionTitle, RunningRow } from '@/shared/ui';

import styles from './BenefitsSection.module.css';

export async function BenefitsSection() {
	const data = await getBenefits().catch(() => null);

	return (
		<Section>
			<Container className={styles.container}>
				<SectionTitle>Multi-Benefits</SectionTitle>
				<div className={styles.content}>
					<div className={styles.left}>
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
					/>
					<ul className={styles.cards}>
						{data?.benefits.map((text, i) => (
							<li key={i}>
								<Card variant="benefit">{text}</Card>
							</li>
						))}
					</ul>
				</div>
			</Container>
			<RunningRow text="DREAM BIG EARN BIGGER!" className={styles.rowDesktop} />
		</Section>
	);
}
