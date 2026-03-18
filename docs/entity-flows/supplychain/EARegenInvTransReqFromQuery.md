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

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EARegenInvTransReqFromQuery`

**Parent Class:** `EARecommitFromQuery`

**Related Actions:**
- [EARegenInvTransReq](EARegenInvTransReq.md) - Single document version
- [EARecommitFromQuery](../core/EARecommitFromQuery.md) - Base class for bulk operations
- [EARegenAccFromQuery](../core/EARegenAccFromQuery.md) - Similar bulk accounting regeneration


</div>

