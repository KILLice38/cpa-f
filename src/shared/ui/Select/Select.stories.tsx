import type { Meta, StoryObj } from '@storybook/nextjs';

import { Select } from './Select';

const CONTACT_OPTIONS = [
	{ value: 'telegram', label: 'Telegram' },
	{ value: 'whatsapp', label: 'WhatsApp' },
	{ value: 'email', label: 'Email' },
];

const meta: Meta<typeof Select> = {
	title: 'UI/Select',
	component: Select,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	args: {
		name: 'contact-method',
		options: CONTACT_OPTIONS,
		placeholder: 'Способ связи',
	},
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {};

export const Disabled: Story = {
	args: {
		disabled: true,
	},
};

export const WithAriaLabel: Story = {
	args: {
		'aria-label': 'Способ связи',
	},
};
