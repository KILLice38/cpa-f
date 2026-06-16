import type { Meta, StoryObj } from '@storybook/nextjs';

import { SectionTitle } from './SectionTitle';

const meta: Meta<typeof SectionTitle> = {
	title: 'UI/SectionTitle',
	component: SectionTitle,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SectionTitle>;

export const Default: Story = {
	args: {
		children: 'Наши преимущества',
	},
};

export const LongTitle: Story = {
	args: {
		children: 'Почему партнёры выбирают нас среди сотен других предложений',
	},
};
