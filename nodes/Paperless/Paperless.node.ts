/* eslint-disable n8n-nodes-base/node-filename-against-convention */
import { VersionedNodeType, INodeTypeBaseDescription, IVersionedNodeType } from 'n8n-workflow';
import { PaperlessV2 } from './v2/PaperlessV2.node';

export class Paperless extends VersionedNodeType {
	constructor() {
		const baseDescription: INodeTypeBaseDescription = {
			displayName: 'Paperless-ngx',
			name: 'paperless',
			defaultVersion: 2,
			description: 'Consume documents and metadata from Paperless-ngx API',
			group: ['input'],
			icon: 'file:paperless-ngx.svg',
		};

		const nodeVersions: IVersionedNodeType['nodeVersions'] = {
			2: new PaperlessV2(baseDescription),
		};

		super(nodeVersions, baseDescription);
	}
}
