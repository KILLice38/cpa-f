'use server';
import { submitContact } from '@/shared/api';

import { validateApplication } from '../model';

export type SubmitApplicationData = {
	name: string;
	contactMethod: string;
	contact: string;
};

export async function submitApplication(data: SubmitApplicationData): Promise<void> {
	const name = data.name.trim();
	const contactMethod = data.contactMethod.trim();
	const contact = data.contact.trim();

	const errors = validateApplication({ name, contactMethod, contact });
	const firstError = Object.values(errors)[0];
	if (firstError) throw new Error(firstError);

	await submitContact({
		name,
		method: contactMethod,
		contact,
	});
}
