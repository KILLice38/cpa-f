'use client';

import type { ComponentProps } from 'react';

import { Button } from '../Button';
import { useModal } from '../Modal/ModalContext';

export function OpenModalButton(props: ComponentProps<typeof Button>) {
	const { open } = useModal();
	return <Button {...props} onClick={open} />;
}
