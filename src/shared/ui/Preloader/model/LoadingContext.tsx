'use client';

import { createContext, useContext, type ReactNode } from 'react';

export type LoadingContextValue = {
	isLoaded: boolean;
};

const LoadingContext = createContext<LoadingContextValue | undefined>(undefined);

export function LoadingProvider({
	value,
	children,
}: {
	value: LoadingContextValue;
	children: ReactNode;
}) {
	return <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>;
}

export function useLoading() {
	const context = useContext(LoadingContext);
	if (!context) {
		throw new Error('useLoading must be used within LoadingProvider');
	}

	return context;
}
