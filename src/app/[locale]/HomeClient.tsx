'use client';

import { useState } from 'react';

import { ApplicationForm, SuccessForm } from '@/features/applicationForm';
import { Modal } from '@/shared/ui';

export function HomeClient({ children }: { children: React.ReactNode }) {
	const [isOpen, setIsOpen] = useState(false);
	const [view, setView] = useState<'form' | 'success'>('form');

	const _handleOpen = () => {
		setView('form');
		setIsOpen(true);
	};
	const handleClose = () => setIsOpen(false);
	const handleSuccess = () => setView('success');

	return (
		<>
			<Modal isOpen={isOpen} onClose={handleClose}>
				{view === 'success' ? (
					<SuccessForm onClose={handleClose} />
				) : (
					<ApplicationForm onClose={handleClose} onSuccess={handleSuccess} />
				)}
			</Modal>
			{children}
		</>
	);
}
