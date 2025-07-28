---
title: EACancelReservationOfDocsByQuery
module: supplychain
---


<div class='entity-flows'>

# EACancelReservationOfDocsByQuery

**This document was generated using Claude.ai**

## Overview

Bulk cancels inventory reservations for supply chain documents identified by SQL query. Changes the CancelReservation flag to true on multiple documents, releasing reserved inventory back to available stock.

## When This Action Runs

Manual execution to release inventory reservations in bulk, typically for expired reservations, cancelled orders, or inventory cleanup operations.

## How It Works

1. **Executes SQL query** - Retrieves list of documents to process
2. **Validates each document** - Ensures document exists and was previously committed
3. **Checks reservation status** - Skips documents already cancelled to avoid redundant processing
4. **Updates reservation flag** - Sets CancelReservation=true on each document
5. **Commits changes** - Saves updated documents to trigger reservation cancellation

## Parameters

**Parameter 1:** Query (Required) - SQL query returning entityType and id columns

```sql
select entityType,id from ReservationDocument 
where dueDate < GETDATE()
```

## Database Tables Affected

- **Document Tables** - Updates CancelReservation flag on target documents
- **Inventory Reservation Tables** - Indirectly releases reserved quantities
- **Query Target Tables** - Reads from tables specified in the SQL query

## Important Warnings

### ⚠️ Query Requirements
- Must return exactly 2 columns: entityType and id
- Both columns required for proper document identification
- Invalid queries or missing columns skip processing

### ⚠️ Document Validation
- Only processes previously committed documents (CommitedBefore=true)
- Non-existent or uncommitted documents are skipped
- Already cancelled documents are ignored

### ⚠️ Inventory Impact
- Releases reserved inventory back to available stock
- May affect pending orders relying on reservations
- Consider impact on fulfillment operations

### ⚠️ Bulk Operation Risks
- Processes all documents returned by query
- No limit on number of documents affected
- Test query scope carefully before execution

### ⚠️ Transaction Handling
- Each document commits individually
- Failures stop processing remaining documents
- Partial completion possible if errors occur

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.EACancelReservationOfDocsByQuery`

**Related Actions:**
- [EAApplyReservationOfDocsByQuery](EAApplyReservationOfDocsByQuery.md) - Opposite action to apply reservations


</div>

