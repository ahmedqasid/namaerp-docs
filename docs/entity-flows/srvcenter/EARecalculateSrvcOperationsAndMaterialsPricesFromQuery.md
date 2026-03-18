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

**Module:** srvcenter

**Full Class Name:** `com.namasoft.modules.srvcenter.domain.utils.EARecalculateSrvcOperationsAndMaterialsPricesFromQuery`


</div>

