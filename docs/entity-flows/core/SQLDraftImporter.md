---
title: SQLDraftImporter
module: core
---


<div class='entity-flows'>

# SQLDraftImporter

**This document was generated using Claude.ai**

## Overview

Imports entities from SQL query results and saves them as draft records. Executes multiple SQL statements to fetch data, processes the results into entity format, and creates draft entities that require manual review before committing to final state.

## When This Action Runs

Manual execution for bulk data import from external sources, automated data migration, or creating draft entities for review before final processing. Commonly used for importing purchase orders, invoices, or other entities from external systems.

## How It Works

1. **Executes SQL queries** - Runs all provided SQL statements in sequence
2. **Processes results** - Converts SQL result rows into import format with column mapping
3. **Formats data types** - Handles dates, decimals, UUIDs, and other data types appropriately
4. **Creates draft entities** - Imports results as draft entities using the import framework
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

- **Entity Tables** - Creates new draft entities in target entity tables
- **Source Tables** - Reads data from tables specified in SQL queries
- **Import Framework Tables** - Uses import processing system for entity creation

## Important Warnings

### ⚠️ SQL Query Requirements
- First column in entity queries should use `[:-record:EntityType]` format
- Detail queries should use `[:-detail:collectionName]` format
- Column aliases must match entity field names exactly
- Use `#fieldName` for linking parent-child relationships

### ⚠️ Draft Entity Creation
- **All imported entities are created as drafts only**
- Draft entities require manual review and commitment
- Draft status allows import validation without affecting production data
- Use entity commit operations after import validation

### ⚠️ Simultaneous Execution Prevention
- Only one SQL import can run at a time across the entire system
- Multiple simultaneous imports are automatically blocked
- Long-running imports may delay other import operations
- Plan import timing to avoid conflicts

### ⚠️ Data Type Handling
- Dates are formatted as DD-MM-YYYY during import processing
- Decimal values use system decimal formatting
- UUID/uniqueID fields require proper byte array handling
- Null values are converted to empty strings

### ⚠️ Error Handling and Recovery
- Import errors stop the entire process and rollback changes
- All SQL statements must succeed for import to complete
- Error details are logged but import data may be lost
- Test queries thoroughly before production import

### ⚠️ Column Mapping and Validation
- Column aliases must exactly match entity field structure
- Invalid field references cause import failures
- Required entity fields must be provided in SQL results
- Field validation occurs during entity creation

**Module:** core

**Full Class Name:** `com.namasoft.modules.commonbasic.importer.SQLDraftImporter`

**Related Actions:**
- [SQLImporter](SQLImporter.md) - Creates committed entities instead of drafts
- [SQLDraftImporterFromDifferentDataSource](SQLDraftImporterFromDifferentDataSource.md) - Import from external database
- [SQLImporterFromDifferentDataSource](SQLImporterFromDifferentDataSource.md) - Import committed entities from external database


</div>

