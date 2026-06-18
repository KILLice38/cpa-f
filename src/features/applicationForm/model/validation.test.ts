import { describe, expect, it } from 'vitest';

import { validateApplication } from './validation';

const valid = { name: 'John', method: 'telegram', contact: 'johndoe' };

describe('validateApplication', () => {
	describe('name', () => {
		it('accepts empty name', () => {
			expect(validateApplication({ ...valid, name: '' }).name).toBeUndefined();
		});

		it('accepts name exactly 100 chars', () => {
			expect(validateApplication({ ...valid, name: 'a'.repeat(100) }).name).toBeUndefined();
		});

		it('rejects name longer than 100 chars', () => {
			expect(validateApplication({ ...valid, name: 'a'.repeat(101) }).name).toBe(
				'Name is too long',
			);
		});
	});

	describe('contactMethod', () => {
		it('rejects empty method', () => {
			expect(validateApplication({ ...valid, method: '' }).contactMethod).toBe(
				'Select a contact method',
			);
		});

		it('rejects unknown method', () => {
			expect(validateApplication({ ...valid, method: 'fax' }).contactMethod).toBe(
				'Invalid contact method',
			);
		});

		it('accepts telegram', () => {
			expect(validateApplication({ ...valid, method: 'telegram' }).contactMethod).toBeUndefined();
		});

		it('accepts whatsapp', () => {
			expect(validateApplication({ ...valid, method: 'whatsapp' }).contactMethod).toBeUndefined();
		});

		it('accepts email', () => {
			expect(
				validateApplication({ ...valid, method: 'email', contact: 'a@b.com' }).contactMethod,
			).toBeUndefined();
		});
	});

	describe('contact', () => {
		it('rejects empty contact', () => {
			expect(validateApplication({ ...valid, contact: '' }).contact).toBe('Contact is required');
		});

		it('rejects contact shorter than 2 chars', () => {
			expect(validateApplication({ ...valid, contact: 'a' }).contact).toBe('Contact is too short');
		});

		it('accepts contact exactly 2 chars', () => {
			expect(validateApplication({ ...valid, contact: 'ab' }).contact).toBeUndefined();
		});

		it('rejects contact longer than 200 chars', () => {
			expect(validateApplication({ ...valid, contact: 'a'.repeat(201) }).contact).toBe(
				'Contact is too long',
			);
		});

		it('accepts contact exactly 200 chars', () => {
			expect(validateApplication({ ...valid, contact: 'a'.repeat(200) }).contact).toBeUndefined();
		});

		it('rejects invalid email when method is email', () => {
			expect(
				validateApplication({ ...valid, method: 'email', contact: 'notanemail' }).contact,
			).toBe('Enter a valid email address');
		});

		it('accepts valid email when method is email', () => {
			expect(
				validateApplication({ ...valid, method: 'email', contact: 'user@example.com' }).contact,
			).toBeUndefined();
		});

		it('does not validate email format for telegram', () => {
			expect(
				validateApplication({ ...valid, method: 'telegram', contact: 'notanemail' }).contact,
			).toBeUndefined();
		});
	});

	it('returns empty object for valid data', () => {
		expect(validateApplication(valid)).toEqual({});
	});
});
