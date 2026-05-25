'use client';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import styles from './Modal.module.css';

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
};

export function Modal({ isOpen, onClose, children }: ModalProps) {
	useEffect(() => {
		if (!isOpen) return;

		const handleKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};

		document.addEventListener('keydown', handleKey);
		document.body.style.overflow = 'hidden';

		return () => {
			document.removeEventListener('keydown', handleKey);
			document.body.style.overflow = '';
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return createPortal(
		<div className={styles.overlay} role="presentation" onClick={onClose}>
			<div
				role="dialog"
				aria-modal="true"
				className={styles.modal}
				onClick={(e) => e.stopPropagation()}
			>
				{children}
			</div>
		</div>,
		document.body,
	);
}
