'use client';
import { createContext, useContext, useState, type ReactNode } from 'react';
export const MOBILE_MENU_ID = 'mobile-menu';

type MobileMenuContextValue = {
	isOpen: boolean;
	open: () => void;
	close: () => void;
};

const MobileMenuContext = createContext<MobileMenuContextValue | null>(null);

type MobileMenuProviderProps = {
	children: ReactNode;
};

export function MobileMenuProvider({ children }: MobileMenuProviderProps) {
	const [isOpen, setIsOpen] = useState(false);

	const open = () => setIsOpen(true);
	const close = () => setIsOpen(false);

	const value = {
		isOpen,
		open,
		close,
	};

	return <MobileMenuContext.Provider value={value}>{children}</MobileMenuContext.Provider>;
}

export function useMobileMenu() {
	const context = useContext(MobileMenuContext);

	if (!context) {
		throw new Error('useMobileMenu must be used within MobileMenuProvider');
	}

	return context;
}
