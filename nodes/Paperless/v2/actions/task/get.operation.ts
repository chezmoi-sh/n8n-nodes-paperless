import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeProperties,
	NodeOperationError,
} from 'n8n-workflow';
import { apiRequestPaginated } from '../../transport';

export const description: INodeProperties[] = [
	{
		displayName: 'ID',
		name: 'id',
		default: '',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['get'],
			},
		},
		placeholder: 'ID of the task',
		required: true,
		type: 'string',
	},
];

export async function execute(
	this: IExecuteFunctions,
	itemIndex: number,
): Promise<INodeExecutionData> {
	const endpoint = `/tasks/`;
	const responses = (await apiRequestPaginated.call(this, itemIndex, 'GET', endpoint)) as any[];

	const task_id = this.getNodeParameter('id', itemIndex);
	const task = responses
		.map((response) => response.body)
		.flat()
		.find((task: any) => task.task_id === task_id);

	if (!task) {
		throw new NodeOperationError(this.getNode(), `Task with ID ${task_id} not found.`);
	}

	return {
		json: { results: [task] },
	};
}
