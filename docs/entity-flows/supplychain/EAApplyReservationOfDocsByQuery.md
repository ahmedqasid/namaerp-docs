---
title: EAApplyReservationOfDocsByQuery
module: supplychain
---


<div class='entity-flows'>

# EAApplyReservationOfDocsByQuery

**This document was generated using Claude.ai**

## Overview

Applies inventory reservations to supply chain documents identified by a custom SQL query. Sets the cancelReservation flag to false on documents, enabling inventory reservation and preventing other processes from using the reserved inventory quantities.

## When This Action Runs

Manual execution when inventory reservations need to be applied to specific documents. Typically used to reserve inventory for sales orders, transfer requests, or production orders based on criteria like due dates, customer priorities, or document status.

## How It Works

1. **Executes query** - Runs the provided SQL query to identify documents for reservation
2. **Validates results** - Checks that query returns valid entity types and IDs
3. **Processes each document** - Iterates through found documents
4. **Validates document state** - Ensures document is committed and not already reserved
5. **Applies reservation** - Sets cancelReservation flag to false
6. **Commits changes** - Saves the updated document with reservation applied

## Parameters

**Parameter 1:** SQL Query (Required) - Query to select documents for inventory reservation

## Example Query

```sql
select entityType,id from ReservationDocument where dueDate = GETDATE()
```

## Query Requirements

- Must return two columns: entityType and id
- entityType should be valid supply chain document types
- id should be valid document IDs

## Database Tables Affected

- **Supply Chain Documents** - Updates cancelReservation flag to false on selected documents

## Important Warnings

### ⚠️ Query Dependency
- Entire action depends on provided SQL query
- Invalid SQL syntax causes action failure
- Query must return entityType and id columns in correct order

### ⚠️ Inventory Reservation Impact
- Applies reservations that prevent inventory from being used elsewhere
- Reserved inventory reduces available quantities for other orders
- May cause inventory shortages for non-reserved documents

### ⚠️ Document State Validation
- Only processes committed documents (commitedBefore = true)
- Skips documents that already have reservations applied
- Uncommitted documents are ignored silently

### ⚠️ Entity Type Validation
- Query must return valid supply chain document entity types
- Invalid entity types cause document lookup failures
- Mixed entity types require careful query construction

### ⚠️ Document ID Validation
- Query must return valid document IDs that exist in the database
- Non-existent IDs are skipped silently
- Deleted or archived documents may cause lookup failures

### ⚠️ Business Logic Integration
- Reservation changes may trigger inventory recalculations
- Other processes depend on reservation status for availability checks
- Consider impact on inventory allocation algorithms

### ⚠️ Error Accumulation
- Uses accumulating result pattern for error collection
- Single document failure stops processing of remaining documents
- Failed documents prevent bulk reservation operations

### ⚠️ Document Locking
- Puts each document in edit mode before updating
- May cause locking conflicts if documents are being edited elsewhere
- Consider timing and user coordination

### ⚠️ Reservation Logic Consistency
- Opposite function of EACancelReservationOfDocsByQuery
- Ensure consistent use of reservation flags across business processes
- Mixed reservation states may cause inventory calculation errors

### ⚠️ Performance Considerations
- Processes documents sequentially, not in parallel
- Large query results may take significant time to process
- Database locking during document updates may impact performance

### ⚠️ Customer Order Impact
- Applying reservations may affect customer order fulfillment
- Reserved inventory may prevent fulfillment of higher-priority orders
- Consider business rules for reservation priority

### ⚠️ Warehouse Operations
- Reservations affect inventory picking and allocation processes
- May impact warehouse efficiency and order processing
- Coordinate with warehouse management systems

### ⚠️ Production Planning
- Reservations may affect material availability for production
- Consider impact on production schedules and material requirements
- Coordinate with manufacturing planning systems

### ⚠️ Query Result Filtering
- Empty query results complete successfully with no changes
- Null or invalid entity types/IDs are skipped without error
- May mask query logic issues

### ⚠️ Audit Trail
- Reservation changes are logged as document modifications
- Track reservation applications for inventory auditing
- Consider compliance requirements for inventory management

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.EAApplyReservationOfDocsByQuery`

**Related Actions:**
- [EACancelReservationOfDocsByQuery](EACancelReservationOfDocsByQuery.md)


</div>

