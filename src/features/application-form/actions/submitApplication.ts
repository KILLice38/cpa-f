'use server';
import { submitContact } from '@/shared/api';

export type SubmitApplicationData = {
	name: string;
	contactMethod: string;
	contact: string;
};

const HTML_PATTERN = /[<>]/;

export async function submitApplication(data: SubmitApplicationData): Promise<void> {
	const name = data.name.trim();
	const contactMethod = data.contactMethod.trim();
	const contact = data.contact.trim();

	if (HTML_PATTERN.test(name) || HTML_PATTERN.test(contactMethod) || HTML_PATTERN.test(contact)) {
		throw new Error('Invalid characters in input');
	}

	await submitContact({
		name,
		method: contactMethod,
		contact,
	});
}
