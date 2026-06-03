import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import { type RefObject, useEffect } from 'react';

import type { Direction, FullPageApi, SlideAnimations } from '../model/types';

gsap.registerPlugin(Observer);

const DURATION = 1;
const DESKTOP = '(min-width: 768px)';
const REDUCED = '(prefers-reduced-motion: reduce)';

type UseFullPageParams = {
	slidesRef: RefObject<HTMLElement[]>;
	animationsRef: RefObject<SlideAnimations[]>;
	apiRef: RefObject<FullPageApi | null>;
	count: number;
	getInitialIndex: () => number;
	onChange: (index: number) => void;
	onReady: (ready: boolean) => void;
};

export function useFullPage({
	slidesRef,
	animationsRef,
	apiRef,
	count,
	getInitialIndex,
	onChange,
	onReady,
}: UseFullPageParams) {
	useEffect(() => {
		const slides = slidesRef.current;
		if (slides.length === 0) return;

		const mm = gsap.matchMedia();

		mm.add({ isDesktop: DESKTOP, reduced: REDUCED }, (context) => {
			const { isDesktop, reduced } = context.conditions ?? {};
			if (!isDesktop) return;

			const duration = reduced ? 0 : DURATION;

			const start = Math.min(Math.max(getInitialIndex(), 0), count - 1);
			gsap.set(slides, { yPercent: (i) => (i < start ? -100 : i > start ? 100 : 0) });
			onReady(true);
			onChange(start);

			let current = start;
			let animating = false;

			const goTo = (index: number, direction: Direction) => {
				if (index < 0 || index >= count || index === current || animating) return;
				animating = true;

				const leaving = slides[current];
				const entering = slides[index];
				const transition = animationsRef.current;

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

			apiRef.current = {
				goTo: (index) => goTo(index, index > current ? 1 : -1),
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

			const handleKeyDown = (e: KeyboardEvent) => {
				if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;

				const active = document.activeElement;
				if (active?.closest('[role="dialog"], [role="tablist"], [role="listbox"], [aria-haspopup]'))
					return;
				if (active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement) return;

				e.preventDefault();
				if (e.key === 'ArrowDown') goTo(current + 1, 1);
				else goTo(current - 1, -1);
			};

			window.addEventListener('keydown', handleKeyDown);

			return () => {
				observer.kill();
				window.removeEventListener('keydown', handleKeyDown);
				apiRef.current = null;
			};
		});

		return () => mm.revert();
	}, [slidesRef, animationsRef, apiRef, count, getInitialIndex, onChange, onReady]);
}
