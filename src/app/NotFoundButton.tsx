'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/shared/ui';

type Props = {
	label: string;
	className?: string;
};

export function NotFoundButton({ label, className }: Props) {
	const router = useRouter();

	return (
		<Button className={className} onClick={() => router.push('/')}>
			{label}
		</Button>
	);
}
