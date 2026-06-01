'use client';

import clsx from 'clsx';
import { Children, isValidElement, useEffect, useRef, useState, type ReactElement } from 'react';

import { Background } from '@/shared/ui';

import styles from './FullPage.module.css';
import type { FullPageSlideProps } from './FullPageSlide';
import { slideAnimations } from '../lib/animations';
import { useFullPage } from '../lib/useFullPage';
import type { SlideAnimations } from '../model/types';

export function FullPage({ children }: { children: React.ReactNode }) {
	const slideEls = Children.toArray(children).filter(
		isValidElement,
	) as ReactElement<FullPageSlideProps>[];

	const slidesRef = useRef<HTMLElement[]>([]);
	const animationsRef = useRef<SlideAnimations[]>([]);

	useEffect(() => {
		animationsRef.current = slideEls.map(({ props }) => slideAnimations[props.id] ?? {});
	});

	const [activeIndex, setActiveIndex] = useState(0);
	const [ready, setReady] = useState(false);

	useFullPage(slidesRef, animationsRef, slideEls.length, setActiveIndex, setReady);

	const bgVariant = slideEls[activeIndex]?.props.bgVariant ?? 'primary';

	return (
		<div className={clsx(styles.root, ready && styles.ready)}>
			<Background type={bgVariant} />

			{slideEls.map((slide, i) => (
				<div
					key={slide.props.id}
					ref={(el) => {
						if (el) slidesRef.current[i] = el;
					}}
					className={clsx(styles.slide, i === 0 && styles.firstSlide)}
				>
					{slide.props.children}
				</div>
			))}
		</div>
	);
}
