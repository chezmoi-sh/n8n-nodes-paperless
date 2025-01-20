import { INodeProperties } from 'n8n-workflow';

import * as next from './next.operation';

export { next };

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		default: 'next',
		displayOptions: {
			show: { resource: ['asn'] },
		},
		noDataExpression: true,
		options: [
			{
				name: 'Next',
				value: 'next',
				description: 'Get next ASN',
				action: 'Get the next ASN',
			},
		],
		type: 'options',
	},
	...next.description,
];
