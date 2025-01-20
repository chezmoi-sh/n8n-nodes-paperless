import type { AllEntities } from 'n8n-workflow';

export type PaperlessType = AllEntities<{
	asn: 'next';
	correspondent: 'create' | 'get' | 'list' | 'remove' | 'update';
	custom_field: 'create' | 'get' | 'list' | 'remove' | 'update';
	document:
		| 'create'
		| 'list'
		| 'get'
		| 'get_history'
		| 'get_metadata'
		| 'get_metadata_suggestions'
		| 'get_preview'
		| 'get_sharelink'
		| 'remove'
		| 'update';
	document_metadata: 'suggest';
	document_note: 'create' | 'list' | 'remove';
	document_type: 'create' | 'get' | 'list' | 'remove' | 'update';
	tag: 'create' | 'get' | 'list' | 'remove' | 'update';
	task: 'get';
}>;
