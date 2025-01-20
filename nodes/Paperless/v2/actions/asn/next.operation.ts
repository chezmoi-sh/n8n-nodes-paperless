import { IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { apiRequest } from '../../transport';

export const description: INodeProperties[] = [];

export async function execute(
	this: IExecuteFunctions,
	itemIndex: number,
): Promise<INodeExecutionData> {
	const endpoint = '/documents/next_asn/';
	const response = (await apiRequest.call(this, itemIndex, 'GET', endpoint)) as number;

	return {
		json: { results: [response] },
	};
}
