import { getTranslations } from 'next-intl/server';

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
			</div>
		</Container>
	);
}
