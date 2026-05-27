'use server';
import { type Contact, submitContact } from '@/shared/api';

import { validateApplication } from '../model';

export async function submitApplication(data: Contact): Promise<void> {
	const name = data.name.trim();
	const method = data.method.trim();
	const contact = data.contact.trim();

	const errors = validateApplication({ name, method, contact });
	const firstError = Object.values(errors)[0];
	if (firstError) throw new Error(firstError);

	await submitContact({
		name,
		method,
		contact,
	});
}
