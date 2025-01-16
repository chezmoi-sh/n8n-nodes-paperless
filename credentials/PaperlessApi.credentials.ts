import { ICredentialType, INodeProperties, IAuthenticateGeneric } from 'n8n-workflow';

export class PaperlessApi implements ICredentialType {
	name = 'paperlessApi';
	// eslint-disable-next-line n8n-nodes-base/cred-class-field-display-name-miscased
	displayName = 'Paperless-ngx API';
	documentationUrl = 'https://docs.paperless-ngx.com/api/#authorization'; // TODO: Create a Wiki page to link to
	properties: INodeProperties[] = [
		{
			name: 'url',
			displayName: 'Paperless-ngx API URL',
			default: 'http://paperless:8000/api',
			required: true,
			type: 'string',
			validateType: 'url',
		},
		{
			name: 'apiKey',
			displayName: 'Paperless-ngx API Key',
			default: '',
			required: true,
			type: 'string',
			typeOptions: { password: true },
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Token {{$credentials.apiKey}}',
			},
		},
	};
}
