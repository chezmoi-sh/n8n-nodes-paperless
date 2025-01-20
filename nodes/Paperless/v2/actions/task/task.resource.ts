import { INodeProperties } from 'n8n-workflow';

import * as get from './get.operation';

export { get };

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		default: 'get',
		displayOptions: {
			show: { resource: ['task'] },
		},
		noDataExpression: true,
		options: [
			{
				name: 'Get a Task',
				value: 'get',
				action: 'Get a task',
			},
		],
		type: 'options',
	},
	...get.description,
];
