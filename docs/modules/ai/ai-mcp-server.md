---
entities: [AIToolDefinition, APICredentials]
---

# Nama ERP MCP Server

**MCP (Model Context Protocol)** is the open standard AI assistants — such as Claude Desktop, Claude Code, and others — use to connect to external systems, read their data, and act on them. Nama ERP ships with a **built-in MCP server**: once the AI module is installed, any MCP client can connect to the system directly and use the tools defined on the [AI Tool Definition](./ai-tool-definitions.md) screen — searching records, reading documents, running reports, and even importing new records — all under a real user account with the full security model applied.

::: info Requirements
- The AI module installed and licensed — without it, the server is not mounted at all.
- A committed **API Credentials** record (the same credentials used with the REST API).
- At least one committed tool defined on the **AI Tool Definition** screen.
:::

## Server Endpoint

The server uses the **Streamable HTTP** transport at:

```
http[s]://<server-ip-or-domain>/basic-services/mcp
```

::: tip Upgrading from older versions
Older versions exposed the server over the SSE transport at `/basic-services/mcp/sse`. That endpoint has been replaced — update existing client configurations to the new URL and change the transport type from `sse` to `http`.
:::

## Authentication

The server authenticates **every request** using API credentials:

| Header | Value | Required |
|---|---|---|
| `X-API-Key` | The **Client Secret** field of the API Credentials record | Yes |
| `Authorization` | `Bearer <client secret>` — an alternative to `X-API-Key` | No |
| `X-API-Secret` | The **API Secret** field — sent only if the credential requires an extra secret | No |

(The values are also accepted under the alternative names: `apiKey`/`clientId` for the access key and `apiSecret`/`clientSecret` for the secret — as a header or as a URL parameter.)

::: tip A bearer token works too — releases dated 20260922 or later
Some clients cannot send a header of your own choosing and always authenticate the way the rest of the web does, with `Authorization: Bearer <token>`. Anthropic's MCP connector — the feature that lets Claude reach an MCP server straight from the Claude API — is the common case: it offers no way to send `X-API-Key`.

