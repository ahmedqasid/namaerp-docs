---
title: EARecalculateSrvcOperationsAndMaterialsPricesFromQuery
module: srvcenter
---


<div class='entity-flows'>

# EARecalculateSrvcOperationsAndMaterialsPricesFromQuery

**This document was generated using Claude.ai**

## Overview

Bulk recalculates pricing for service operations and materials on multiple service center jobs using a custom SQL query to identify target jobs. Applies the same pricing recalculation logic as individual job updates but processes multiple jobs in batch for efficiency.

## When This Action Runs

Manual execution for bulk pricing updates across multiple service jobs. Typically used after system-wide price changes, master data updates, or when multiple jobs need pricing refreshed based on specific criteria like date ranges, customers, or job types.

## How It Works

1. **Executes query** - Runs the provided SQL query to find service jobs to update
2. **Processes each job** - Iterates through found jobs in separate transactions
3. **Applies pricing recalculation** - Calls the individual job pricing recalculation action
4. **Accumulates results** - Collects success/failure status for each job processed

## Parameters

**Parameter 1:** SQL Query (Required) - Query to select service jobs for pricing recalculation

## Example Query

```sql
SELECT entityType, id FROM SrvCenterJob 
WHERE valueDate >= '2024-01-01' AND status = 'Draft'
```

## Query Requirements

- Must return two columns: entityType and id
- entityType should be service center job entity types
- id should be valid job IDs

## Database Tables Affected

- **Service Job Tasks** - Updates hour prices, total hours, and total prices
- **Service Job Materials** - Updates unit prices  
- **Service Operations** - References operation pricing data (read-only)
- **Task Definitions** - References task pricing data (read-only)
- **Item Master** - References material pricing data (read-only)

## Important Warnings

### ⚠️ Query Dependency
- Entire action depends on provided SQL query
- Invalid SQL syntax causes action failure
- Query must return entityType and id columns in correct order

### ⚠️ Bulk Price Overwriting
- Overwrites pricing on ALL jobs returned by query without warning
- Manual price adjustments on all affected jobs will be lost
- No backup of previous pricing values across multiple jobs

### ⚠️ Transaction Isolation
- Each job processed in separate transaction
- Failed job processing doesn't affect other jobs
- Partial success possible if some jobs fail

### ⚠️ Entity Type Validation
- Query must return valid service center job entity types
- Invalid entity types cause job lookup failures
- Mixed entity types require careful query construction

### ⚠️ Job ID Validation
- Query must return valid job IDs that exist in the database
- Non-existent IDs are skipped silently
- Deleted or archived jobs may cause lookup failures

### ⚠️ Performance Impact
- Processes jobs sequentially, not in parallel
- Each job triggers extensive pricing calculations
- Large query results may cause significant processing time

### ⚠️ Master Data Dependencies
- All jobs depend on accurate pricing in operation definitions
- Material pricing relies on current item master data
- Inconsistent master data causes inconsistent pricing across jobs

### ⚠️ Job State Requirements
- Jobs must be in editable state for pricing updates
- Committed or locked jobs fail to update
- Mixed job states in query results cause partial failures

### ⚠️ Error Propagation
- Failed transactions throw exceptions and stop processing
- Single job failure prevents processing remaining jobs
- Error accumulation may leave some jobs unprocessed

### ⚠️ Configuration Consistency
- Service price strategy configuration affects all job pricing
- Configuration changes during processing may cause inconsistent results
- Ensure stable configuration during bulk operations

### ⚠️ Business Rule Impact
- Applies same pricing rules to all jobs regardless of context
- May override manual pricing decisions across multiple jobs
- Consider approval workflows for bulk pricing changes

### ⚠️ Query Performance
- Complex queries may take significant time to execute
- Large result sets increase processing time exponentially
- Consider query optimization and result limiting

### ⚠️ Concurrent Access
- Other users modifying jobs simultaneously may cause conflicts
- Bulk processing may interfere with ongoing job operations
- Consider system timing and user coordination

### ⚠️ System Resources
- Large batch operations consume significant memory and CPU
- Database locks during transaction processing
- Monitor system performance during bulk operations

### ⚠️ Audit Trail Impact
- Multiple job modifications appear as system changes
- Bulk changes may obscure audit trail clarity
- Consider logging or notification requirements

**Module:** srvcenter

**Full Class Name:** `com.namasoft.modules.srvcenter.domain.utils.EARecalculateSrvcOperationsAndMaterialsPricesFromQuery`


</div>

