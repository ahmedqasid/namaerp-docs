---
title: EASCPreventChangingFromDocFields
module: supplychain
---


<div class='entity-flows'>

# EASCPreventChangingFromDocFields

**This document was generated using Claude.ai**

## Overview

Enforces data integrity by preventing unauthorized changes to specified fields when comparing supply chain documents with their source documents (fromDoc). Validates that protected fields, line additions, and line deletions are not modified after the source document relationship is established, with support for conditional validation using SQL queries.

## When This Action Runs

Automatic execution during document save/commit operations to validate that protected fields and line structures have not been changed relative to the source document (fromDoc). This ensures referential integrity between related supply chain documents.

## How It Works

1. **Identifies source document** - Gets the fromDoc (source document) reference from the current document
2. **Retrieves stable data** - Accesses the stable/committed version of the source document for comparison
3. **Applies field validation** - Uses SourceLineID matcher to compare specified fields between documents
4. **Validates line changes** - Checks for unauthorized line additions or deletions if configured
5. **Executes conditional queries** - Runs SQL queries to determine validation scope for specific lines
6. **Blocks unauthorized changes** - Returns validation errors if protected fields have been modified

## Parameters

**Parameter 1:** Field IDs (Required) - Comma-separated or line-separated list of fields to protect

Example:
```
code,name1
details.n1
details.item.item
```

**Parameter 2:** Prevent Adding NEW Lines (Optional) - true/false to block adding new lines (default: false)

**Parameter 3:** Prevent Deleting Lines (Optional) - true/false to block deleting existing lines (default: false)

**Parameter 4:** SQL Query for Change Validation (Optional) - Query to enable/disable field change validation per line

```sql
select case when {line.item.item.code} = 'ABC' or {oldLine.item.item.code} = 'ABC' then 1 else 0 end
```

**Parameter 5:** SQL Query for Added Lines Validation (Optional) - Query to enable/disable validation for new lines

**Parameter 6:** SQL Query for Deleted Lines Validation (Optional) - Query to enable/disable validation for deleted lines

## Database Tables Affected

- **Current Document Data** - Validates current field values (read-only validation)
- **Source Document Data** - Compares against stable source document data (read-only)

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EASCPreventChangingFromDocFields`

**Parent Class:** `EAPreventChangingFields`

**Validation Type:** Source Document Relationship Protection

**Related Actions:**
- [EAPreventChangingSCDocumentCriticalFields](EAPreventChangingSCDocumentCriticalFields.md) - General critical field protection


</div>

