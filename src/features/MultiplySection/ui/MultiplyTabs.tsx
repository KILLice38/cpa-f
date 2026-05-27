'use client';
import clsx from 'clsx';
import { useState } from 'react';

import type { Multiply } from '@/shared/api';
import { Arrow, Button } from '@/shared/ui';

import styles from './MultiplyTabs.module.css';
interface MultiplyTabsProps {
	tabs: Multiply[];
	buttonLabels: string[];
}

export function MultiplyTabs({ tabs, buttonLabels }: MultiplyTabsProps) {
	const [activeIndex, setActiveIndex] = useState(0);
	const active = tabs[activeIndex];

	return (
		<div className={styles.root}>
			<ul className={styles.tabList}>
				{tabs.map((tab, i) => (
					<li key={tab.title}>
						<button
							className={clsx(styles.tab, i === activeIndex && styles.tabActive)}
							onClick={() => setActiveIndex(i)}
						>
							{tab.title}
							<Arrow size="lg" color="inverse" className={styles.tabArrow} />
						</button>
					</li>
				))}
			</ul>

			<div className={styles.panel}>
				<p className={styles.step}>{active?.steps.step_1}</p>
				<Arrow size="lg" />
				<p className={styles.step}>{active?.steps.step_2}</p>
				<Arrow size="lg" />
				<Button>{buttonLabels[activeIndex] ?? buttonLabels[0]}</Button>
			</div>
		</div>
	);
}
