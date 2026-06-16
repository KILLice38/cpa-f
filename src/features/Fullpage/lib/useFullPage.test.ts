vi.mock('gsap', () => ({
	default: {
		registerPlugin: vi.fn(),
		matchMedia: vi.fn(),
		set: vi.fn(),
		timeline: vi.fn(),
	},
}));

vi.mock('gsap/Observer', () => ({
	Observer: { create: vi.fn() },
}));

import { renderHook } from '@testing-library/react';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { useFullPage } from './useFullPage';
import type { FullPageApi, SlideAnimations } from '../model/types';

function setup(opts: { count?: number; initialIndex?: number } = {}) {
	const count = opts.count ?? 3;
	const slides = Array.from({ length: count }, () => document.createElement('div'));
	const slidesRef = { current: slides };
	const animationsRef: { current: SlideAnimations[] } = { current: [] };
	const apiRef: { current: FullPageApi | null } = { current: null };
	const onChange = vi.fn();
	const onReady = vi.fn();
	const getInitialIndex = vi.fn(() => opts.initialIndex ?? 0);

	let capturedTimelineConfig: { onStart?: () => void; onComplete?: () => void } = {};
	const timelineMock = { to: vi.fn().mockReturnThis() };
	const observerMock = { kill: vi.fn() };
	const mmMock = { add: vi.fn(), revert: vi.fn() };

	vi.mocked(gsap).matchMedia.mockReturnValue(
		mmMock as unknown as ReturnType<typeof gsap.matchMedia>,
	);
	vi.mocked(Observer).create.mockReturnValue(
		observerMock as unknown as ReturnType<typeof Observer.create>,
	);
	vi.mocked(gsap).timeline.mockImplementation((config) => {
		capturedTimelineConfig = (config ?? {}) as unknown as typeof capturedTimelineConfig;
		return timelineMock as unknown as ReturnType<typeof gsap.timeline>;
	});

	const { unmount } = renderHook(() =>
		useFullPage({ slidesRef, animationsRef, apiRef, count, getInitialIndex, onChange, onReady }),
	);

	const mmCallback = mmMock.add.mock.calls[0]?.[1] as
		| ((ctx: { conditions: Record<string, boolean> }) => (() => void) | void)
		| undefined;

	const mmCleanup = mmCallback?.({
		conditions: { isTablet: false, isDesktop: true, reduced: false },
	});

	return {
		slides,
		slidesRef,
		animationsRef,
		apiRef,
		onChange,
		onReady,
		getInitialIndex,
		mmMock,
		observerMock,
		timelineMock,
		get timelineConfig() {
			return capturedTimelineConfig;
		},
		teardown: () => {
			mmCleanup?.();
			unmount();
		},
	};
}

let teardown: (() => void) | undefined;

afterEach(() => {
	teardown?.();
	teardown = undefined;
	vi.clearAllMocks();
});

