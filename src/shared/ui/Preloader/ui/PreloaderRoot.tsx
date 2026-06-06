'use client';
import { type ReactNode, useEffect, useLayoutEffect, useMemo, useState } from 'react';

import { Preloader } from './Preloader';
import { LoadingProvider } from '../model/LoadingContext';

type PreloaderRootProps = {
	children: ReactNode;
};

export function PreloaderRoot({ children }: PreloaderRootProps) {
	const [progress, setProgress] = useState(0);
	const [isLoaded, setIsLoaded] = useState(false);
	const [fistAnimationEnd, setFirstAnimationEnd] = useState(false);

	const loadingContextValue = useMemo(() => ({ isLoaded }), [isLoaded]);

	useLayoutEffect(() => {
		const progressTimer = setInterval(() => {
			setProgress((current) => {
				if (current >= 96) {
					clearInterval(progressTimer);
					setFirstAnimationEnd(true);
					return current;
				}

				let increment = 0;

				if (current < 10) {
					increment = Math.floor(Math.random() * 5) + 4;
				} else if (current < 40) {
					increment = Math.floor(Math.random() * 3) + 2;
				} else if (current < 75) {
					increment = Math.floor(Math.random() * 2) + 1;
				} else {
					increment = 1;
				}

				return Math.min(96, current + increment);
			});
		}, 30);

		return () => clearInterval(progressTimer);
	}, []);

	useEffect(() => {
		if (!fistAnimationEnd) return;

		let finishTimer: ReturnType<typeof setTimeout> | undefined;

		const finishLoad = () => {
			clearTimeout(safeTimer);
			setProgress(100);
			finishTimer = setTimeout(() => setIsLoaded(true), 300);
		};

		const safeTimer = setTimeout(() => {
			finishLoad();
		}, 10000);

		if (document.readyState === 'complete') {
			finishLoad();
		} else {
			window.addEventListener('load', finishLoad);
		}

		return () => {
			window.removeEventListener('load', finishLoad);
			clearTimeout(safeTimer);
			if (finishTimer) {
				clearTimeout(finishTimer);
			}
		};
	}, [fistAnimationEnd]);

	return (
		<LoadingProvider value={loadingContextValue}>
			{!isLoaded && <Preloader progress={progress} />}
			{children}
		</LoadingProvider>
	);
}
