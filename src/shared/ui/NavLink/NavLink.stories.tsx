import type { Meta, StoryObj } from '@storybook/nextjs';
import { NextIntlClientProvider } from 'next-intl';

import { SectionNavContext } from '@/shared/sectionNav';

import { NavLink } from './NavLink';

const meta: Meta<typeof NavLink> = {
	title: 'UI/NavLink',
	component: NavLink,
	parameters: {
		layout: 'centered',
		nextjs: { appDirectory: true },
	},
	tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof NavLink>;

export const WithHref: Story = {
	decorators: [
		(Story) => (
			<NextIntlClientProvider locale="ru" messages={{}}>
				<Story />
			</NextIntlClientProvider>
		),
	],
	args: {
		href: '#team',
		children: 'team',
	},
};

const mockSectionNav = {
	goToId: () => {},
	activeId: '',
};

export const WithSectionLink: Story = {
	decorators: [
		(Story) => (
			<SectionNavContext.Provider value={mockSectionNav}>
				<Story />
			</SectionNavContext.Provider>
		),
	],
	args: {
		to: 'benefits',
		children: 'Benefits',
	},
};

export const WithSectionLinkActive: Story = {
	decorators: [
		(Story) => (
			<SectionNavContext.Provider value={{ goToId: () => {}, activeId: 'benefits' }}>
				<Story />
			</SectionNavContext.Provider>
		),
	],
	args: {
		to: 'benefits',
		children: 'Benefits',
	},
};
