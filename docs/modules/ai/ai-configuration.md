# AI Module Configuration

Before the [AI assistant](./ai-assistant.md) answers a question, or an [MCP client](./ai-mcp-server.md) connects to the system, the module needs basic setup: **which language model do you use? with which key? and where is the semantic index stored?** All of that is configured in the **AI Module settings**, which are system-wide.

::: info Required License
These settings require the AI module to be installed and licensed.
:::

## Chat Models (Models Definition)

The heart of the setup is the **Models Definition** grid: each line is a language model that becomes available to pick in the assistant window. For each model:

| Field | Role |
|---|---|
| **Cloud Provider** | The service provider (see the list below) |
| **Model Name** | The model name/id at the provider, such as `gpt-4o` or `claude-...` |
| **Model URL** | The endpoint address — usually filled automatically per provider, and set manually for compatible or self-hosted providers |
| **API Key** | The authentication key at the provider (stored encrypted) |
| **Top P** | An optional parameter controlling answer diversity |

::: tip More than one model at once
Define several models to let the user pick the most suitable one for each task from the model list at the top of the assistant window — an economical, fast model for everyday questions and a stronger one for complex analysis.
:::

### Supported Providers

The module supports eleven providers:

| Provider | Provider |
|---|---|
| OpenAI | Anthropic |
| Google Gemini | AWS (Bedrock) |
| DeepSeek | GCP |
| Mistral | Azure |
| Zhipu AI | Hugging Face |
| OpenAI Compatible (compatible / self-hosted endpoints) | |

## Semantic Search and Embedding Setup

Many of the module's capabilities rest on **semantic search**: instead of matching text literally, the system turns records and documents into numeric representations (embeddings) stored in a **vector store**, making it possible to find the record "closest" to a meaning rather than just its text. This is what lets the assistant understand an approximate customer name, or find the right documentation passage for a question.

### Semantic Index Settings

The semantic search infrastructure is configured in the module settings themselves:

| Field | Role |
|---|---|
| **Open AI Embedding Key** | The OpenAI key used to generate embeddings |
| **Text Embedding Model** | The embedding model: `text-embedding-3-small`, `text-embedding-3-large`, or `text-embedding-ada-002` |
| **Vector Store URI** | The vector store address (Zilliz or Milvus) |
| **Vector Store Token** | The access token for the vector store |
| **Vector Store Username / Password** | Alternative vector store credentials (optional) |

### Choosing the Indexed Entities

Deciding **which records get indexed** is done in the **AI Record Embedding Config** screen: each line holds:

- **Master File Entity Type**: the master file type to index (customers, items, vendors, ...).
- **Extra Fields For Embedding**: extra fields included in the index to improve match accuracy (alongside the code and name).

Once indexed, the type becomes available for semantic search: the assistant — and query tools with a reference parameter — can find the record from free text rather than the explicit code (see [Type 1: Query Based](./ai-tool-definitions.md#Type-1-Query-Based)).

::: warning Without indexing the system still works, but without "guessing"
Semantic search is optional: the tools and the assistant work with explicit codes without any embedding setup. But finding references from free text, and semantic documentation search, do not work until the vector store is configured and the required entities are indexed.
:::

## What You Need Before Connecting an MCP Client

Connecting an external client through the [MCP server](./ai-mcp-server.md) requires — in addition to the above — a committed **API Credentials** record linked to a user via the **Login As User** field. The endpoint, authentication, and client-setup details are in the [Nama ERP MCP Server guide](./ai-mcp-server.md).
