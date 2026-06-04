import { apiClient } from '../client';

export interface Multiply {
	title: string;
	steps: {
		step_1: string;
		step_2: string;
	};
}

export const getMultiply = async (): Promise<Multiply[]> => {
	return apiClient.get<Multiply[]>('/multiply', {
		next: {
			revalidate: 60,
		},
	});
};
