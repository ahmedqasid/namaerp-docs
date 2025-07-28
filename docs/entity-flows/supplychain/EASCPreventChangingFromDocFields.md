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

## Important Warnings

### ⚠️ Source Document Dependency
- Only validates documents that have valid fromDoc (source document) references
- Documents without source relationships are not validated
- Source document must be accessible and have stable data available
- Validation is skipped if source document cannot be found

### ⚠️ Field Protection Scope
- Field validation uses SourceLineID matcher for supply chain document comparisons
- Supports both header fields and detail line fields
- Field paths must be valid and accessible on both current and source documents
- Invalid field paths may cause validation errors

### ⚠️ Line Structure Validation
- Line addition/deletion prevention applies to all document lines by default
- Conditional queries can enable/disable validation for specific lines
- Line structure changes affect document integrity and relationships
- Consider business requirements for line modification restrictions

### ⚠️ Conditional Query Logic
- SQL queries must return numeric values (0=skip validation, >0=apply validation)
- Queries have access to both current line ({line}) and old line ({oldLine}) data
- Complex queries may impact validation performance
- Query syntax must be valid and compatible with the system

### ⚠️ Validation Error Handling
- Validation failures prevent document save operations
- Error messages do not display entity flow name for cleaner user experience
- Users must revert changes to protected fields to proceed
- No override mechanism available through parameters

### ⚠️ Data Integrity Enforcement
- Changes to protected fields are completely blocked
- Partial saves are not possible when validation fails
- Field protection is enforced at the database level
- Consider impact on legitimate business corrections

### ⚠️ Performance Considerations
- Validation compares current document with source document data
- Large documents with many lines may impact validation speed
- Complex conditional queries add processing overhead
- Monitor system performance during document processing

### ⚠️ Business Process Impact
- May prevent legitimate business corrections after source document changes
- Users cannot modify protected fields once source relationship is established
- Consider business workflow requirements before implementing
- May require alternative processes for authorized changes

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EASCPreventChangingFromDocFields`

**Parent Class:** `EAPreventChangingFields`

**Validation Type:** Source Document Relationship Protection

**Related Actions:**
- [EAPreventChangingSCDocumentCriticalFields](EAPreventChangingSCDocumentCriticalFields.md) - General critical field protection


</div>

