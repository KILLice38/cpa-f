'use client';

import { createContext, useContext } from 'react';

type ModalContextValue = {
	open: () => void;
};

export const ModalContext = createContext<ModalContextValue | null>(null);

export function useModal() {
	const ctx = useContext(ModalContext);
	if (!ctx) {
		throw new Error('useModal must be used within <ModalContext.Provider>');
	}
	return ctx;
}
