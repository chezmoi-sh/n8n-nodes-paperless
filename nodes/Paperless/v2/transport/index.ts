import {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestMethods,
	ILoadOptionsFunctions,
	IRequestOptions,
	PaginationOptions,
} from 'n8n-workflow';

export async function apiRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	itemIndex: number,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	query?: IDataObject,
	option: IRequestOptions = {},
): Promise<unknown> {
	const queryParams = query || {};

	const credentials = await this.getCredentials('paperlessApi');
	const options: IRequestOptions = {
		headers: {},
		method,
		body,
		qs: queryParams,
		uri: `${credentials.url}${endpoint}`,
		json: true,
	};

	if (Object.keys(option).length) {
		Object.assign(options, option);
	}

	if (!Object.keys(body).length) {
		options.body = undefined;
	}

	return this.helpers.requestWithAuthentication.call(
		this,
		'paperlessApi',
		options,
		undefined,
		itemIndex,
	);
}

export async function apiRequestPaginated(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	itemIndex: number,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	query?: IDataObject,
	option: IRequestOptions = {},
): Promise<unknown[]> {
	query = query || {};

	const credentials = await this.getCredentials('paperlessApi');
	const options: IRequestOptions = {
		headers: {},
		method,
		body,
		qs: query,
		uri: `${credentials.url}${endpoint}`,
		json: true,
	};

	if (Object.keys(option).length) {
		Object.assign(options, option);
	}

	if (!Object.keys(body).length) {
		delete options.body;
	}

	const paginationOptions: PaginationOptions = {
		continue: '={{ ($response?.body?.next ?? null) !== null }}',
		request: {
			url: '={{ $response.body.next }}',
		},
		requestInterval: 100,
	};

	return this.helpers.requestWithAuthenticationPaginated.call(
		this,
		options,
		itemIndex, // NOTE: This is the index of the item in the items array... so we will only ever have one item
		paginationOptions,
		'paperlessApi',
	);
}
