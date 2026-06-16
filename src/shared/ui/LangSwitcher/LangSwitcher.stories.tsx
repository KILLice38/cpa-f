import type { Meta, StoryObj } from '@storybook/nextjs';
import { NextIntlClientProvider } from 'next-intl';

import { LangSwitcher } from './LangSwitcher';

const meta: Meta<typeof LangSwitcher> = {
	title: 'UI/LangSwitcher',
	component: LangSwitcher,
	parameters: {
		layout: 'centered',
		nextjs: {
			appDirectory: true,
		},
	},
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<NextIntlClientProvider locale="en" messages={{}}>
				<Story />
			</NextIntlClientProvider>
		),
	],
};

export default meta;

type Story = StoryObj<typeof LangSwitcher>;

export const English: Story = {
	decorators: [
		(Story) => (
			<NextIntlClientProvider locale="en" messages={{}}>
				<Story />
			</NextIntlClientProvider>
		),
	],
};

export const Russian: Story = {
	decorators: [
		(Story) => (
			<NextIntlClientProvider locale="ru" messages={{}}>
				<Story />
			</NextIntlClientProvider>
		),
	],
};
