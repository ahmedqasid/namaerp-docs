---
title: EAFixNextAndPreviousFromQuery
module: realestate
---


<div class='entity-flows'>

# EAFixNextAndPreviousFromQuery

**This document was generated using Claude.ai**

## Overview

Repairs and updates the chain linkages between consecutive rent contracts by fixing previous/next contract references. Processes committed rent contracts to ensure proper contract sequencing and renter history tracking through automated reference updates.

## When This Action Runs

Manual execution for data repair and maintenance. Typically used after contract imports, data migrations, or when contract chain linkages become corrupted due to system issues or manual data modifications.

## How It Works

1. **Executes query** - Runs SQL query to identify contracts that need chain fixing
2. **Processes each contract** - Iterates through found contracts in separate transactions
3. **Fills previous contract** - Updates references to the immediately preceding contract
4. **Updates previous renter** - Links to previous contract for the same renter
5. **Updates next contract** - Sets references to the immediately following contract
6. **Updates next renter** - Links to next contract for the same renter
7. **Commits changes** - All updates happen automatically without explicit saving

## Parameters

**Parameter 1:** Manual Query (Optional) - Custom SQL query to specify which contracts to fix

## Default Query

```sql
select entityType,id from RERentContract where commitedBefore = 1 
union all
select entityType,id from REOpeningRentContract where commitedBefore = 1
```

## Database Tables Affected

- **RERentContract** - Updates previous/next contract references
- **REOpeningRentContract** - Updates previous/next contract references for opening contracts
- **Contract Chain Tables** - Updates linkage information between related contracts

## Important Warnings

### ⚠️ Transaction Isolation
- Each contract processed in separate transaction
- Failed contract processing doesn't affect others
- No rollback of successfully processed contracts

### ⚠️ Automatic Reference Updates
- Contract references updated automatically by contract methods
- No explicit saving required - changes committed within transaction
- May trigger cascade updates to related data

### ⚠️ Query Dependency
- Default query processes all committed rent contracts
- Custom queries must return entityType and id columns
- Invalid queries cause action failure

### ⚠️ Contract Chain Logic
- Relies on contract business logic to determine proper linkages
- May recalculate entire contract chains for affected contracts
- Complex logic may cause unexpected reference changes

### ⚠️ Performance Considerations
- Processes contracts sequentially in separate transactions
- Each contract may trigger multiple database updates
- Large numbers of contracts may cause significant processing time

### ⚠️ Data Integrity Dependencies
- Requires accurate contract dates and renter information
- Incorrect master data may cause improper chain linkages
- Verify contract data quality before running

### ⚠️ Contract Type Handling
- Processes both regular and opening rent contracts
- Different contract types may have different chain logic
- Ensure contract type compatibility with business rules

### ⚠️ Renter-Specific Chains
- Updates both general contract sequence and renter-specific chains
- Multiple renters may have overlapping contract periods
- Complex renter scenarios may cause unexpected linkages

### ⚠️ Silent Processing
- No validation of contract appropriateness for chain fixing
- Processes all contracts returned by query without verification
- May fix chains for contracts that shouldn't be linked

### ⚠️ Concurrent Processing Risks
- Other processes modifying contracts simultaneously may cause conflicts
- Chain updates may interfere with ongoing contract operations
- Consider system timing and user activity

### ⚠️ Business Logic Dependencies
- Chain fixing relies on internal contract business methods
- Changes to contract logic may affect chain repair behavior
- Updates may trigger additional business rule processing

### ⚠️ Error Handling Limitations
- Individual transaction failures don't provide detailed error information
- No specific error reporting for chain fixing issues
- Failed contracts processed silently without accumulating errors

### ⚠️ Scope of Changes
- Updates affect both directions of contract chains (previous and next)
- May modify contracts not explicitly included in the query
- Chain repairs can have cascading effects on related contracts

**Module:** realestate

**Full Class Name:** `com.namasoft.modules.realstate.domain.utils.plugnplay.EAFixNextAndPreviousFromQuery`


</div>

