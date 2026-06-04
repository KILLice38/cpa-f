import clsx from 'clsx';
import { getTranslations } from 'next-intl/server';

import { SocialIcon, SocialLink } from '../SocialLink';
import styles from './SocialLinks.module.css';
import type { SocialNetwork } from '../SocialLink';

const HERO_SOCIAL_LINKS: { network: SocialNetwork; href: string }[] = [
	{ network: 'instagram', href: 'https://www.instagram.com/' },
	{ network: 'telegram', href: 'https://t.me/' },
	{ network: 'linkedin', href: 'https://www.linkedin.com/' },
];

type SocialLinksProps = {
	className?: string;
};

export async function SocialLinks({ className }: SocialLinksProps) {
	const t = await getTranslations('SocialLinks');

	return (
		<div className={clsx(styles.container, className)}>
			{HERO_SOCIAL_LINKS.map(({ network, href }) => (
				<SocialLink key={network} href={href} label={t(network)}>
					<SocialIcon network={network} />
				</SocialLink>
			))}
		</div>
	);
}
