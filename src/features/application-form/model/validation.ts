import type { Contact } from '@/shared/api';

export const CONTACT_METHODS = ['Instagram', 'Telegram', 'LinkedIn'] as const;
export type ContactMethod = (typeof CONTACT_METHODS)[number];

export type ApplicationErrors = {
	name?: string;
	contactMethod?: string;
	contact?: string;
};

export function validateApplication(data: Contact): ApplicationErrors {
	const errors: ApplicationErrors = {};

	if (data.name.length > 100) errors.name = 'Name is too long';
	if (!data.method) errors.contactMethod = 'Select a contact method';
	else if (!CONTACT_METHODS.includes(data.method as ContactMethod))
		errors.contactMethod = 'Invalid contact method';
	if (!data.contact) errors.contact = 'Contact is required';
	else if (data.contact.length < 2) errors.contact = 'Contact is too short';
	else if (data.contact.length > 200) errors.contact = 'Contact is too long';

	return errors;
}
