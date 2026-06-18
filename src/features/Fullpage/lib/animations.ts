import type { SlideAnimations, SlideTransition } from '../model/types';

const DURATION = 0.6;
const EASE = 'power2.inOut';

const selectHeroElements = (slide: HTMLElement) => ({
	header: slide.querySelector<HTMLElement>('[data-header]'),
	left: slide.querySelector<HTMLElement>('[data-hero-left]'),
	right: slide.querySelector<HTMLElement>('[data-hero-right]'),
	socials: slide.querySelector<HTMLElement>('#hero-socials'),
});

const selectBenefitsElements = (slide: HTMLElement) => ({
	title: slide.querySelector<HTMLElement>('#benefits-title'),
	row: slide.querySelector<HTMLElement>('[data-benefits-row]'),
	left: slide.querySelector<HTMLElement>('[data-benefits-left]'),
	image: slide.querySelector<HTMLElement>('[data-benefits-image]'),
	cards: slide.querySelector<HTMLElement>('[data-benefits-cards]'),
});

const selectMultiplyElements = (slide: HTMLElement) => ({
	title: slide.querySelector<HTMLElement>('#multiply-title'),
	image: slide.querySelector<HTMLElement>('[data-multiply-image]'),
	tabs: slide.querySelector<HTMLElement>('[data-multiply-tabs]'),
	panel: slide.querySelector<HTMLElement>('[data-multiply-panel]'),
	nav: slide.querySelector<HTMLElement>('[data-multiply-nav]'),
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

const benefitsEnter: SlideTransition = (tl, slide) => {
	const { title, row, left, image, cards } = selectBenefitsElements(slide);

	tl.to(slide, { yPercent: 0, duration: 0, ease: EASE });

	tl.add('first');
	tl.add('second', `first+=${DURATION}`);

	if (title) {
		tl.fromTo(
			title,
			{ y: 400, autoAlpha: 0 },
			{ y: 0, autoAlpha: 1, duration: DURATION, ease: EASE },
			'first',
		);
	}

	if (row) {
		tl.fromTo(
			row,
			{ y: 400, autoAlpha: 0 },
			{ y: 0, autoAlpha: 1, duration: DURATION, ease: EASE },
			'first',
		);
	}

	if (left) {
		tl.fromTo(
			left,
			{ xPercent: -130, autoAlpha: 0 },
			{ autoAlpha: 1, xPercent: 0, duration: DURATION, ease: EASE },
			'second',
		);
	}

	if (cards) {
		tl.fromTo(
			cards,
			{ xPercent: 150, autoAlpha: 0 },
			{ autoAlpha: 1, xPercent: 0, duration: DURATION, ease: EASE },
			'second',
		);
	}

	if (image) {
		tl.fromTo(image, { xPercent: 310 }, { xPercent: 0, duration: DURATION, ease: EASE }, 'second');
	}
};

const benefitsLeave: SlideTransition = (tl, slide, direction) => {
	tl.to(slide, { yPercent: direction === 1 ? -100 : 100, duration: DURATION, ease: EASE });
};

const multiplyEnter: SlideTransition = (tl, slide) => {
	const { title, image, tabs, panel, nav } = selectMultiplyElements(slide);

	tl.to(slide, { yPercent: 0, duration: 0, ease: EASE });

	tl.add('first');
	tl.add('second', `first+=${DURATION}`);
	tl.add('nav', `second+=${DURATION}`);

	if (title) {
		tl.fromTo(
			title,
			{ y: 340, autoAlpha: 0 },
			{ y: 0, autoAlpha: 1, duration: DURATION, ease: EASE },
			'first',
		);
	}

	if (image) {
		tl.fromTo(
			image,
			{ y: 340, autoAlpha: 0 },
			{ y: 0, autoAlpha: 1, duration: DURATION, ease: EASE },
			'first',
		);
	}

	if (tabs) {
		tl.fromTo(tabs, { autoAlpha: 0 }, { autoAlpha: 1, duration: DURATION, ease: EASE }, 'second');
	}

	if (panel) {
		tl.fromTo(panel, { autoAlpha: 0 }, { autoAlpha: 1, duration: DURATION, ease: EASE }, 'second');
	}

	if (nav) {
		tl.fromTo(
			nav,
			{ y: 80, autoAlpha: 0 },
			{ y: 0, autoAlpha: 1, duration: DURATION, ease: EASE },
			'nav',
		);
	}
};

const multiplyLeave: SlideTransition = (tl, slide, direction) => {
	tl.to(slide, { yPercent: direction === 1 ? -100 : 100, duration: DURATION, ease: EASE });
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
	benefits: {
		enter: benefitsEnter,
		leave: benefitsLeave,
	},
	'join-us': {
		enter: multiplyEnter,
		leave: multiplyLeave,
	},
	team: {
		enter: teamEnter,
		leave: teamLeave,
	},
};
