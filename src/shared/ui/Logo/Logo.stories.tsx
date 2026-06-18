import type { Meta, StoryObj } from '@storybook/nextjs';

import { Logo } from './Logo';

const meta: Meta<typeof Logo> = {
	title: 'UI/Logo',
	component: Logo,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		variant: { control: 'radio', options: ['primary', 'secondary', 'inverse'] },
		size: { control: 'radio', options: ['default', 'form', 'header', 'headerOpen', 'row'] },
	},
};

export default meta;

type Story = StoryObj<typeof Logo>;

export const Primary: Story = {
	args: { variant: 'primary', size: 'default' },
	parameters: { backgrounds: { default: 'dark' } },
};

export const Secondary: Story = {
	args: { variant: 'secondary', size: 'default' },
	parameters: { backgrounds: { default: 'dark' } },
};

export const Inverse: Story = {
	args: { variant: 'inverse', size: 'default' },
	parameters: { backgrounds: { default: 'light' } },
};

export const HeaderSize: Story = {
	args: { variant: 'primary', size: 'header' },
	parameters: { backgrounds: { default: 'dark' } },
};
