import { useEffect } from 'react';

type Params = {
	activeId: string;
	ready: boolean;
	goToId: (id: string) => void;
};

export function useSectionHash({ activeId, ready, goToId }: Params) {
	useEffect(() => {
		const onHashChange = () => goToId(window.location.hash.slice(1));
		window.addEventListener('hashchange', onHashChange);
		return () => window.removeEventListener('hashchange', onHashChange);
	}, [goToId]);

	useEffect(() => {
		if (!ready || !activeId) return;
		if (window.location.hash.slice(1) !== activeId) {
			window.history.replaceState(null, '', `#${activeId}`);
		}
	}, [ready, activeId]);
}
