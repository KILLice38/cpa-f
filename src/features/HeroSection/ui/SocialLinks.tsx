import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import { heroImg } from '@/shared/assets';
import type { SocialNetwork } from '@/shared/ui';
import { Container, SocialIcon, SocialLink } from '@/shared/ui';

import styles from './SocialLinks.module.css';

export const HERO_SOCIAL_LINKS: { network: SocialNetwork; href: string }[] = [
	{ network: 'instagram', href: 'https://www.instagram.com/' },
	{ network: 'telegram', href: 'https://t.me/' },
	{ network: 'linkedin', href: 'https://www.linkedin.com/' },
];

export async function SocialLinks() {
	const t = await getTranslations('SocialLinks');

	return (
		<Container className={styles.container}>
			<div className={styles.root}>
				{HERO_SOCIAL_LINKS.map(({ network, href }) => (
					<SocialLink key={network} href={href} label={t(network)}>
						<SocialIcon network={network} />
					</SocialLink>
				))}
				<Image
					src={heroImg}
					alt=""
					className={styles.image}
					priority
					sizes="(max-width: 768px) 100vw, 60vw"
				/>
			</div>
		</Container>
	);
}