Put the **Client Secret** in the bearer token and the server accepts it; it looks at `Authorization` only when the request carried no `X-API-Key`, so nothing changes for clients that already work. Servers older than release 20260922 ignore the header and answer with an authentication failure.
:::

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
      "type": "http",
      "url": "https://my-server.example.com/basic-services/mcp",
      "headers": {
        "X-API-Key": "<client-secret>"
      }
    }
  }
}
```

### Claude Desktop

Add the same definition under `mcpServers` in `claude_desktop_config.json`.

### Claude's MCP connector

Claude can also reach the server straight from the Claude API, with no MCP client of yours in between. That connector authenticates only with a bearer token, so give it the endpoint URL and put the credential's **Client Secret** in its authorization-token field — there is no place to add `X-API-Key`. This needs a server on release 20260922 or later.

### MCP Inspector

The protocol's official inspector works straight from the browser (the server allows CORS requests): choose the `Streamable HTTP` transport, enter the URL, and add the authentication header.

After connecting, list the tools from the client — you will find every committed, non-inactive tool from the AI Tool Definition screen, and any change to the definitions is picked up automatically on the next connection.

::: info Not just the export tools
The server exposes **every** committed tool the linked user is allowed to use — query, report, entity-flow, and system tools — not only the export tools. This page details the export tools because of their importance with external clients; the other types are documented in [AI Tool Definitions](./ai-tool-definitions.md).
:::

## The Record Export/Import Tools

The most useful group for external MCP clients is the export/import system tools — nine of them, from three tool classes, all added in one click with the **Add Export Tools** button on the System Tool page of the tool definition screen (see [AI Tool Definitions](./ai-tool-definitions.md)).

The tools are named with a prefix taken from the tool definition (the Tool Name, Alt Code, or code field). The examples below assume the prefix is `import`.

### import_ResolveEntityType — resolve a term to an entity type

The starting point for any client that does not know Nama's internal entity names. Send an Arabic or English term and receive the matching entity types with their translated names.

| Parameter | Required | Description |
|---|---|---|
| `query` | No | The term to search for, such as `فاتورة مبيعات` or `sales invoice`. Leave it out, or send `*`, to browse the whole list instead |
| `page` | No | 1-based page number, for browse mode |
| `pageSize` | No | Page size for browse mode — default 50, maximum 200 |

Returns up to 25 matches, each carrying `entityType` (the internal name such as `SalesInvoice`) plus the Arabic and English names. In browse mode it returns `totalEntityTypes` and the requested page of them. The `entityType` value it gives back is the canonical one and can be passed verbatim — it is case-sensitive — to every other tool.

### import_DescribeFields — the fields you may filter on

Lists the fields of an entity that can be used as `FindRecords` criteria, each with its type, whether it is required, the allowed values of an enum, the target entity of a reference, and the collection it belongs to.

| Parameter | Required | Description |
|---|---|---|
| `entityType` | Yes | The entity type to describe, such as `SalesInvoice` |
| `collections` | No | Detail collections to include as well (comma-separated names, such as `invoiceLines`) — header fields are always included |

This is not the same list as `GetImportSchema`: it also carries system fields such as `creationDate`, which can be searched on but never imported, and it flags calculated fields, which may not be filterable at all.

### import_SearchByTranslation — find an entity, a field or an option by its name

The widest of the discovery tools: one Arabic or English term in, and everything it could mean out — entity types, fields of any entity, and enum constants, each with both its names.

| Parameter | Required | Description |
|---|---|---|
| `query` | Yes | The Arabic or English term to look for |
| `limit` | No | Maximum matches to return — default 25, maximum 100 |

Every match carries a `kind`: `entity` (with its `entityType`), `field` (with the `entityType` and `fieldId`) or `enum` (with the `enumType` and `value`). Use it when you know what the user called something but not which of the three it is.

### import_FindRecords — search records

A paged search over an entity type's records, going through the standard list gate so list security and dimension filtering apply.

| Parameter | Required | Description |
|---|---|---|
| `entityType` | Yes | The entity type, such as `SalesInvoice` |
| `criteria` | No | A Nama [text-criteria filter](../../platform/text-criteria-guide.md) — each condition is `fieldId,operator,value,logic;`, such as `code,Equal,INV-1,AND;` or `valueDate,GreaterThanOrEqual,01-01-2024,AND;` (dates use `dd-MM-yyyy`) |
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
| `fieldId` | No | The field id, such as `invoiceLines.discountType`. Accepts several, comma-separated; leave it out to get every enum field of the entity |

Returns the value list with each value's Arabic and English titles — useful before importing, to send the correct constants.

### import_GetEntitySchema — the tables and columns behind an entity

Where the other tools speak in field ids, this one answers in SQL: the entity's table name, its columns with their types and — for a reference column — the entity it points at, its foreign-key columns, and the same for every detail collection, including the child table and the column that joins it to the header.

| Parameter | Required | Description |
|---|---|---|
| `entityType` | Yes | The entity type, such as `SalesInvoice` |

You need it when you are writing something that queries the database directly rather than going through the entity gates — a read-only SQL tool, or a report.

### import_GetImportSchema — the import schema

Describes how to build a record for an entity type: every field with its type and whether it is required, the allowed values of enum fields, the target entity type of reference fields (references are written by code), and the nested structure of detail collections (such as invoice lines).

| Parameter | Required | Description |
|---|---|---|
| `entityType` | Yes | The entity type |
| `mode` | No | `visible` (default): on-screen fields — what a user would normally fill — or `all`: every importable field |
| `collections` | No | Limit the returned detail collections (comma-separated names, such as `invoiceLines`) — header fields are always included |

The response also carries an `example`: a skeleton record with placeholder values in exactly the shape `ImportRecord` expects. Amounts and quantities keep their real nesting rather than dotted keys — a journal-entry debit, for instance, is `"debit": { "value": { "amount": 1500, "currency": "EGP" }, "rate": 1, "localAmount": 1500 }`. Date fields carry a `format` hint: a date is written day-first as `dd-MM-yyyy` or ISO as `yyyy-MM-dd`, and a date-and-time as `yyyy-MM-dd'T'HH:mm` (a date alone is taken as midnight).

### import_ImportRecord — import records

Imports one or more records in Nama's JSON format: an object keyed by entity type, each key holding an array of records.

| Parameter | Required | Description |
|---|---|---|
| `recordsJson` | Yes | The records to import |
| `importMode` | Yes | `CreateOnly`: only add records — a code that already exists is an error; `UpdateOnly`: only change existing records — an unknown code is an error; `CreateOrUpdate`: allow both. Records are matched by code, so `CreateOnly` is the safe choice whenever the intent is to add |
| `saveAsDraft` | No | `true`: save as an uncommitted draft — `false` (default): save and commit |
| `appendDetailLines` | No | Only matters when an existing record is updated: `true` keeps its current detail lines and adds the sent ones after them — `false` (default) replaces them, so any line not sent is lost |

**Codes.** A document whose book numbers automatically (or a master file whose group does) needs no `code`: leave it out and the real number is assigned on commit. A placeholder that starts with the book prefix and ends in `@draft` — `JE1000@draft`, say — is accepted too and replaced the same way. The `@draft` suffix only marks the code as a placeholder; whether the record is committed is decided by `saveAsDraft` alone. A committed record can still come back as *pending approval* when an approval definition matches it — that is the approval feature, not the import.

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
