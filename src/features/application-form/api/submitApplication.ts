'use server';
import { submitContact } from '@/shared/api';

export type SubmitApplicationData = {
	name: string;
	contactMethod: string;
	contact: string;
};

export async function submitApplication(data: SubmitApplicationData): Promise<void> {
	const name = data.name.trim();
	const contactMethod = data.contactMethod.trim();
	const contact = data.contact.trim();

	await submitContact({
		name,
		method: contactMethod,
		contact,
	});
}
