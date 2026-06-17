'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';

import { heroImg } from '@/shared/assets';
import { useSectionNav } from '@/shared/sectionNav';
import { Container, OpenModalButton, SocialLinks, useLoading } from '@/shared/ui';

import styles from './HeroContent.module.css';
import { createWordsAnimation } from '../lib/animations';

export function HeroContent() {
	const t = useTranslations('HeroSection');

	const profitRef = useRef<HTMLSpanElement>(null);
	const growthRef = useRef<HTMLSpanElement>(null);
	const skillsRef = useRef<HTMLSpanElement>(null);

	const { activeId } = useSectionNav();
	const { isLoaded } = useLoading();

	useEffect(() => {
		if (!isLoaded || activeId !== 'hero') return;

		if (!profitRef.current || !growthRef.current || !skillsRef.current) {
			return;
		}
		const tl = createWordsAnimation(profitRef.current, growthRef.current, skillsRef.current);

		return () => {
			tl.kill();
		};
	}, [isLoaded, activeId]);

	return (
		<Container className={styles.container}>
			<div className={styles.content} data-hero-left>
				<h1 className={styles.title}>
					<span>PRACTICE</span>
					<span className={styles.line}>
						MAKES
						<span className={styles.wordWrapper}>
							<span className={styles.titleAccent} ref={profitRef} data-profit>
								PROFIT
							</span>
							<span className={styles.titleAccent} ref={growthRef} data-growth>
								GROWTH
							</span>
							<span className={styles.titleAccent} ref={skillsRef} data-skills>
								SKILLS
							</span>
						</span>
					</span>
				</h1>
				<p className={styles.text}>{t('text')}</p>
				<OpenModalButton className={styles.button}>{t('btn')}</OpenModalButton>
			</div>
			<Image
				src={heroImg}
				alt=""
				className={styles.image}
				priority
				sizes="(max-width: 768px) 100vw, 60vw"
				data-hero-right
			/>
			<SocialLinks className={styles.socialLinks} id="hero-socials" />
		</Container>
	);
}
