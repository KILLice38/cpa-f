import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Select } from './Select';

const OPTIONS = [
	{ value: 'a', label: 'Option A' },
	{ value: 'b', label: 'Option B' },
	{ value: 'c', label: 'Option C' },
];

function renderSelect(props: Partial<React.ComponentProps<typeof Select>> = {}) {
	return render(<Select name="test" options={OPTIONS} placeholder="Pick one" {...props} />);
}

const getTrigger = () => screen.getByRole('button');
const getListbox = () => screen.getByRole('listbox');
const getOptions = () => screen.getAllByRole('option');

describe('Select', () => {
	describe('initial state', () => {
		it('renders the trigger button', () => {
			renderSelect();
			expect(getTrigger()).toBeInTheDocument();
		});

		it('shows placeholder when nothing is selected', () => {
			renderSelect();
			expect(screen.getByText('Pick one')).toBeInTheDocument();
		});

		it('dropdown is closed initially', () => {
			renderSelect();
			expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
		});

		it('trigger has aria-expanded="false" initially', () => {
			renderSelect();
			expect(getTrigger()).toHaveAttribute('aria-expanded', 'false');
		});

		it('trigger is disabled when disabled prop is true', () => {
			renderSelect({ disabled: true });
			expect(getTrigger()).toBeDisabled();
		});
	});

	describe('opening and closing', () => {
		it('opens dropdown on trigger click', async () => {
			renderSelect();
			await userEvent.click(getTrigger());
			expect(getListbox()).toBeInTheDocument();
		});

		it('trigger has aria-expanded="true" when open', async () => {
			renderSelect();
			await userEvent.click(getTrigger());
			expect(getTrigger()).toHaveAttribute('aria-expanded', 'true');
		});

		it('closes dropdown on second trigger click', async () => {
			renderSelect();
			await userEvent.click(getTrigger());
			await userEvent.click(getTrigger());
			expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
		});

		it('closes dropdown on click outside', async () => {
			renderSelect();
			await userEvent.click(getTrigger());
			await userEvent.click(document.body);
			expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
		});

		it('does not open when disabled', async () => {
			renderSelect({ disabled: true });
			await userEvent.click(getTrigger());
			expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
		});

		it('opens dropdown on ArrowDown key from trigger', async () => {
			renderSelect();
			getTrigger().focus();
			await userEvent.keyboard('{ArrowDown}');
			expect(getListbox()).toBeInTheDocument();
		});

		it('opens dropdown on ArrowUp key from trigger', async () => {
			renderSelect();
			getTrigger().focus();
			await userEvent.keyboard('{ArrowUp}');
			expect(getListbox()).toBeInTheDocument();
		});

		it('closes dropdown on Escape key from trigger', async () => {
			renderSelect();
			await userEvent.click(getTrigger());
			await userEvent.keyboard('{Escape}');
			expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
		});
	});

	describe('option rendering', () => {
		it('renders all options in the listbox', async () => {
			renderSelect();
			await userEvent.click(getTrigger());
			expect(getOptions()).toHaveLength(OPTIONS.length);
		});

		it('renders option labels', async () => {
			renderSelect();
			await userEvent.click(getTrigger());
			expect(screen.getByText('Option A')).toBeInTheDocument();
			expect(screen.getByText('Option B')).toBeInTheDocument();
		});
	});

	describe('selecting an option', () => {
		it('displays selected option label in trigger', async () => {
			renderSelect();
			await userEvent.click(getTrigger());
			await userEvent.click(screen.getByText('Option B'));
			expect(getTrigger()).toHaveTextContent('Option B');
		});

		it('closes dropdown after selecting', async () => {
			renderSelect();
			await userEvent.click(getTrigger());
			await userEvent.click(screen.getByText('Option A'));
			expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
		});

		it('sets aria-selected="true" on selected option', async () => {
			renderSelect();
			await userEvent.click(getTrigger());
			await userEvent.click(screen.getByText('Option A'));
			await userEvent.click(getTrigger());
			const [optA] = getOptions();
			expect(optA).toHaveAttribute('aria-selected', 'true');
		});

		it('sets aria-selected="false" on non-selected options', async () => {
			renderSelect();
			await userEvent.click(getTrigger());
			await userEvent.click(screen.getByText('Option A'));
			await userEvent.click(getTrigger());
			const [, optB] = getOptions();
			expect(optB).toHaveAttribute('aria-selected', 'false');
		});

		it('updates hidden input value when option selected', async () => {
			const { container } = renderSelect();
			await userEvent.click(getTrigger());
			await userEvent.click(screen.getByText('Option B'));
			const input = container.querySelector('input[aria-hidden="true"]') as HTMLInputElement;
			expect(input.value).toBe('b');
		});

		it('selects option on Enter key', async () => {
			renderSelect();
			await userEvent.click(getTrigger());
			const [optA] = getOptions();
			optA.focus();
			await userEvent.keyboard('{Enter}');
			expect(getTrigger()).toHaveTextContent('Option A');
		});

		it('selects option on Space key', async () => {
			renderSelect();
			await userEvent.click(getTrigger());
			const [optA] = getOptions();
			optA.focus();
			await userEvent.keyboard(' ');
			expect(getTrigger()).toHaveTextContent('Option A');
		});
	});

	describe('keyboard navigation in options', () => {
		it('ArrowDown moves focus to next option', async () => {
			renderSelect();
			await userEvent.click(getTrigger());
			const [optA, optB] = getOptions();
			optA.focus();
			await userEvent.keyboard('{ArrowDown}');
			expect(optB).toHaveFocus();
		});

		it('ArrowUp moves focus to previous option', async () => {
			renderSelect();
			await userEvent.click(getTrigger());
			const [, optB, optC] = getOptions();
			optC.focus();
			await userEvent.keyboard('{ArrowUp}');
			expect(optB).toHaveFocus();
		});

		it('ArrowUp on first option returns focus to trigger and closes', async () => {
			renderSelect();
			await userEvent.click(getTrigger());
			const [optA] = getOptions();
			optA.focus();
			await userEvent.keyboard('{ArrowUp}');
			expect(getTrigger()).toHaveFocus();
			expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
		});

		it('Home moves focus to first option', async () => {
			renderSelect();
			await userEvent.click(getTrigger());
			const [optA, , optC] = getOptions();
			optC.focus();
			await userEvent.keyboard('{Home}');
			expect(optA).toHaveFocus();
		});

		it('End moves focus to last option', async () => {
			renderSelect();
			await userEvent.click(getTrigger());
			const [optA, , optC] = getOptions();
			optA.focus();
			await userEvent.keyboard('{End}');
			expect(optC).toHaveFocus();
		});

		it('Escape closes dropdown and returns focus to trigger', async () => {
			renderSelect();
			await userEvent.click(getTrigger());
			const [optA] = getOptions();
			optA.focus();
			await userEvent.keyboard('{Escape}');
			expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
			expect(getTrigger()).toHaveFocus();
		});

		it('ArrowDown on last option keeps focus on last option', async () => {
			renderSelect();
			await userEvent.click(getTrigger());
			const [, , optC] = getOptions();
			optC.focus();
			await userEvent.keyboard('{ArrowDown}');
			expect(optC).toHaveFocus();
		});

		it('Tab closes the dropdown', async () => {
			renderSelect();
			await userEvent.click(getTrigger());
			const [optA] = getOptions();
			optA.focus();
			await userEvent.keyboard('{Tab}');
			expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
		});
	});

	describe('accessibility', () => {
		it('trigger has aria-haspopup="listbox"', () => {
			renderSelect();
			expect(getTrigger()).toHaveAttribute('aria-haspopup', 'listbox');
		});

		it('applies aria-label to trigger and listbox', async () => {
			renderSelect({ 'aria-label': 'Contact method' });
			expect(getTrigger()).toHaveAttribute('aria-label', 'Contact method');
			await userEvent.click(getTrigger());
			expect(getListbox()).toHaveAttribute('aria-label', 'Contact method');
		});

		it('hidden input is aria-hidden', () => {
			const { container } = renderSelect();
			const input = container.querySelector('input');
			expect(input).toHaveAttribute('aria-hidden', 'true');
		});

		it('hidden input carries the name prop for form submission', () => {
			const { container } = renderSelect({ name: 'method' });
			const input = container.querySelector('input[aria-hidden="true"]') as HTMLInputElement;
			expect(input).toHaveAttribute('name', 'method');
		});

		it('hidden input is required by default', () => {
			const { container } = renderSelect();
			const input = container.querySelector('input[aria-hidden="true"]') as HTMLInputElement;
			expect(input).toBeRequired();
		});

		it('hidden input is not required when required=false', () => {
			const { container } = renderSelect({ required: false });
			const input = container.querySelector('input[aria-hidden="true"]') as HTMLInputElement;
			expect(input).not.toBeRequired();
		});

		it('sets data-has-value="false" when nothing is selected', () => {
			const { container } = renderSelect();
			expect(container.firstChild).toHaveAttribute('data-has-value', 'false');
		});

		it('sets data-has-value="true" after selection', async () => {
			const { container } = renderSelect();
			await userEvent.click(getTrigger());
			await userEvent.click(screen.getByText('Option A'));
			expect(container.firstChild).toHaveAttribute('data-has-value', 'true');
		});
	});
});
