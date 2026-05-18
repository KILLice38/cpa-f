import { apiClient } from '../client';

export interface Tile {
	title: string;
	text: string;
}

export interface Task {
	description: string;
	tiles: Tile[];
}

export const getTasks = async (): Promise<Task[]> => {
	return apiClient.get<Task[]>('/tasks', {
		next: {
			revalidate: 60,
		},
	});
};
