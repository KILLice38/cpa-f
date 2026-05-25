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
	className?: string;
};

export function Select({ name, options, placeholder, required = true, className }: SelectProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [selected, setSelected] = useState<SelectOption | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const handleSelect = (option: SelectOption) => {
		setSelected(option);
		setIsOpen(false);
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
				type="button"
				className={clsx(styles.trigger, isOpen && styles.triggerOpen)}
				onClick={() => setIsOpen((prev) => !prev)}
				onKeyDown={(e) => {
					if (e.key === 'Escape' && isOpen) {
						e.stopPropagation();
						setIsOpen(false);
					}
				}}
				aria-haspopup="listbox"
				aria-expanded={isOpen}
			>
				<span className={clsx(styles.triggerText, !selected && styles.placeholder)}>
					{selected?.label ?? placeholder}
				</span>
				<span className={clsx(styles.arrow, isOpen && styles.arrowOpen)} aria-hidden="true" />
			</button>

			{isOpen && (
				<div className={styles.dropdown} role="listbox">
					<div className={styles.separator} />
					<div className={styles.options}>
						{options.map((option) => (
							<div
								key={option.value}
								role="option"
								aria-selected={selected?.value === option.value}
								className={clsx(
									styles.option,
									selected?.value === option.value && styles.optionSelected,
								)}
								onClick={() => handleSelect(option)}
								onKeyDown={(e) => {
									if (e.key === 'Enter' || e.key === ' ') handleSelect(option);
								}}
								tabIndex={0}
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
