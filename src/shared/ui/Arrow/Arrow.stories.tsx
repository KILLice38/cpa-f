import type { Meta, StoryObj } from '@storybook/nextjs';

import { Arrow } from './Arrow';

const meta: Meta<typeof Arrow> = {
	title: 'UI/Arrow',
	component: Arrow,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		size: { control: 'radio', options: ['sm', 'lg'] },
		color: { control: 'radio', options: ['dark', 'inverse'] },
	},
};

export default meta;

type Story = StoryObj<typeof Arrow>;

export const SmallDark: Story = {
	args: { size: 'sm', color: 'dark' },
};

export const LargeDark: Story = {
	args: { size: 'lg', color: 'dark' },
};

export const SmallInverse: Story = {
	args: { size: 'sm', color: 'inverse' },
	parameters: {
		backgrounds: { default: 'dark' },
	},
};

export const LargeInverse: Story = {
	args: { size: 'lg', color: 'inverse' },
	parameters: {
		backgrounds: { default: 'dark' },
	},
};