describe('useFullPage', () => {
	describe('empty slides', () => {
		it('skips initialization when slides array is empty', () => {
			const onReady = vi.fn();
			vi.mocked(gsap).matchMedia.mockReturnValue({
				add: vi.fn(),
				revert: vi.fn(),
			} as unknown as ReturnType<typeof gsap.matchMedia>);

			renderHook(() =>
				useFullPage({
					slidesRef: { current: [] },
					animationsRef: { current: [] },
					apiRef: { current: null },
					count: 0,
					getInitialIndex: () => 0,
					onChange: vi.fn(),
					onReady,
				}),
			);

			expect(gsap.matchMedia).not.toHaveBeenCalled();
			expect(onReady).not.toHaveBeenCalled();
		});
	});

	describe('initialization', () => {
		it('calls onReady(true) when desktop matches', () => {
			const s = setup();
			teardown = s.teardown;
			expect(s.onReady).toHaveBeenCalledWith(true);
		});

		it('calls onChange with clamped initial index', () => {
			const s = setup({ initialIndex: 1 });
			teardown = s.teardown;
			expect(s.onChange).toHaveBeenCalledWith(1);
		});

		it('clamps negative initial index to 0', () => {
			const s = setup({ initialIndex: -5 });
			teardown = s.teardown;
			expect(s.onChange).toHaveBeenCalledWith(0);
		});

		it('clamps initial index beyond count to count-1', () => {
			const s = setup({ count: 3, initialIndex: 99 });
			teardown = s.teardown;
			expect(s.onChange).toHaveBeenCalledWith(2);
		});

		it('sets apiRef.current with a goTo method', () => {
			const s = setup();
			teardown = s.teardown;
			expect(typeof s.apiRef.current?.goTo).toBe('function');
		});

		it('skips initialization when neither tablet nor desktop', () => {
			const count = 3;
			const mmMock = { add: vi.fn(), revert: vi.fn() };
			const onReady = vi.fn();
			vi.mocked(gsap).matchMedia.mockReturnValue(
				mmMock as unknown as ReturnType<typeof gsap.matchMedia>,
			);

			const { unmount } = renderHook(() =>
				useFullPage({
					slidesRef: {
						current: Array.from({ length: count }, () => document.createElement('div')),
					},
					animationsRef: { current: [] },
					apiRef: { current: null },
					count,
					getInitialIndex: () => 0,
					onChange: vi.fn(),
					onReady,
				}),
			);
			teardown = unmount;

			const mmCallback = mmMock.add.mock.calls[0]?.[1];
			mmCallback?.({ conditions: { isTablet: false, isDesktop: false, reduced: false } });

			expect(onReady).not.toHaveBeenCalled();
		});
	});

	describe('goTo guards', () => {
		it('ignores navigation to current index', () => {
			const s = setup({ initialIndex: 0 });
			teardown = s.teardown;
			vi.mocked(gsap).timeline.mockClear();

			s.apiRef.current?.goTo(0);

			expect(gsap.timeline).not.toHaveBeenCalled();
		});

		it('ignores navigation to negative index', () => {
			const s = setup();
			teardown = s.teardown;
			vi.mocked(gsap).timeline.mockClear();

			s.apiRef.current?.goTo(-1);

			expect(gsap.timeline).not.toHaveBeenCalled();
		});

		it('ignores navigation to index >= count', () => {
			const s = setup({ count: 3 });
			teardown = s.teardown;
			vi.mocked(gsap).timeline.mockClear();

			s.apiRef.current?.goTo(3);

			expect(gsap.timeline).not.toHaveBeenCalled();
		});

		it('ignores second goTo call while animating', () => {
			const s = setup();
			teardown = s.teardown;

			s.apiRef.current?.goTo(1);
			vi.mocked(gsap).timeline.mockClear();

			s.apiRef.current?.goTo(2);

			expect(gsap.timeline).not.toHaveBeenCalled();
		});

		it('allows goTo after onComplete clears animating flag', () => {
			const s = setup();
			teardown = s.teardown;

			s.apiRef.current?.goTo(1);
			s.timelineConfig.onComplete?.();
			vi.mocked(gsap).timeline.mockClear();

			s.apiRef.current?.goTo(2);

			expect(gsap.timeline).toHaveBeenCalled();
		});
	});

	describe('onChange callback', () => {
		it('calls onChange with target index when timeline starts', () => {
			const s = setup();
			teardown = s.teardown;
			s.onChange.mockClear();

			s.apiRef.current?.goTo(1);
			s.timelineConfig.onStart?.();

			expect(s.onChange).toHaveBeenCalledWith(1);
		});
	});

	describe('animations', () => {
		it('uses default tl.to when no custom leave animation', () => {
			const s = setup();
			teardown = s.teardown;

			s.apiRef.current?.goTo(1);

			expect(s.timelineMock.to).toHaveBeenCalled();
		});

		it('calls custom leave animation instead of default tl.to', () => {
			const s = setup({ count: 3 });
			teardown = s.teardown;
			const leave = vi.fn();
			s.animationsRef.current[0] = { leave };

			s.apiRef.current?.goTo(1);

			expect(leave).toHaveBeenCalledWith(s.timelineMock, s.slides[0], 1);
		});

		it('calls custom enter animation instead of default tl.to', () => {
			const s = setup({ count: 3 });
			teardown = s.teardown;
			const enter = vi.fn();
			s.animationsRef.current[1] = { enter };

			s.apiRef.current?.goTo(1);

			expect(enter).toHaveBeenCalledWith(s.timelineMock, s.slides[1], 1);
		});

		it('does not call default tl.to when both custom animations are provided', () => {
			const s = setup({ count: 3 });
			teardown = s.teardown;
			const leave = vi.fn();
			const enter = vi.fn();
			s.animationsRef.current[0] = { leave };
			s.animationsRef.current[1] = { enter };
			s.timelineMock.to.mockClear();

			s.apiRef.current?.goTo(1);

			expect(s.timelineMock.to).not.toHaveBeenCalled();
		});

		it('sets entering slide yPercent to 100 when moving forward', () => {
			const s = setup({ initialIndex: 0 });
			teardown = s.teardown;
			vi.mocked(gsap).set.mockClear();

			s.apiRef.current?.goTo(1);

			expect(gsap.set).toHaveBeenCalledWith(s.slides[1], { yPercent: 100 });
		});

		it('sets entering slide yPercent to -100 when moving backward', () => {
			const s = setup({ count: 3, initialIndex: 2 });
			teardown = s.teardown;
			vi.mocked(gsap).set.mockClear();

			s.apiRef.current?.goTo(1);

			expect(gsap.set).toHaveBeenCalledWith(s.slides[1], { yPercent: -100 });
		});
	});

	describe('Observer scroll/touch navigation', () => {
		it('onUp navigates to the next slide', () => {
			const s = setup({ initialIndex: 0 });
			teardown = s.teardown;
			s.onChange.mockClear();

			const { onUp } = vi.mocked(Observer).create.mock.calls[0][0] as unknown as {
				onUp: () => void;
			};
			onUp();
			s.timelineConfig.onStart?.();

			expect(s.onChange).toHaveBeenCalledWith(1);
		});

		it('onDown navigates to the previous slide', () => {
			const s = setup({ count: 3, initialIndex: 1 });
			teardown = s.teardown;
			s.onChange.mockClear();

			const { onDown } = vi.mocked(Observer).create.mock.calls[0][0] as unknown as {
				onDown: () => void;
			};
			onDown();
			s.timelineConfig.onStart?.();

			expect(s.onChange).toHaveBeenCalledWith(0);
		});
	});

	describe('keyboard navigation', () => {
		it('ArrowDown navigates to the next slide', () => {
			const s = setup({ initialIndex: 0 });
			teardown = s.teardown;
			s.onChange.mockClear();

			window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
			s.timelineConfig.onStart?.();

			expect(s.onChange).toHaveBeenCalledWith(1);
		});

		it('ArrowUp navigates to the previous slide', () => {
			const s = setup({ count: 3, initialIndex: 1 });
			teardown = s.teardown;
			s.onChange.mockClear();

			window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
			s.timelineConfig.onStart?.();

			expect(s.onChange).toHaveBeenCalledWith(0);
		});

		it('ignores non-arrow keys', () => {
			const s = setup();
			teardown = s.teardown;
			vi.mocked(gsap).timeline.mockClear();

			window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

			expect(gsap.timeline).not.toHaveBeenCalled();
		});

		it('ignores arrow keys when an input is focused', () => {
			const s = setup();
			teardown = s.teardown;
			vi.mocked(gsap).timeline.mockClear();

			const input = document.createElement('input');
			document.body.appendChild(input);
			input.focus();
			window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
			input.remove();

			expect(gsap.timeline).not.toHaveBeenCalled();
		});

		it('ignores arrow keys when focus is inside a dialog', () => {
			const s = setup();
			teardown = s.teardown;
			vi.mocked(gsap).timeline.mockClear();

			const dialog = document.createElement('div');
			dialog.setAttribute('role', 'dialog');
			const btn = document.createElement('button');
			dialog.appendChild(btn);
			document.body.appendChild(dialog);
			btn.focus();
			window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
			dialog.remove();

			expect(gsap.timeline).not.toHaveBeenCalled();
		});
	});

	describe('cleanup', () => {
		it('removes keydown listener so arrow keys no longer navigate after cleanup', () => {
			const s = setup();
			s.teardown();
			vi.mocked(gsap).timeline.mockClear();

			window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

			expect(gsap.timeline).not.toHaveBeenCalled();
		});

		it('nulls apiRef.current when mm callback cleans up', () => {
			const s = setup();
			teardown = s.teardown;

			s.teardown();
			teardown = undefined;

			expect(s.apiRef.current).toBeNull();
		});

		it('kills the Observer when mm callback cleans up', () => {
			const s = setup();

			s.teardown();

			expect(s.observerMock.kill).toHaveBeenCalled();
		});

		it('calls mm.revert on hook unmount', () => {
			const s = setup();
			s.teardown();
			expect(s.mmMock.revert).toHaveBeenCalled();
		});
	});
});
