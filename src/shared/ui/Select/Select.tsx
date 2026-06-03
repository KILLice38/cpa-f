'use client';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import styles from './Select.module.css';

export type SelectOption = {
	value: string;
	label: string;
};

type SelectProps = {
	name: string;
	options: SelectOption[];
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	className?: string;
	'aria-label'?: string;
	'aria-describedby'?: string;
};

export function Select({
	name,
	options,
	placeholder,
	required = true,
	disabled = false,
	className,
	'aria-label': ariaLabel,
	'aria-describedby': ariaDescribedby,
}: SelectProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [selected, setSelected] = useState<SelectOption | null>(null);

	const containerRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const optionRefs = useRef<(HTMLDivElement | null)[]>([]);
	const focusedIndexRef = useRef(-1);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	// Focus the appropriate option after the dropdown renders
	useEffect(() => {
		if (!isOpen) {
			focusedIndexRef.current = -1;
			return;
		}
		const idx = selected
			? Math.max(
					options.findIndex((o) => o.value === selected.value),
					0,
				)
			: 0;
		focusedIndexRef.current = idx;
		optionRefs.current[idx]?.focus();
	}, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

	const handleSelect = (option: SelectOption) => {
		setSelected(option);
		setIsOpen(false);
		triggerRef.current?.focus();
	};

	const openDropdown = () => {
		if (!disabled) setIsOpen(true);
	};

	const focusOption = (i: number) => {
		const clamped = Math.max(0, Math.min(i, options.length - 1));
		focusedIndexRef.current = clamped;
		optionRefs.current[clamped]?.focus();
	};

	const handleTriggerKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
		if (e.key === 'Escape' && isOpen) {
			e.stopPropagation();
			setIsOpen(false);
		} else if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && !isOpen) {
			e.preventDefault();
			openDropdown();
		}
	};

	const handleOptionKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, i: number) => {
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			focusOption(i + 1);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			if (i === 0) {
				setIsOpen(false);
				triggerRef.current?.focus();
			} else {
				focusOption(i - 1);
			}
		} else if (e.key === 'Home') {
			e.preventDefault();
			focusOption(0);
		} else if (e.key === 'End') {
			e.preventDefault();
			focusOption(options.length - 1);
		} else if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			handleSelect(options[i]);
		} else if (e.key === 'Escape') {
			e.preventDefault();
			setIsOpen(false);
			triggerRef.current?.focus();
		} else if (e.key === 'Tab') {
			setIsOpen(false);
		}
	};

	return (
		<div
			ref={containerRef}
			className={clsx(styles.container, className)}
			data-has-value={!!selected}
		>
			<input
				name={name}
				required={required}
				value={selected?.value ?? ''}
				onChange={() => {}}
				tabIndex={-1}
				aria-hidden="true"
				className={styles.validationInput}
			/>

			<button
				ref={triggerRef}
				type="button"
				className={clsx(styles.trigger, isOpen && styles.triggerOpen)}
				onClick={() => (isOpen ? setIsOpen(false) : openDropdown())}
				onKeyDown={handleTriggerKeyDown}
				aria-haspopup="listbox"
				aria-expanded={isOpen}
				aria-label={ariaLabel}
				aria-describedby={ariaDescribedby}
				disabled={disabled}
			>
				<span className={clsx(styles.triggerText, !selected && styles.placeholder)}>
					{selected?.label ?? placeholder}
				</span>
				<span className={clsx(styles.arrow, isOpen && styles.arrowOpen)} aria-hidden="true" />
			</button>

			{isOpen && (
				<div role="listbox" aria-label={ariaLabel} className={styles.dropdown}>
					<div className={styles.separator} />
					<div className={styles.options}>
						{options.map((option, i) => (
							<div
								key={option.value}
								role="option"
								aria-selected={selected?.value === option.value}
								tabIndex={-1}
								ref={(el) => {
									optionRefs.current[i] = el;
								}}
								className={clsx(
									styles.option,
									selected?.value === option.value && styles.optionSelected,
								)}
								onClick={() => handleSelect(option)}
								onKeyDown={(e) => handleOptionKeyDown(e, i)}
							>
								{option.label}
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
