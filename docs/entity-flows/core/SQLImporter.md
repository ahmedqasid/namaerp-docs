---
title: SQLImporter
module: core
---


<div class='entity-flows'>

# SQLImporter

**This document was generated using Claude.ai**

## Overview

Imports entities from SQL query results and saves them as committed records immediately. Executes multiple SQL statements to fetch data, processes the results into entity format, and creates fully committed entities that are immediately available in the system.

## When This Action Runs

Manual execution for bulk data import from trusted sources, automated data synchronization, or creating production-ready entities directly from SQL queries without manual review.

## How It Works

1. **Executes SQL queries** - Runs all provided SQL statements in sequence
2. **Processes results** - Converts SQL result rows into import format with column mapping
3. **Formats data types** - Handles dates, decimals, UUIDs, and other data types appropriately
4. **Creates committed entities** - Imports results as fully committed entities using the import framework
5. **Handles errors** - Collects and reports any import errors that occur

## Parameters

**Parameter 1:** Update SQL (Optional) - SQL statement to run during import process for updates

**Parameter 2:** SQL Statement 1 (Required) - Main SQL query for entity import with column mapping

**Parameter 3:** SQL Statement 2 (Optional) - Additional SQL query for detail records or related data

**Parameter 4:** SQL Statement 3 (Optional) - Third SQL query for complex imports

**Parameter 5:** SQL Statement 4 (Optional) - Fourth SQL query for extended data processing

## SQL Query Format

### Entity Record Query
```sql
select 
  '' [:-record:PurchaseOrder],
  'PurchaseOrder$#PO' book,
  'PO'+CONVERT(NVARCHAR(10), GETDATE(), 112) code,
  'PurchaseOrder$#PO' term,
  getdate() valueDate
```

### Detail Record Query
```sql
select 
  '' [:-detail:details],
  'PO'+CONVERT(NVARCHAR(10), GETDATE(), 112) #code,
  i.code [details.item.itemCode],
  i.id [details.item.item],
  i.dfMinQuantity-sum(coalesce(q.net,0)) [details.quantity.quantity.primeQty.value],
  i.primBaseUnit_id [details.quantity.quantity.primeQty.uom] 
from InvItem i 
left join ItemDimensionsQty q on q.item_id = i.id 
where i.dfMinQuantity > 0
group by i.id,i.dfMinQuantity,primBaseUnit_id,i.code
having sum(coalesce(q.net,0))<i.dfMinQuantity
```

## Database Tables Affected

- **Entity Tables** - Creates new committed entities in target entity tables
- **Source Tables** - Reads data from tables specified in SQL queries
- **Import Framework Tables** - Uses import processing system for entity creation
- **Related Business Tables** - May trigger business logic affecting accounting, inventory, etc.

## Important Warnings

### ⚠️ CRITICAL - Immediate Commitment
- **All imported entities are committed immediately to production**
- No draft status or manual review process
- Changes are permanent and affect live business data
- Use with extreme caution in production environments

### ⚠️ SQL Query Requirements
- First column in entity queries should use `[:-record:EntityType]` format
- Detail queries should use `[:-detail:collectionName]` format
- Column aliases must match entity field names exactly
- Use `#fieldName` for linking parent-child relationships

### ⚠️ Business Logic Impact
- Committed entities trigger all business rules, validations, and flows
- May cause cascading effects on accounting, inventory, and other modules
- Automatic calculations and derived fields are processed
- Integration effects with external systems may occur

### ⚠️ Simultaneous Execution Prevention
- Only one SQL import can run at a time across the entire system
- Multiple simultaneous imports are automatically blocked
- Long-running imports may delay other import operations
- Plan import timing to avoid conflicts during business hours

### ⚠️ Data Type Handling
- Dates are formatted as DD-MM-YYYY during import processing
- Decimal values use system decimal formatting
- UUID/uniqueID fields require proper byte array handling
- Null values are converted to empty strings

### ⚠️ Error Handling and Recovery
- Import errors stop the entire process and rollback changes
- All SQL statements must succeed for import to complete
- Error details are logged but import data may be lost
- Failed imports may leave partial data requiring cleanup

### ⚠️ Performance Considerations
- Large result sets may cause memory issues during processing
- Multiple SQL statements execute sequentially, not in parallel
- Complex queries with joins may impact database performance
- Business logic execution adds overhead compared to draft imports

### ⚠️ Production Safety
- **Test thoroughly in development environment first**
- Validate all SQL queries and column mappings before production use
- Consider using SQLDraftImporter for safer imports with review
- Backup data before running large imports in production

**Module:** core

**Full Class Name:** `com.namasoft.modules.commonbasic.importer.SQLImporter`

**Related Actions:**
- [SQLDraftImporter](SQLDraftImporter.md) - Creates draft entities for review before commitment
- [SQLImporterFromDifferentDataSource](SQLImporterFromDifferentDataSource.md) - Import committed entities from external database
- [SQLDraftImporterFromDifferentDataSource](SQLDraftImporterFromDifferentDataSource.md) - Import drafts from external database


</div>