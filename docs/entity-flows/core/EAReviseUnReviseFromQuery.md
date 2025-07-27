---
title: EAReviseUnReviseFromQuery
module: core
---


<div class='entity-flows'>

# EAReviseUnReviseFromQuery

**This document was generated using Claude.ai**

## Overview

Bulk marks entities as revised or unrevised based on a SQL query. Allows mass status changes for entities requiring revision control, useful for bulk document status management and workflow operations.

## When This Action Runs

Manual execution for bulk revision status changes, typically when documents need to be marked as revised after corrections, or unrevised to reset their status for further processing.

## How It Works

1. **Executes query** - Runs the provided SQL query to find entities (must return entityType and id columns)
2. **Processes results** - Extracts entity type and ID pairs from query results
3. **Optional flush** - Flushes database before starting if configured
4. **Marks entities** - Calls EntityMediator.markRevised() on each entity with specified revision status
5. **Handles errors** - Stops processing on first error

## Parameters

**Parameter 1:** Query (Required) - SQL query returning entityType and id columns
- Example Query:
```sql
select entityType,id from SalesInvoice where datediff(day,lastUpdateDate,getdate())>2 and primitiveValue = 0
```
**Parameter 2:** Revise Or Unrevise (Optional) - true to mark as revised, false to mark as unrevised (default: true)

## Database Tables Affected

- **Query Target Tables** - Reads from tables specified in the query
- **Entity Status Fields** - Updates revision status fields on target entities
- **Entity Metadata** - May update entity modification timestamps and status tracking

## Important Warnings

### ⚠️ Query Requirements
- Query must return exactly 2 columns: entityType (string) and id (uniqueID)
- Query should use proper WHERE conditions to avoid unintended mass operations
- Use {id} placeholder to reference the current entity's ID in the query

### ⚠️ Revision Control Impact
- Changes entity revision status which may affect business workflows
- Revised entities may behave differently in approval processes
- Unrevising entities may allow further modifications that were previously blocked

### ⚠️ Business Process Considerations
- Revision status changes may trigger additional business logic
- May affect document approval workflows and user permissions
- Consider impact on related entities and dependent processes

### ⚠️ Error Handling
- Processing stops on first error - no "continue on errors" option
- Failed operations may leave entities in inconsistent revision states
- Monitor carefully when processing large numbers of entities

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAReviseUnReviseFromQuery`


</div>