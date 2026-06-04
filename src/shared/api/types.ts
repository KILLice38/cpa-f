export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface NextFetchOptions {
	revalidate?: number | false;
	tags?: string[];
}

export interface RequestOptions extends RequestInit {
	next?: NextFetchOptions;
}
