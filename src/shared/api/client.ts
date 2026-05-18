import { getLocale } from 'next-intl/server';

import { API_CONFIG } from './config';
import type { RequestMethod, RequestOptions } from './types';

class ApiError extends Error {
	status: number;

	constructor(message: string, status: number) {
		super(message);

		this.name = 'ApiError';
		this.status = status;
	}
}

async function request<TResponse>(
	endpoint: string,
	method: RequestMethod,
	options?: RequestOptions,
): Promise<TResponse> {
	const locale = await getLocale();

	const localizedEndpoint = method === 'GET' && locale ? `/${locale}${endpoint}` : endpoint;

	const response = await fetch(`${API_CONFIG.baseUrl}${localizedEndpoint}`, {
		method,
		headers: {
			...API_CONFIG.headers,
			...options?.headers,
		},
		...options,
	});

	if (!response.ok) {
		let errorMessage = 'Unknown error';

		try {
			const errorData = await response.json();
			errorMessage = errorData?.message || errorMessage;
		} catch (error) {
			console.error('Failed to parse error response:', error);
		}

		throw new ApiError(errorMessage, response.status);
	}

	return response.json();
}

export const apiClient = {
	get: <TResponse>(endpoint: string, options?: RequestOptions) =>
		request<TResponse>(endpoint, 'GET', options),

	post: <TResponse, TBody>(endpoint: string, body: TBody, options?: RequestOptions) =>
		request<TResponse>(endpoint, 'POST', {
			...options,
			body: JSON.stringify(body),
		}),

	put: <TResponse, TBody>(endpoint: string, body: TBody, options?: RequestOptions) =>
		request<TResponse>(endpoint, 'PUT', {
			...options,
			body: JSON.stringify(body),
		}),

	patch: <TResponse, TBody>(endpoint: string, body: TBody, options?: RequestOptions) =>
		request<TResponse>(endpoint, 'PATCH', {
			...options,
			body: JSON.stringify(body),
		}),

	delete: <TResponse>(endpoint: string, options?: RequestOptions) =>
		request<TResponse>(endpoint, 'DELETE', options),
};
