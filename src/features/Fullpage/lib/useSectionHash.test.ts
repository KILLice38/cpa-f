import { renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { useSectionHash } from './useSectionHash';

afterEach(() => {
	window.location.hash = '';
	vi.clearAllMocks();
});

describe('useSectionHash', () => {
	describe('hashchange listener', () => {
		it('calls goToId with the section id when hash changes', () => {
			const goToId = vi.fn();
			renderHook(() => useSectionHash({ activeId: 'hero', ready: true, goToId }));

			window.location.hash = '#benefits';
			window.dispatchEvent(new Event('hashchange'));

			expect(goToId).toHaveBeenCalledWith('benefits');
		});

		it('re-registers the listener when goToId reference changes', () => {
			const goToId1 = vi.fn();
			const goToId2 = vi.fn();

			const { rerender } = renderHook(
				({ goToId }) => useSectionHash({ activeId: 'hero', ready: true, goToId }),
				{
					initialProps: { goToId: goToId1 },
				},
			);

			rerender({ goToId: goToId2 });

			window.location.hash = '#team';
			window.dispatchEvent(new Event('hashchange'));

			expect(goToId1).not.toHaveBeenCalled();
			expect(goToId2).toHaveBeenCalledWith('team');
		});

		it('calls goToId with empty string when hash is cleared', () => {
			const goToId = vi.fn();
			renderHook(() => useSectionHash({ activeId: 'hero', ready: true, goToId }));

			window.location.hash = '';
			window.dispatchEvent(new Event('hashchange'));

			expect(goToId).toHaveBeenCalledWith('');
		});

		it('removes the hashchange listener on unmount', () => {
			const goToId = vi.fn();
			const { unmount } = renderHook(() =>
				useSectionHash({ activeId: 'hero', ready: true, goToId }),
			);

			unmount();

			window.dispatchEvent(new Event('hashchange'));

			expect(goToId).not.toHaveBeenCalled();
		});
	});

	describe('hash sync', () => {
		it('updates location hash when activeId changes and ready is true', () => {
			const replaceState = vi.spyOn(window.history, 'replaceState');

			renderHook(() => useSectionHash({ activeId: 'team', ready: true, goToId: vi.fn() }));

			expect(replaceState).toHaveBeenCalledWith(null, '', '#team');
		});

		it('does not update hash when ready is false', () => {
			const replaceState = vi.spyOn(window.history, 'replaceState');

			renderHook(() => useSectionHash({ activeId: 'team', ready: false, goToId: vi.fn() }));

			expect(replaceState).not.toHaveBeenCalled();
		});

		it('does not update hash when activeId is empty', () => {
			const replaceState = vi.spyOn(window.history, 'replaceState');

			renderHook(() => useSectionHash({ activeId: '', ready: true, goToId: vi.fn() }));

			expect(replaceState).not.toHaveBeenCalled();
		});

		it('does not update hash when it already matches activeId', () => {
			window.location.hash = '#hero';
			const replaceState = vi.spyOn(window.history, 'replaceState');

			renderHook(() => useSectionHash({ activeId: 'hero', ready: true, goToId: vi.fn() }));

			expect(replaceState).not.toHaveBeenCalled();
		});

		it('updates hash when activeId changes on rerender', () => {
			const replaceState = vi.spyOn(window.history, 'replaceState');

			const { rerender } = renderHook(
				({ activeId }) => useSectionHash({ activeId, ready: true, goToId: vi.fn() }),
				{ initialProps: { activeId: 'hero' } },
			);

			replaceState.mockClear();
			rerender({ activeId: 'team' });

			expect(replaceState).toHaveBeenCalledWith(null, '', '#team');
		});
	});
});
