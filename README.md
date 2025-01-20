<!-- trunk-ignore-all(markdownlint/MD041) -->

![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)

# n8n-nodes-paperless

<!-- trunk-ignore-begin(markdownlint/MD033) -->
<div align="center">
	<img src="./nodes/Paperless/v2/paperless-ngx.svg" alt="Paperless Icon" height="50px">
</div>
<!-- trunk-ignore-end(markdownlint/MD033) -->

This is an n8n community node. It lets you use [Paperless-ngx](https://docs.paperless-ngx.com/) in your n8n workflows.

Paperless-ngx is a document management system that transforms your physical documents into a searchable online archive so you can keep your paper documents, but lose the cabinet.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

> [!NOTE]
> If you install this node, n8n will probably automatically install the extra npm package `form-data` (which may already be installed with n8n).

## Operations

The node supports the following resources and operations:

### ASN (Archival Series Number)

- Get next ASN

### Correspondent

- Create/Update/Delete correspondent
- Get a correspondent
- List all correspondents

### Custom Field

- Create/Update/Delete custom field
- Get a custom field
- List all custom fields

### Document

- Create/Update/Delete document
- Get a document
- Get document history
- Get document metadata
- Get metadata suggestions
- Get document preview
- Get document share links
- List all documents

### Document Metadata

- Get metadata suggestions

### Document Note

- Create/Delete document note
- List document notes

### Document Type

- Create/Update/Delete document type
- Get a document type
- List all document types

### Tag

- Create/Update/Delete tag
- Get a tag
- List all tags

### Task

- Get a task

## Credentials

You need to provide the following to authenticate:

- Paperless-ngx instance URL
- API token

To get your API token:

1. Login to your Paperless-ngx instance
2. Go to your user settings
3. Create a new API token

## Compatibility

Requires n8n version 1.0.0 or later and Paperless-ngx version 2.14.0 or later (not tested prior versions).

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Paperless-ngx documentation](https://docs.paperless-ngx.com/)
- [Paperless-ngx API documentation](https://docs.paperless-ngx.com/api/)

## License

[MIT](https://github.com/n8n-io/n8n-nodes-starter/blob/master/LICENSE.md)
