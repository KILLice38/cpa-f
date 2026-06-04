export type Direction = 1 | -1;

export type SlideTransition = (
	tl: gsap.core.Timeline,
	el: HTMLElement,
	direction: Direction,
) => void;

export type SlideAnimations = {
	enter?: SlideTransition;
	leave?: SlideTransition;
};

export type FullPageApi = {
	goTo: (index: number) => void;
};
