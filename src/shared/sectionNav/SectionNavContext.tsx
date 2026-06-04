'use client';

import { createContext, useContext } from 'react';

export type SectionNav = {
	goToId: (id: string) => void;
	activeId: string;
};

export const SectionNavContext = createContext<SectionNav | null>(null);

export function useSectionNav() {
	const ctx = useContext(SectionNavContext);
	if (!ctx) {
		throw new Error('useSectionNav must be used within a section-nav provider');
	}
	return ctx;
}
