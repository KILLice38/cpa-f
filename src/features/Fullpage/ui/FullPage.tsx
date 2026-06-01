'use client';

import clsx from 'clsx';
import { useEffect, useRef, useState, type ReactNode } from 'react';

import { Background, type BackgroundType } from '@/shared/ui';

import styles from './FullPage.module.css';
import { slideAnimations } from '../lib/animations';
import { useFullPage } from '../lib/useFullPage';
import type { SlideAnimations } from '../model/types';

export type Slide = {
	id: string;
	content: ReactNode;
	bgVariant?: BackgroundType;
};

export function FullPage({ slides }: { slides: Slide[] }) {
	const slidesRef = useRef<HTMLElement[]>([]);
	const animationsRef = useRef<SlideAnimations[]>([]);

	// анимации берём из реестра по id слайда; нет записи — будет дефолтный сдвиг
	useEffect(() => {
		animationsRef.current = slides.map((slide) => slideAnimations[slide.id] ?? {});
	});

	const [activeIndex, setActiveIndex] = useState(0);
	const [ready, setReady] = useState(false);

	useFullPage(slidesRef, animationsRef, slides.length, setActiveIndex, setReady);

	const bgVariant = slides[activeIndex]?.bgVariant ?? 'primary';

	return (
		<div className={clsx(styles.root, ready && styles.ready)}>
			<Background type={bgVariant} />

			{slides.map((slide, i) => (
				<div
					key={slide.id}
					ref={(el) => {
						if (el) slidesRef.current[i] = el;
					}}
					className={clsx(styles.slide, i === 0 && styles.firstSlide)}
				>
					{slide.content}
				</div>
			))}
		</div>
	);
}
