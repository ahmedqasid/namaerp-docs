---
title: EARegenInvTransReqFromQuery
module: supplychain
---


<div class='entity-flows'>

# EARegenInvTransReqFromQuery

**This document was generated using Claude.ai**

## Overview

Bulk regenerates inventory transaction requests for multiple supply chain documents identified by SQL query. Processes each document returned by the query to regenerate inventory transaction requests, with special handling for uncommitted documents (delete requests) versus committed documents (create requests).

## When This Action Runs

Manual execution for bulk inventory request regeneration across multiple documents, typically used for system-wide inventory corrections, data migration cleanup, or when inventory effects need to be rebuilt for a set of related documents.

## How It Works

1. **Executes SQL query** - Finds documents to process based on query criteria
2. **Processes each document** - For each document returned by the query:
   - Generates inventory transaction requests using InvSystemFilesUtils
   - Sets request type based on document commit status:
     - Delete requests for uncommitted documents (commitedBefore = false)
     - Create requests for committed documents (default behavior)
   - Sets current request context on the document
   - Runs post-creation entity actions
   - Sends business request through request system
3. **Handles errors gracefully** - Uses accumulating result pattern to collect all issues
4. **Supports transaction control** - Optional flushing and transaction management

## Parameters

**Parameter 1:** Query (Required) - SQL query returning entityType and id columns

```sql
select entityType,id from StockIssue where fromDoc_id = {id}
```

**Parameter 2:** Flush Before Starting (Optional) - true/false to flush database before processing (default: false)

**Parameter 3:** Do not RegenInvTransReq cancelled Records (Optional) - true/false to skip cancelled documents (default: true)

**Parameter 4:** Flush After Each RegenInvTransReq (Optional) - true/false to flush after each document (default: false)

**Parameter 5:** Do In New Transaction - Continue on Errors (Optional) - true/false to process remaining documents if errors occur (default: false)

**Parameter 6:** Run Update Query After Selecting Entities (Optional) - SQL update query to run before processing

## Database Tables Affected

- **Inventory Transaction Requests** - Creates or deletes inventory transaction requests
- **Inventory Transaction History** - Records inventory movements and changes
- **Item Quantities** - Updates available, allocated, and on-hand quantities
- **Inventory Locations** - Updates warehouse and location-specific quantities
- **Business Request Queue** - Queues inventory requests for processing

## Important Warnings

### ⚠️ Bulk Operation Scale
- Processes all documents returned by the query
- Large result sets may take significant time and resources
- Consider system performance and database locking during execution
- Break large operations into smaller batches if needed

### ⚠️ Document Commit Status Logic
- **Uncommitted documents (commitedBefore = false)**: Generate DELETE requests
- **Committed documents**: Generate CREATE requests (default)
- This distinction is critical for proper inventory request handling
- Ensure document commit status is accurate before processing

### ⚠️ Inventory Request Type Handling
- Delete requests reverse inventory effects for uncommitted documents
- Create requests establish inventory effects for committed documents
- Incorrect request types may cause inventory discrepancies
- Review document states and expected inventory impacts

### ⚠️ Query Result Requirements
- Query must return exactly two columns: entityType and id
- entityType must match valid supply chain document types
- Invalid query results cause processing failures
- Test query thoroughly before production execution

### ⚠️ Business Request Processing
- Each document's inventory requests are processed through business request system
- Request processing may fail due to inventory constraints or validation
- Failed requests are accumulated but processing continues for remaining documents
- Review complete result set for all processing outcomes

### ⚠️ Post-Creation Action Execution
- Runs PostInvTransReqRequestCreation entity actions for each request
- Additional business logic may be executed during processing
- Post-creation actions may have their own side effects and dependencies
- Ensure all related entity actions are properly configured

### ⚠️ Transaction and Flushing Control
- Optional database flushing controls memory usage and performance
- Transaction isolation affects concurrent operations and error recovery
- "Continue on Errors" mode allows partial success scenarios
- Choose appropriate settings based on operation requirements

### ⚠️ Error Accumulation Impact
- Individual document failures don't stop processing of remaining documents
- Partial success scenarios require careful result analysis
- Error accumulation may mask critical issues in large batches
- Review all error messages for complete understanding

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EARegenInvTransReqFromQuery`

**Parent Class:** `EARecommitFromQuery`

**Related Actions:**
- [EARegenInvTransReq](EARegenInvTransReq.md) - Single document version
- [EARecommitFromQuery](../core/EARecommitFromQuery.md) - Base class for bulk operations
- [EARegenAccFromQuery](../core/EARegenAccFromQuery.md) - Similar bulk accounting regeneration


</div>

