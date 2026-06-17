import type { Tile } from '@/shared/api';
import { Card } from '@/shared/ui';

import { BenefitCard } from './BenefitCard';
import styles from './TasksGrid.module.css';

type TasksGridProps = {
	description: string;
	tiles: Tile[];
};

export function TasksGrid({ description, tiles }: TasksGridProps) {
	return (
		<div className={styles.grid} data-multi-grid>
			<BenefitCard description={description} />
			{tiles.map((tile) => (
				<Card key={tile.title} variant="task" title={tile.title}>
					{tile.text}
				</Card>
			))}
		</div>
	);
}
