---
title: EACancelReservationOFSalesInitialDoc
module: realestate
---


<div class='entity-flows'>

# EACancelReservationOFSalesInitialDoc

**This document was generated using Claude.ai**

## Overview

Cancels estate reservations for initial sales contracts by setting the reserveEstate flag to false. Uses a custom SQL query to identify which contracts should have their reservations cancelled, enabling bulk processing of expired or unwanted reservations.

## When This Action Runs

Manual execution when estate reservations need to be cancelled in bulk. Typically used for expired reservations, cancelled contracts, or administrative cleanup when initial sales contracts no longer require estate reservation status.

## How It Works

1. **Executes custom query** - Runs the provided SQL query to find contract IDs
2. **Processes each contract** - Iterates through found contract IDs
3. **Loads contract** - Retrieves each REInitialSalesContract by ID
4. **Starts editing** - Puts the contract in edit mode
5. **Cancels reservation** - Sets reserveEstate flag to false
6. **Commits changes** - Saves the updated contract
7. **Accumulates results** - Collects success/failure status for each contract

## Parameters

**Parameter 1:** SQL Query (Required) - Query to select contract IDs that should have reservations cancelled

## Example Query

```sql
select id from REInitialSalesContract where toDate < GETDATE() and reserveEstate = 1
```

## Database Tables Affected

- **REInitialSalesContract** - Updates the reserveEstate field to false for selected contracts

## Important Warnings

### ⚠️ Query Dependency
- Entire action depends on provided SQL query
- Invalid SQL syntax causes action failure
- Query must return contract IDs in first column

### ⚠️ Reservation Impact
- Cancelling reservations may make estates available to other buyers
- Consider business impact before bulk cancellation
- May affect pending sales and customer commitments

### ⚠️ Contract State Validation
- No validation of contract appropriateness for reservation cancellation
- May cancel reservations on active or committed contracts
- Consider contract status before running

### ⚠️ Transaction Processing
- Each contract processed individually within the same transaction
- Single contract failure stops entire batch
- No partial success - all or nothing processing

### ⚠️ Estate Availability
- Cancelled reservations immediately affect estate availability
- Other processes may start using newly available estates
- Coordinate with sales and inventory management

### ⚠️ Query Results Validation
- Query must return valid contract IDs
- Non-existent IDs cause processing failures
- Empty result sets complete successfully with no changes

### ⚠️ Business Rule Bypassing
- Action bypasses normal reservation cancellation workflows
- May skip required approvals or notifications
- Consider integration with business process management

### ⚠️ Audit Trail Considerations
- Changes logged as system modifications
- No specific reservation cancellation audit trail
- May need custom logging for compliance requirements

### ⚠️ Concurrent Access
- Multiple users modifying same contracts may cause conflicts
- Editing locks may prevent concurrent processing
- Consider timing and user coordination

### ⚠️ Error Accumulation
- Uses accumulating result pattern
- Single failure prevents processing remaining contracts
- Check logs for specific error details

### ⚠️ Date and Time Considerations
- Example query uses GETDATE() for current system time
- Time zone differences may affect date comparisons
- Verify date logic matches business requirements

### ⚠️ Performance Impact
- Processes contracts sequentially, not in parallel
- Large numbers of contracts may cause performance issues
- Consider breaking large batches into smaller operations

**Module:** realestate

**Full Class Name:** `com.namasoft.modules.realestate.domain.entities.EACancelReservationOFSalesInitialDoc`


</div>

