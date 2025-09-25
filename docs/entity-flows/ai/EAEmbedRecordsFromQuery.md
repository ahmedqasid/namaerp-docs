---
title: EAEmbedRecordsFromQuery
module: ai
---

<div class='entity-flows'>

# EAEmbedRecordsFromQuery

**This document was generated using Claude.ai**

## Overview

**Description:** This entity flow processes database records to create AI embeddings (vector representations) for search and AI-powered features. It takes a SQL query that returns entity types and record IDs, then processes each record to generate embeddings that can be used for semantic search, similarity matching, and other AI operations.

**Module:** ai

**Full Class Name:** `com.namasoft.modules.ai.util.actions.EAEmbedRecordsFromQuery`

## Parameters

The entity flow requires two parameters:

1. **Parameter 1**: `-` (not used)
2. **Parameter 2**: **Records To Embed Query**
   - A SQL query that must return exactly two columns:
     - **Column 1**: `entityType` - The entity type name (e.g., 'CRMLead', 'Customer', 'Item')
     - **Column 2**: `id` - The unique ID of the record to embed

## How It Works

::: info What are AI Embeddings?
AI embeddings are numerical representations (vectors) of text content that capture semantic meaning. They allow the system to understand and compare the meaning of different records, enabling features like:
- Semantic search ("find customers similar to this one")
- Content recommendations
- Automated categorization
- Intelligent matching
:::

### Processing Flow

1. **Query Execution**: The system executes your SQL query against the database
2. **Record Processing**: For each row returned:
   - Extracts the entity type and record ID
   - Loads the complete record from the database
   - Processes the record's text content to generate embeddings
   - Stores the embeddings for future AI operations
3. **Progress Tracking**: Shows progress like "Embedding record 15 of 100"
4. **Transaction Safety**: Each record is processed in its own database transaction

::: warning Important Notes
- The system only processes records that don't already have embeddings or need updates
- Large queries may take significant time to process
- Each record is processed individually, so 1000 records = 1000 separate operations
- The system shows progress updates during processing
:::

## SQL Query Requirements

Your query must follow this exact structure:

```sql
SELECT entityType, id
FROM [TableName]
WHERE [your conditions]
```

### Required Columns

| Column Name | Type | Description | Example Values |
|-------------|------|-------------|---------------|
| `entityType` | VARCHAR | Entity type name (case-sensitive) | 'CRMLead', 'Customer', 'Item' |
| `id` | BIGINT | Record's unique identifier | 12345, 67890 |


## Common Usage Examples

### Example 1: Process Recent CRM Leads
```sql
SELECT 'CRMLead' as entityType, id
FROM CRMLead
WHERE lastUpdateDate >= '2025-09-01'
AND committed = 1
```

### Example 2: Process Customer Records by Date Range
```sql
SELECT 'Customer' as entityType, id
FROM Customer
WHERE creationDate BETWEEN '2025-01-01' AND '2025-09-30'
AND active = 1
```
 
### Example 3: Process Multiple Entity Types
```sql
SELECT 'CRMLead' as entityType, id FROM CRMLead WHERE lastUpdateDate >= '2025-09-01'
UNION ALL
SELECT 'Customer' as entityType, id FROM Customer WHERE lastUpdateDate >= '2025-09-01'
UNION ALL
SELECT 'Supplier' as entityType, id FROM Supplier WHERE lastUpdateDate >= '2025-09-01'
```

</div>