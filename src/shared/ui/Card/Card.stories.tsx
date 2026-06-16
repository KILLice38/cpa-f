import type { Meta, StoryObj } from '@storybook/nextjs';

import { Card } from './Card';

const meta: Meta<typeof Card> = {
	title: 'UI/Card',
	component: Card,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Benefit: Story = {
	args: {
		variant: 'benefit',
		children:
			'Мы берем на себя проекты по аутсорсу в любой нише — от iGaming и знакомств до e-commerce и найма персонала',
	},
};

export const Task: Story = {
	args: {
		variant: 'task',
		title: 'Гибкая инфраструктура',
		children: 'Создана для масштабирования с вашим ростом и изменяющимися потребностями',
	},
};
