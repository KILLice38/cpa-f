if (!process.env.API_URL) {
	throw new Error('API_URL is not defined');
}

if (!process.env.API_KEY) {
	throw new Error('API_KEY is not defined');
}

export const API_CONFIG = {
	baseUrl: process.env.API_URL!,
	headers: {
		'Content-Type': 'application/json',
		'x-api-key': process.env.API_KEY!,
	},
} as const;
