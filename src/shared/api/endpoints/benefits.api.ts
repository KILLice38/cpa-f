import { apiClient } from '../client';

export interface Benefits {
	tittle: string;
	description: string;
	benefits: string[];
}

export const getBenefits = async (): Promise<Benefits[]> => {
	return apiClient.get<Benefits[]>('/benefits', {
		next: {
			revalidate: 60,
		},
	});
};
