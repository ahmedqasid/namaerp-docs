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

**Module:** core

**Full Class Name:** `com.namasoft.modules.commonbasic.importer.SQLImporter`

**Related Actions:**
- [SQLDraftImporter](SQLDraftImporter.md) - Creates draft entities for review before commitment
- [SQLImporterFromDifferentDataSource](SQLImporterFromDifferentDataSource.md) - Import committed entities from external database
- [SQLDraftImporterFromDifferentDataSource](SQLDraftImporterFromDifferentDataSource.md) - Import drafts from external database
- **SQLImporterConsideringApproval** - Same functionality as SQLImporter but considers approval status during import process


</div>