# Nama ERP MCP Server

**MCP (Model Context Protocol)** is the open standard AI assistants — such as Claude Desktop, Claude Code, and others — use to connect to external systems, read their data, and act on them. Nama ERP ships with a **built-in MCP server**: once the AI module is installed, any MCP client can connect to the system directly and use the tools defined on the [AI Tool Definition](./ai-tool-definitions.md) screen — searching records, reading documents, running reports, and even importing new records — all under a real user account with the full security model applied.

::: info Requirements
- The AI module installed and licensed — without it, the server is not mounted at all.
- A committed **API Credentials** record (the same credentials used with the REST API).
- At least one committed tool defined on the **AI Tool Definition** screen.
:::

## Server Endpoint

The server uses the **SSE (Server-Sent Events)** transport at:

```
http[s]://<server-ip-or-domain>/basic-services/mcp/sse
```

(The server automatically advertises the correct `/basic-services/mcp/message` message endpoint.)

## Authentication

The server authenticates **every request** using API credentials:

| Header | Value | Required |
|---|---|---|
| `X-API-Key` | The **Client Secret** field of the API Credentials record | Yes |
| `X-API-Secret` | The **API Secret** field — sent only if the credential requires an extra secret | No |

(The values are also accepted under the alternative names: `apiKey`/`clientId` for the access key and `apiSecret`/`clientSecret` for the secret — as a header or as a URL parameter.)

The **API Credentials** record maps the credentials to a specific user through its **Login As User** field, and supports a validity window (**Valid From / Valid To**) and disabling (**Prevent Login**). Every tool the client calls executes as that user: record security, dimensions (legal entity, branch, ...), and validation rules all apply exactly as if the user were working from the system screens.

::: warning Protect the credentials
An MCP client connected with these credentials can do everything the mapped user can — including creating records if the import tools are enabled. Dedicate a user with carefully measured permissions for this purpose, and restrict sensitive tools through the access-control grid on the tool definition.
:::

## Client Setup

### Claude Code

Add the server to the project's `.mcp.json`:

```json
{
  "mcpServers": {
    "nama-erp": {
      "type": "sse",
      "url": "https://my-server.example.com/basic-services/mcp/sse",
      "headers": {
        "X-API-Key": "<client-secret>"
      }
    }
  }
}
```

### Claude Desktop

Add the same definition under `mcpServers` in `claude_desktop_config.json`.

### MCP Inspector

The protocol's official inspector works straight from the browser (the server allows CORS requests): choose the `SSE` transport, enter the URL, and add the authentication header.

After connecting, list the tools from the client — you will find every committed, non-inactive tool from the AI Tool Definition screen, and any change to the definitions is picked up automatically on the next connection.

::: info Not just the export tools
The server exposes **every** committed tool the linked user is allowed to use — query, report, entity-flow, and system tools — not only the six export tools. This page details the export tools because of their importance with external clients; the other types are documented in [AI Tool Definitions](./ai-tool-definitions.md).
:::

## The Record Export/Import Tools

The most useful group for external MCP clients is the six export/import system tools, added in one click with the **Add Export Tools** button on the System Tool page of the tool definition screen (see [AI Tool Definitions](./ai-tool-definitions.md)).

The tools are named with a prefix taken from the tool definition (the Tool Name, Alt Code, or code field). The examples below assume the prefix is `import`.

### import_ResolveEntityType — resolve a term to an entity type

The starting point for any client that does not know Nama's internal entity names. Send an Arabic or English term and receive the matching entity types with their translated names.

| Parameter | Required | Description |
|---|---|---|
| `query` | Yes | The term to search for, such as `فاتورة مبيعات` or `sales invoice` |

Returns up to 25 matches, each carrying `entityType` (the internal name such as `SalesInvoice`) plus the Arabic and English names.

### import_FindRecords — search records

A paged search over an entity type's records, going through the standard list gate so list security and dimension filtering apply.

| Parameter | Required | Description |
|---|---|---|
| `entityType` | Yes | The entity type, such as `SalesInvoice` |
| `criteria` | No | A Nama criteria expression, such as `code = 'INV-1'` or `the60 >= '2024-01-01'` |
| `fields` | No | Extra field ids to return in each row (comma-separated) — `id` and `code` are always returned |
| `orderBy` | No | A field id to order by |
| `page` | No | 1-based page number |
| `pageSize` | No | Page size — default 25, maximum 200 |

Returns `totalRecordsCount`, the page number and size, and the `records` array.

### import_GetRecord — read a record

Reads a single record as JSON through the standard read gate. The output has the same shape used for import, so a record can be read, edited, and imported back.

| Parameter | Required | Description |
|---|---|---|
| `entityType` | Yes | The entity type |
| `idOrCode` | Yes | The record's business code or id |
| `mode` | No | `visible` (default): only on-screen fields — or `all`: every field |
| `fields` | No | Specific field ids to return on their own (overrides `mode`) |

### import_GetEnumValues — allowed values of an enum field

| Parameter | Required | Description |
|---|---|---|
| `entityType` | Yes | The entity type owning the field |
| `fieldId` | Yes | The field id, such as `invoiceLines.discountType` |

Returns the value list with each value's Arabic and English titles — useful before importing, to send the correct constants.

### import_GetImportSchema — the import schema

Describes how to build a record for an entity type: every field with its type and whether it is required, the allowed values of enum fields, the target entity type of reference fields (references are written by code), and the nested structure of detail collections (such as invoice lines).

| Parameter | Required | Description |
|---|---|---|
| `entityType` | Yes | The entity type |
| `mode` | No | `visible` (default): on-screen fields — what a user would normally fill — or `all`: every importable field |
| `collections` | No | Limit the returned detail collections (comma-separated names, such as `invoiceLines`) — header fields are always included |

### import_ImportRecord — import records

Imports one or more records in Nama's JSON format: an object keyed by entity type, each key holding an array of records.

| Parameter | Required | Description |
|---|---|---|
| `recordsJson` | Yes | The records to import |
| `saveAsDraft` | No | `true`: save as an uncommitted draft — `false` (default): save and commit |

The general shape:

```json
{
  "SalesInvoice": [
    {
      "code": "INV-1001",
      "customer": "C-0005",
      "invoiceLines": [ { "...": "line fields as described by the import schema" } ]
    }
  ]
}
```

(References — such as the customer and the item — are written directly by code; the exact structure of each entity is what `GetImportSchema` returns, and the safest approach is for the client to read an existing record with `GetRecord` and mirror its shape.)

Records are persisted through the standard entity gate, so all validations and effects (journal entries, inventory transactions, ...) work exactly as if the record were entered from the screen. If a record fails, the error details are returned to the model so it can correct and retry.

## A Complete Workflow

The usual pattern an MCP client follows to import data:

1. **import_ResolveEntityType**: "sales invoice" → `SalesInvoice`.
2. **import_GetImportSchema**: learn the required fields and the invoice-lines structure.
3. **import_GetEnumValues**: the correct constants for enum fields (the discount type, for example).
4. **import_FindRecords**: find the reference codes (customer, item) before using them.
5. **import_ImportRecord**: import as a draft first for review, or save and commit directly.
6. **import_GetRecord**: read the imported record back to verify the result.
