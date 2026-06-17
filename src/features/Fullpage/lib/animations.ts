import type { SlideAnimations, SlideTransition } from '../model/types';

const DURATION = 0.6;
const EASE = 'power2.inOut';

const selectHeroElements = (slide: HTMLElement) => ({
	header: slide.querySelector<HTMLElement>('[data-header]'),
	left: slide.querySelector<HTMLElement>('[data-hero-left]'),
	right: slide.querySelector<HTMLElement>('[data-hero-right]'),
	socials: slide.querySelector<HTMLElement>('#hero-socials'),
});

const selectTeamElements = (slide: HTMLElement) => {
	const title = slide.querySelector<HTMLElement>('#multi-tasks-title');
	const grid = slide.querySelector<HTMLElement>('[data-multi-grid]');
	const mainCard = grid?.querySelector<HTMLElement>(':scope > *:first-child');
	const extraCards = grid
		? Array.from(grid.querySelectorAll<HTMLElement>(':scope > *:nth-child(n+2)'))
		: [];
	return { title, mainCard, extraCards };
};

const heroEnter: SlideTransition = (tl, slide) => {
	const { header, left, right, socials } = selectHeroElements(slide);

	tl.to(slide, { yPercent: 0, duration: 0, ease: EASE });

	tl.add('content');

	if (header) {
		tl.fromTo(
			header,
			{ yPercent: 0, autoAlpha: 0 },
			{ autoAlpha: 1, duration: DURATION, ease: EASE },
			'content',
		);
	}

	if (right) {
		tl.fromTo(
			right,
			{ xPercent: 0, autoAlpha: 0 },
			{ autoAlpha: 1, duration: DURATION, ease: EASE },
			'content',
		);
	}

	if (left) {
		tl.fromTo(
			left,
			{ xPercent: -100, autoAlpha: 0 },
			{ xPercent: 0, autoAlpha: 1, duration: DURATION, ease: EASE },
			'content',
		);
	}

	if (socials) {
		tl.fromTo(
			socials,
			{ xPercent: 0, yPercent: 100, autoAlpha: 0 },
			{ yPercent: 0, autoAlpha: 1, duration: DURATION, ease: EASE },
			'content',
		);
	}
};

const heroLeave: SlideTransition = (tl, slide, direction) => {
	const { header, left, right, socials } = selectHeroElements(slide);

	tl.add('leave');

	if (header) {
		tl.to(header, { yPercent: -100, autoAlpha: 0, duration: DURATION, ease: EASE }, 'leave');
	}

	if (left) {
		tl.to(left, { xPercent: -100, autoAlpha: 0, duration: DURATION, ease: EASE }, 'leave');
	}

	if (socials) {
		tl.to(socials, { xPercent: -100, autoAlpha: 0, duration: DURATION, ease: EASE }, 'leave');
	}

	if (right) {
		tl.to(right, { xPercent: 100, autoAlpha: 0, duration: DURATION, ease: EASE }, 'leave');
	}

	tl.to(slide, { yPercent: direction === 1 ? -100 : 100, duration: 0, ease: EASE }, '>');
};

const teamEnter: SlideTransition = (tl, slide) => {
	const { title, mainCard, extraCards } = selectTeamElements(slide);

	tl.to(slide, { yPercent: 0, duration: 0, ease: EASE });

	tl.add('first');
	tl.add('second', `first+=${DURATION}`);
	tl.add('third', `second+=${DURATION}`);

	if (title) {
		tl.fromTo(
			title,
			{ yPercent: -100, autoAlpha: 0 },
			{ yPercent: 0, autoAlpha: 1, duration: DURATION, ease: EASE },
			'first',
		);
	}

	if (mainCard) {
		tl.fromTo(
			mainCard,
			{ xPercent: -100, autoAlpha: 0 },
			{ xPercent: 0, autoAlpha: 1, duration: DURATION, ease: EASE },
			'first',
		);
	}

	if (extraCards.length) {
		tl.fromTo(
			extraCards.slice(0, 2),
			{ xPercent: 100, autoAlpha: 0 },
			{ xPercent: 0, autoAlpha: 1, duration: DURATION, ease: EASE },
			'second',
		);

		tl.fromTo(
			extraCards.slice(2),
			{ xPercent: 100, autoAlpha: 0 },
			{ xPercent: 0, autoAlpha: 1, duration: DURATION, ease: EASE },
			'third',
		);
	}
};

const teamLeave: SlideTransition = (tl, slide, direction) => {
	tl.to(slide, { yPercent: direction === 1 ? -100 : 100, duration: DURATION, ease: EASE });
};

export const slideAnimations: Record<string, SlideAnimations> = {
	hero: {
		enter: heroEnter,
		leave: heroLeave,
	},
	team: {
		enter: teamEnter,
		leave: teamLeave,
	},
};
