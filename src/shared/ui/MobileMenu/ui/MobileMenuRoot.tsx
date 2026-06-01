'use client';
import type { ReactNode } from 'react';

import { MobileMenu } from './MobileMenu';
import { MobileMenuProvider } from '../model/MobileMenuContext';

type MobileMenuRootProps = {
	children: ReactNode;
};

export function MobileMenuRoot({ children }: MobileMenuRootProps) {
	return (
		<MobileMenuProvider>
			{children}
			<MobileMenu />
		</MobileMenuProvider>
	);
}
