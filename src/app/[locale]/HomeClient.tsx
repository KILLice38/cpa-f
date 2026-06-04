'use client';

import { useState } from 'react';

import { ApplicationForm, SuccessForm } from '@/features/applicationForm';
import { Modal, ModalContext } from '@/shared/ui';

export function HomeClient({ children }: { children: React.ReactNode }) {
	const [isOpen, setIsOpen] = useState(false);
	const [view, setView] = useState<'form' | 'success'>('form');

	const open = () => {
		setView('form');
		setIsOpen(true);
	};
	const handleClose = () => setIsOpen(false);
	const handleSuccess = () => setView('success');

	return (
		<ModalContext.Provider value={{ open }}>
			<Modal
				isOpen={isOpen}
				onClose={handleClose}
				aria-label={view === 'success' ? 'Application received' : 'Submit application'}
			>
				{view === 'success' ? (
					<SuccessForm onClose={handleClose} />
				) : (
					<ApplicationForm onClose={handleClose} onSuccess={handleSuccess} />
				)}
			</Modal>
			{children}
		</ModalContext.Provider>
	);
}
