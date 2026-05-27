import { apiClient } from '../client';

export interface Tile {
	title: string;
	text: string;
}

export interface Tasks {
	description: string;
	tiles: Tile[];
}

export const getTasks = async (): Promise<Tasks> => {
	return apiClient.get<Tasks>('/tasks', {
		next: {
			revalidate: 60,
		},
	});
};
