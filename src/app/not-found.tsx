import Image from 'next/image';

import { heroImg } from '@/shared/assets';
import { Background, Container } from '@/shared/ui';

import styles from './not-found.module.css';
import { NotFoundButton } from './NotFoundButton';

export default function NotFound() {
	return (
		<>
			<Background />
			<div className={styles.page}>
				<Container>
					<h1 className={styles.title}>404</h1>
					<NotFoundButton label="Oops, take me back" className={styles.button} />
					<Image
						src={heroImg}
						alt=""
						className={styles.image}
						priority
						sizes="(max-width: 768px) 100vw, 60vw"
					/>
				</Container>
			</div>
		</>
	);
}
