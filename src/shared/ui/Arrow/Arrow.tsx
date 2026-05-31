import clsx from 'clsx';

import styles from './Arrow.module.css';

type ArrowSize = 'sm' | 'lg';
type ArrowColor = 'dark' | 'inverse';

type ArrowProps = {
	size?: ArrowSize;
	color?: ArrowColor;
	className?: string;
};

export function Arrow({ size = 'sm', color = 'dark', className }: ArrowProps) {
	return (
		<svg
			viewBox="0 0 15 31"
			fill="none"
			aria-hidden="true"
			className={clsx(styles.arrow, styles[size], styles[color], className)}
		>
			<path
				d="M6.65715 30.7071C7.04767 31.0976 7.68084 31.0976 8.07136 
  30.7071L14.4353 24.3431C14.8258 23.9526 14.8258 23.3195 14.4353 
  22.9289C14.0448 22.5384 13.4116 22.5384 13.0211 22.9289L7.36426 
  28.5858L1.7074 22.9289C1.31688 22.5384 0.683713 22.5384 0.293189 
  22.9289C-0.0973354 23.3195 -0.0973354 23.9526 0.293189 24.3431L6.65715 
  30.7071ZM7.36426 0L6.36426 0L6.36426 30L8.36426 30L8.36426 0L7.36426 0Z"
				fill="currentColor"
			/>
		</svg>
	);
}
