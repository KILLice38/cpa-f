'use client';

import clsx from 'clsx';
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';

import { SectionNavContext } from '@/shared/sectionNav';
import { Background, MobileHeader, useLoading, type BackgroundType } from '@/shared/ui';

import styles from './FullPage.module.css';
import { slideAnimations } from '../lib/animations';
import { useFullPage } from '../lib/useFullPage';
import { useSectionHash } from '../lib/useSectionHash';
import type { FullPageApi, SlideAnimations } from '../model/types';

export type Slide = {
	id: string;
	content: ReactNode;
	bgVariant?: BackgroundType;
};

export function FullPage({ slides }: { slides: Slide[] }) {
	const slidesRef = useRef<HTMLElement[]>([]);
	const animationsRef = useRef<SlideAnimations[]>([]);
	const apiRef = useRef<FullPageApi | null>(null);

	const [activeIndex, setActiveIndex] = useState(0);
	const [ready, setReady] = useState(false);

	const { isLoaded } = useLoading();

	const indexById = useMemo(() => new Map(slides.map((slide, i) => [slide.id, i])), [slides]);

	useEffect(() => {
		animationsRef.current = slides.map((slide) => slideAnimations[slide.id] ?? {});
	});

	const getInitialIndex = useCallback(
		() => indexById.get(window.location.hash.slice(1)) ?? 0,
		[indexById],
	);

	useFullPage({
		slidesRef,
		animationsRef,
		apiRef,
		count: slides.length,
		getInitialIndex,
		onChange: setActiveIndex,
		onReady: setReady,
		isLoaded,
	});

	const goToId = useCallback(
		(id: string) => {
			const index = indexById.get(id);
			if (index === undefined) return;

			if (apiRef.current) {
				apiRef.current.goTo(index);
			} else {
				document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
			}
		},
		[indexById],
	);

	const activeId = slides[activeIndex]?.id ?? '';

	useSectionHash({ activeId, ready, goToId });

	const nav = useMemo(() => ({ goToId, activeId }), [goToId, activeId]);

	const bgVariant = slides[activeIndex]?.bgVariant ?? 'primary';

	return (
		<SectionNavContext.Provider value={nav}>
			<div className={clsx(styles.root, ready && styles.ready)}>
				<Background type={bgVariant} />
				<MobileHeader />
				{slides.map((slide, i) => (
					<div
						key={slide.id}
						ref={(el) => {
							if (el) slidesRef.current[i] = el;
						}}
						className={styles.slide}
						inert={(ready && i !== activeIndex) || undefined}
					>
						{slide.content}
					</div>
				))}
			</div>
		</SectionNavContext.Provider>
	);
}
