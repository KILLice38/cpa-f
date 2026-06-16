import type { Preview } from '@storybook/nextjs';

import '../src/app/globals.css';
import './storybook.css';

const preview: Preview = {
	parameters: {
		backgrounds: {
			default: 'dark',
			values: [
				{ name: 'dark', value: '#14091a' },
				{ name: 'light', value: '#ffffff' },
			],
		},
	},
};

export default preview;
