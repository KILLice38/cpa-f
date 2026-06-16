vi.mock('next-intl/server', () => ({ getLocale: vi.fn() }));
vi.mock('./config', () => ({
	API_CONFIG: {
		baseUrl: 'http://api.test',
		headers: {
			'Content-Type': 'application/json',
			'x-api-key': 'test-key',
		},
	},
}));

import { getLocale } from 'next-intl/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { ApiError, apiClient } from './client';

const mockFetch = vi.fn();

const okResponse = (body: unknown) => ({
	ok: true,
	status: 200,
	json: vi.fn().mockResolvedValue(body),
});

const failResponse = (status: number, body?: { message?: string }) => ({
	ok: false,
	status,
	json:
		body !== undefined
			? vi.fn().mockResolvedValue(body)
			: vi.fn().mockRejectedValue(new Error('not json')),
});

beforeEach(() => {
	vi.stubGlobal('fetch', mockFetch);
	vi.mocked(getLocale).mockResolvedValue('en');
});

afterEach(() => {
	vi.unstubAllGlobals();
	mockFetch.mockReset();
});

describe('apiClient.get', () => {
	it('prepends locale to endpoint', async () => {
		mockFetch.mockResolvedValue(okResponse({}));
		await apiClient.get('/products');
		expect(mockFetch).toHaveBeenCalledWith(
			'http://api.test/en/products',
			expect.objectContaining({ method: 'GET' }),
		);
	});

	it('uses the actual current locale in the endpoint prefix', async () => {
		vi.mocked(getLocale).mockResolvedValue('ru');
		mockFetch.mockResolvedValue(okResponse({}));
		await apiClient.get('/products');
		expect(mockFetch).toHaveBeenCalledWith(
			'http://api.test/ru/products',
			expect.objectContaining({ method: 'GET' }),
		);
	});

	it('returns parsed response body', async () => {
		mockFetch.mockResolvedValue(okResponse({ id: 1 }));
		const result = await apiClient.get('/products');
		expect(result).toEqual({ id: 1 });
	});
});

describe('apiClient.post', () => {
	it('does not prepend locale to endpoint', async () => {
		mockFetch.mockResolvedValue(okResponse({}));
		await apiClient.post('/form', {});
		expect(mockFetch).toHaveBeenCalledWith(
			'http://api.test/form',
			expect.objectContaining({ method: 'POST' }),
		);
	});

	it('serializes body as JSON', async () => {
		mockFetch.mockResolvedValue(okResponse({}));
		await apiClient.post('/form', { name: 'John' });
		expect(mockFetch).toHaveBeenCalledWith(
			expect.any(String),
			expect.objectContaining({ body: JSON.stringify({ name: 'John' }) }),
		);
	});
});

describe('apiClient.put', () => {
	it('does not prepend locale and serializes body', async () => {
		mockFetch.mockResolvedValue(okResponse({}));
		await apiClient.put('/item/1', { value: 42 });
		expect(mockFetch).toHaveBeenCalledWith(
			'http://api.test/item/1',
			expect.objectContaining({ method: 'PUT', body: JSON.stringify({ value: 42 }) }),
		);
	});
});

describe('apiClient.patch', () => {
	it('does not prepend locale and serializes body', async () => {
		mockFetch.mockResolvedValue(okResponse({}));
		await apiClient.patch('/item/1', { value: 42 });
		expect(mockFetch).toHaveBeenCalledWith(
			'http://api.test/item/1',
			expect.objectContaining({ method: 'PATCH', body: JSON.stringify({ value: 42 }) }),
		);
	});
});

describe('apiClient.delete', () => {
	it('does not prepend locale', async () => {
		mockFetch.mockResolvedValue(okResponse({}));
		await apiClient.delete('/item/1');
		expect(mockFetch).toHaveBeenCalledWith(
			'http://api.test/item/1',
			expect.objectContaining({ method: 'DELETE' }),
		);
	});
});

describe('headers', () => {
	it('includes config headers in every request', async () => {
		mockFetch.mockResolvedValue(okResponse({}));
		await apiClient.get('/products');
		expect(mockFetch).toHaveBeenCalledWith(
			expect.any(String),
			expect.objectContaining({
				headers: expect.objectContaining({
					'Content-Type': 'application/json',
					'x-api-key': 'test-key',
				}),
			}),
		);
	});

	it('merges custom headers with config headers', async () => {
		mockFetch.mockResolvedValue(okResponse({}));
		await apiClient.get('/products', { headers: { Authorization: 'Bearer token' } });
		expect(mockFetch).toHaveBeenCalledWith(
			expect.any(String),
			expect.objectContaining({
				headers: expect.objectContaining({
					'Content-Type': 'application/json',
					'x-api-key': 'test-key',
					Authorization: 'Bearer token',
				}),
			}),
		);
	});
});

describe('error handling', () => {
	it('throws ApiError on non-ok response', async () => {
		mockFetch.mockResolvedValue(failResponse(404, { message: 'Not found' }));
		await expect(apiClient.get('/missing')).rejects.toBeInstanceOf(ApiError);
	});

	it('ApiError carries the http status', async () => {
		mockFetch.mockResolvedValue(failResponse(500, { message: 'Server error' }));
		const error = (await apiClient.get('/crash').catch((e) => e)) as ApiError;
		expect(error.status).toBe(500);
	});

	it('ApiError message comes from response JSON', async () => {
		mockFetch.mockResolvedValue(failResponse(422, { message: 'Validation failed' }));
		const error = (await apiClient.get('/bad').catch((e) => e)) as ApiError;
		expect(error.message).toBe('Validation failed');
	});

	it('ApiError message falls back to "Unknown error" when JSON parse fails', async () => {
		const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
		mockFetch.mockResolvedValue(failResponse(503));
		const error = (await apiClient.get('/down').catch((e) => e)) as ApiError;
		expect(error.message).toBe('Unknown error');
		consoleError.mockRestore();
	});

	it('ApiError message falls back to "Unknown error" when JSON has no message field', async () => {
		mockFetch.mockResolvedValue(failResponse(400, {}));
		const error = (await apiClient.get('/bad').catch((e) => e)) as ApiError;
		expect(error.message).toBe('Unknown error');
	});

	it('propagates fetch network errors without wrapping them in ApiError', async () => {
		mockFetch.mockRejectedValue(new TypeError('Failed to fetch'));
		await expect(apiClient.get('/products')).rejects.toThrow(TypeError);
	});
});
