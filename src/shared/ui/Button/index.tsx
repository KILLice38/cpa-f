import clsx from 'clsx';

import styles from './index.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
	return (
		<button type="button" className={clsx(styles.button, className)} {...rest}>
			<svg
				preserveAspectRatio="none"
				viewBox="0 0 283 85"
				fill="none"
				className={styles.svg}
				aria-hidden="true"
				focusable="false"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					className={styles.fill}
					d="M1.25 83.25V9.85855L21.3289 1.25H281.25V77.5855L271.701 83.25H1.25Z"
				/>
				<path
					className={styles.stroke}
					d="M281.25 1.25V77.5855L271.701 83.25H1.25V9.85855L21.3289 1.25H281.25ZM1.25 9.85855C1.25 9.85855 166.083 9.85855
  271.701 9.85855M271.701 83.25C271.701 83.25 271.701 39.3007 271.701 9.85855M271.701 9.85855C275.43 7.27775 281.25 1.25 281.25 1.25"
					strokeWidth="2.5"
					strokeLinejoin="round"
				/>
			</svg>
			<span className={styles.text}>{children}</span>
		</button>
	);
}
