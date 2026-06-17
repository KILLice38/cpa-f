import gsap from 'gsap';

export function createWordsAnimation(
	profit: HTMLElement,
	growth: HTMLElement,
	skills: HTMLElement,
) {
	const tl = gsap.timeline({
		repeat: -1,
		// paused: true,
	});

	tl.set(profit, {
		yPercent: 0,
	});
	tl.set([growth, skills], {
		yPercent: 100,
	});

	tl.to({}, { duration: 1.5 });
	tl.to(profit, {
		yPercent: -100,
		duration: 0.5,
	});
	tl.fromTo(
		growth,
		{
			yPercent: 100,
		},
		{
			yPercent: 0,
			duration: 0.5,
		},
		'<',
	);

	tl.to({}, { duration: 1.5 });
	tl.to(growth, {
		yPercent: -100,
		duration: 0.5,
	});
	tl.fromTo(
		skills,
		{
			yPercent: 100,
		},
		{
			yPercent: 0,
			duration: 0.5,
		},
		'<',
	);

	tl.to({}, { duration: 1.5 });
	tl.to(skills, {
		yPercent: 100,
		duration: 0.5,
	});
	tl.fromTo(
		profit,
		{
			yPercent: -100,
		},
		{
			yPercent: 0,
			duration: 0.5,
		},
		'<',
	);

	return tl;
}
