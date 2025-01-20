import {
	ILoadOptionsFunctions,
	INodeListSearchResult,
	INodeParameterResourceLocator,
} from 'n8n-workflow';
import { apiRequestPaginated } from '../transport';

async function resourceSearch(
	this: ILoadOptionsFunctions,
	resource:
		| 'correspondents'
		| 'custom_fields'
		| 'documents'
		| 'document_types'
		| 'storage_paths'
		| 'tags',
	accessor: 'name' | 'title',
	filter?: string,
): Promise<INodeListSearchResult> {
	// NOTE: The search query must be at least 3 characters long to be valid
	if (filter && filter.trim().length >= 3) {
		const endpoint = `/search/`;
		const query = { query: filter };

		const responses = (await apiRequestPaginated.call(
			this,
			0,
			'GET',
			endpoint,
			undefined,
			query,
		)) as {
			body: {
				correspondents: { id: number; name: string }[];
				custom_fields: { id: number; name: string }[];
				documents: { id: number; title: string }[];
				document_types: { id: number; name: string }[];
				storage_paths: { id: number; name: string }[];
				tags: { id: number; name: string }[];
			};
		}[];

		const [result] = responses;
		return {
			results: result
				? result.body[resource].map((item) => ({
						name: String(item[accessor as keyof typeof item]),
						value: item.id,
					}))
				: [],
		};
	}

	const endpoint = `/${resource}/`;
	const responses = (await apiRequestPaginated.call(this, 0, 'GET', endpoint)) as {
		body: { results: { id: number; name: string }[] };
	}[];

	// NOTE: We limit the results to 30 to avoid performance issues
	const results = responses
		.reduce<
			{ id: number; name: string }[]
		>((acc, response) => acc.concat(response.body.results), [])
		.slice(0, 30);

	return {
		results: results.map((item) => ({
			name: String(item[accessor as keyof typeof item]),
			value: item.id,
		})),
	};
}

export async function correspondentSearch(
	this: ILoadOptionsFunctions,
	filter?: string,
): Promise<INodeListSearchResult> {
	return resourceSearch.call(this, 'correspondents', 'name', filter);
}

export async function customFieldSearch(
	this: ILoadOptionsFunctions,
	filter?: string,
): Promise<INodeListSearchResult> {
	return resourceSearch.call(this, 'custom_fields', 'name', filter);
}

export async function documentSearch(
	this: ILoadOptionsFunctions,
	filter?: string,
): Promise<INodeListSearchResult> {
	return resourceSearch.call(this, 'documents', 'title', filter);
}

export async function documentTypeSearch(
	this: ILoadOptionsFunctions,
	filter?: string,
): Promise<INodeListSearchResult> {
	return resourceSearch.call(this, 'document_types', 'name', filter);
}

export async function storagePathSearch(
	this: ILoadOptionsFunctions,
	filter?: string,
): Promise<INodeListSearchResult> {
	return resourceSearch.call(this, 'storage_paths', 'name', filter);
}

export async function tagSearch(
	this: ILoadOptionsFunctions,
	filter?: string,
): Promise<INodeListSearchResult> {
	return resourceSearch.call(this, 'tags', 'name', filter);
}

export async function documentNoteSearch(
	this: ILoadOptionsFunctions,
	filter?: string,
): Promise<INodeListSearchResult> {
	const documentId = (this.getCurrentNodeParameter('id') as INodeParameterResourceLocator).value;

	const endpoint = `/documents/${documentId}/notes/`;
	const responses = (await apiRequestPaginated.call(this, 0, 'GET', endpoint)) as {
		body: { id: number; note: string }[];
	}[];

	// NOTE: We limit the results to 30 to avoid performance issues
	return {
		results: responses
			.reduce<{ id: number; note: string }[]>((acc, response) => acc.concat(response.body), [])
			.filter((item) => !filter || item.note.includes(filter))
			.slice(0, 30)
			.map((item) => ({
				name:
					item.note.trim().length > 80 ? `${item.note.trim().slice(0, 80)}...` : item.note.trim(),
				value: item.id,
			})),
	};
}
