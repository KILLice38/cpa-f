import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import { type RefObject, useEffect } from 'react';

import type { Direction, SlideAnimations } from '../model/types';

gsap.registerPlugin(Observer);

const DURATION = 1;
const DESKTOP = '(min-width: 768px)';
const REDUCED = '(prefers-reduced-motion: reduce)';

export function useFullPage(
	slidesRef: RefObject<HTMLElement[]>,
	animationRef: RefObject<SlideAnimations[]>,
	count: number,
	onChange: (index: number) => void,
	onReady: (ready: boolean) => void,
) {
	useEffect(() => {
		const slides = slidesRef.current;
		if (slides.length === 0) return;

		const mm = gsap.matchMedia();

		mm.add({ isDesktop: DESKTOP, reduced: REDUCED }, (context) => {
			const { isDesktop, reduced } = context.conditions ?? {};
			if (!isDesktop) return;

			const duration = reduced ? 0 : DURATION;

			gsap.set(slides, { yPercent: (i) => (i === 0 ? 0 : 100) });
			onReady(true);

			let current = 0;
			let animating = false;
			const goTo = (index: number, direction: Direction) => {
				if (index < 0 || index >= count || index === current || animating) return;
				animating = true;

				const leaving = slides[current];
				const entering = slides[index];
				const transition = animationRef.current;

				gsap.set(entering, { yPercent: direction === 1 ? 100 : -100 });

				const tl = gsap.timeline({
					defaults: { duration, ease: 'power2.inOut' },
					onStart: () => onChange(index),
					onComplete: () => {
						current = index;
						animating = false;
					},
				});

				const leave = transition[current]?.leave;
				if (leave) leave(tl, leaving, direction);
				else tl.to(leaving, { yPercent: direction === 1 ? -100 : 100 }, 0);

				const enter = transition[index]?.enter;
				if (enter) enter(tl, entering, direction);
				else tl.to(entering, { yPercent: 0 }, 0);
			};

			const observer = Observer.create({
				target: window,
				type: 'wheel,touch,pointer',
				wheelSpeed: -1,
				tolerance: 10,
				preventDefault: true,
				onUp: () => goTo(current + 1, 1),
				onDown: () => goTo(current - 1, -1),
			});

			return () => observer.kill();
		});

		return () => mm.revert();
	}, [slidesRef, animationRef, count, onChange, onReady]);
}
