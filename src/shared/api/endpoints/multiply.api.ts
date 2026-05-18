import { apiClient } from '../client';

export type AudienceTitle = 'for_media_buyers' | 'for_businesses' | 'for_partners';

export interface AudienceSection {
	title: AudienceTitle;
	steps: {
		step_1: string;
		step_2: string;
	};
}

export const getMultiply = async (): Promise<AudienceSection[]> => {
	return apiClient.get<AudienceSection[]>('/multiply', {
		next: {
			revalidate: 60,
		},
	});
};
