import { apiClient } from '../client';

export interface Contact {
	name: string;
	method: string;
	contact: string;
}

export const submitContact = async (contact: Contact): Promise<void> => {
	await apiClient.post('/form', contact);
};
