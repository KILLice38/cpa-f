import type { Meta, StoryObj } from '@storybook/nextjs';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
	title: 'UI/Button',
	component: Button,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
	args: {
		children: 'Оставить заявку',
	},
};

export const Disabled: Story = {
	args: {
		children: 'Недоступно',
		disabled: true,
	},
};

export const LongText: Story = {
	args: {
		children: 'Длинный текст кнопки',
	},
};
