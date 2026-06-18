import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import './globals.css';
import { fontHalvarBreit, fontStolzl } from '@/shared/fonts';

export const metadata: Metadata = {
	title: 'CPA-F',
	description: '',
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html className={`${fontHalvarBreit.variable} ${fontStolzl.variable}`}>
			<body>{children}</body>
		</html>
	);
}
