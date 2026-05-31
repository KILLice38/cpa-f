import type { ReactNode } from 'react';

export function highlightDescription(
	text: string,
	phrase: string,
	accentClassName: string,
): ReactNode {
	if (!phrase || !text.includes(phrase)) {
		return text;
	}

	const segments = text.split(phrase);
	const lastIndex = segments.length - 1;

	return segments.flatMap((segment, index) =>
		index === lastIndex
			? [segment]
			: [
					segment,
					<span key={index} className={accentClassName}>
						{phrase}
					</span>,
				],
	);
}
