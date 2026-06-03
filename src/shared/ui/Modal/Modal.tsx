'use client';
import { useEffect, useEffectEvent, useRef } from 'react';
import { createPortal } from 'react-dom';

import styles from './Modal.module.css';

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
	'aria-label': string;
};

const FOCUSABLE_SELECTORS = [
	'a[href]',
	'button:not([disabled])',
	'input:not([disabled])',
	'select:not([disabled])',
	'textarea:not([disabled])',
	'[tabindex]:not([tabindex="-1"])',
].join(', ');

export function Modal({ isOpen, onClose, children, 'aria-label': ariaLabel }: ModalProps) {
	const handleClose = useEffectEvent(onClose);
	const dialogRef = useRef<HTMLDivElement>(null);
	const previousFocusRef = useRef<HTMLElement | null>(null);

	// Save and restore focus around open/close
	useEffect(() => {
		if (isOpen) {
			previousFocusRef.current = document.activeElement as HTMLElement;
		} else {
			previousFocusRef.current?.focus();
			previousFocusRef.current = null;
		}
	}, [isOpen]);

	// Escape key + focus trap
	useEffect(() => {
		if (!isOpen) return;

		const dialog = dialogRef.current;
		if (!dialog) return;

		const getFocusable = () =>
			Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS));

		getFocusable()[0]?.focus();

		const handleKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				handleClose();
				return;
			}
			if (e.key === 'Tab') {
				const focusable = getFocusable();
				const first = focusable[0];
				const last = focusable[focusable.length - 1];
				if (e.shiftKey) {
					if (document.activeElement === first) {
						e.preventDefault();
						last?.focus();
					}
				} else {
					if (document.activeElement === last) {
						e.preventDefault();
						first?.focus();
					}
				}
			}
		};

		document.addEventListener('keydown', handleKey);
		document.body.style.overflow = 'hidden';

		return () => {
			document.removeEventListener('keydown', handleKey);
			document.body.style.overflow = '';
		};
	}, [isOpen]);

	if (!isOpen) return null;

	return createPortal(
		<div className={styles.overlay} role="presentation" onClick={onClose}>
			<div
				ref={dialogRef}
				role="dialog"
				aria-modal="true"
				aria-label={ariaLabel}
				className={styles.modal}
				onClick={(e) => e.stopPropagation()}
			>
				{children}
			</div>
		</div>,
		document.body,
	);
}
