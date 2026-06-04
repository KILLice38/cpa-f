'use client';

import type { MouseEvent } from 'react';

import { useSectionNav } from './SectionNavContext';

type SectionLinkProps = {
	to: string;
	className?: string;
	children: React.ReactNode;
};

export function SectionLink({ to, className, children }: SectionLinkProps) {
	const { goToId, activeId } = useSectionNav();

	const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
		if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
		e.preventDefault();
		goToId(to);
		window.history.replaceState(null, '', `#${to}`);
	};

	return (
		<a
			href={`#${to}`}
			onClick={handleClick}
			aria-current={activeId === to ? 'page' : undefined}
			className={className}
		>
			{children}
		</a>
	);
}
