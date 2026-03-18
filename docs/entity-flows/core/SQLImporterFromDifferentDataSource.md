---
title: SQLImporterFromDifferentDataSource
module: core
---


<div class='entity-flows'>

# SQLImporterFromDifferentDataSource

**This document was generated using Claude.ai**

## Overview

Imports entities from SQL queries executed against external databases and saves them as committed records immediately. Connects to different data sources (external databases) to fetch data, processes the results into entity format, and creates fully committed entities directly in production.

## When This Action Runs

Manual execution for importing production data from external systems, automated data synchronization between databases, or creating committed entities from trusted remote data sources without manual review.

## How It Works

1. **Connects to external database** - Establishes connection to specified data source
2. **Executes SQL queries** - Runs all provided SQL statements against the external database
3. **Processes results** - Converts SQL result rows into import format with column mapping
4. **Formats data types** - Handles dates, decimals, UUIDs appropriately for the target system
5. **Creates committed entities** - Imports results as fully committed entities using the import framework
6. **Restores connection** - Returns to original database connection after processing

## Parameters

**Parameter 1:** Update SQL (Optional) - SQL statement to run during import process for updates

**Parameter 2:** Data Source Name (Required) - External database connection name (must be defined in context.xml)

**Parameter 3:** SQL Statement 1 (Required) - Main SQL query for entity import with column mapping

**Parameter 4:** SQL Statement 2 (Optional) - Additional SQL query for detail records or related data

**Parameter 5:** SQL Statement 3 (Optional) - Third SQL query for complex imports

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

- **External Database Tables** - Reads data from tables in the specified external data source
- **Entity Tables** - Creates new committed entities in target entity tables
- **Import Framework Tables** - Uses import processing system for entity creation
- **Related Business Tables** - May trigger business logic affecting accounting, inventory, etc.

**Module:** core

**Full Class Name:** `com.namasoft.modules.commonbasic.importer.SQLImporterFromDifferentDataSource`

**Related Actions:**
- [SQLDraftImporterFromDifferentDataSource](SQLDraftImporterFromDifferentDataSource.md) - Import drafts from external database for review
- [SQLImporter](SQLImporter.md) - Import committed entities from main database
- [SQLDraftImporter](SQLDraftImporter.md) - Import drafts from main database


</div>