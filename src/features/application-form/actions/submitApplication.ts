'use server';
import { submitContact } from '@/shared/api';

export type SubmitApplicationData = {
	name: string;
	contactMethod: string;
	contact: string;
};

export async function submitApplication(data: SubmitApplicationData): Promise<void> {
	await submitContact({
		name: data.name,
		method: data.contactMethod,
		contact: data.contact,
	});
}
