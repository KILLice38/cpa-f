'use client';
import clsx from 'clsx';
import { useRef, useState } from 'react';

import type { Multiply } from '@/shared/api';
import { Arrow, OpenModalButton } from '@/shared/ui';

import styles from './MultiplyTabs.module.css';

const PANEL_ID = 'multiply-tabpanel';

interface MultiplyTabsProps {
	tabs: Multiply[];
	buttonLabels: string[];
}

export function MultiplyTabs({ tabs, buttonLabels }: MultiplyTabsProps) {
	const [activeIndex, setActiveIndex] = useState(0);
	const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
	const active = tabs[activeIndex];

	const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
		const count = tabs.length;
		let next: number | null = null;

		if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
			next = (i + 1) % count;
		} else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
			next = (i - 1 + count) % count;
		} else if (e.key === 'Home') {
			next = 0;
		} else if (e.key === 'End') {
			next = count - 1;
		}

		if (next !== null) {
			e.preventDefault();
			setActiveIndex(next);
			tabRefs.current[next]?.focus();
		}
	};

	return (
		<div className={styles.root}>
			<ul role="tablist" aria-label="Multiply options" className={styles.tabList}>
				{tabs.map((tab, i) => (
					<li key={tab.title} role="presentation">
						<button
							id={`multiply-tab-${i}`}
							role="tab"
							aria-selected={i === activeIndex}
							aria-controls={PANEL_ID}
							ref={(el) => {
								tabRefs.current[i] = el;
							}}
							className={clsx(styles.tab, i === activeIndex && styles.tabActive)}
							onClick={() => setActiveIndex(i)}
							onKeyDown={(e) => handleKeyDown(e, i)}
						>
							{tab.title.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
							<Arrow size="lg" color="inverse" className={styles.tabArrow} aria-hidden="true" />
						</button>
					</li>
				))}
			</ul>

			<div
				id={PANEL_ID}
				role="tabpanel"
				aria-labelledby={`multiply-tab-${activeIndex}`}
				tabIndex={0}
				className={styles.panel}
			>
				<p className={styles.step}>{active?.steps.step_1}</p>
				<Arrow size="lg" aria-hidden="true" />
				<p className={styles.step}>{active?.steps.step_2}</p>
				<Arrow size="lg" />
				<OpenModalButton>{buttonLabels[activeIndex] ?? buttonLabels[0]}</OpenModalButton>
			</div>
		</div>
	);
}
