---
title: SQLDraftImporterFromDifferentDataSource
module: core
---


<div class='entity-flows'>

# SQLDraftImporterFromDifferentDataSource

**This document was generated using Claude.ai**

## Overview

Imports entities from SQL queries executed against external databases and saves them as draft records. Connects to different data sources (external databases) to fetch data, processes the results into entity format, and creates draft entities for review before final commitment.

## When This Action Runs

Manual execution for importing data from external systems, legacy database migration, integration with third-party databases, or creating draft entities from remote data sources that require review before processing.

## How It Works

1. **Connects to external database** - Establishes connection to specified data source
2. **Executes SQL queries** - Runs all provided SQL statements against the external database
3. **Processes results** - Converts SQL result rows into import format with column mapping
4. **Formats data types** - Handles dates, decimals, UUIDs appropriately for the target system
5. **Creates draft entities** - Imports results as draft entities using the import framework
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
- **Entity Tables** - Creates new draft entities in target entity tables
- **Import Framework Tables** - Uses import processing system for entity creation

## Important Warnings

### ⚠️ External Data Source Requirements
- **Data source must be properly configured in context.xml**
- Connection string, credentials, and driver must be valid
- External database must be accessible from the application server
- Network connectivity and firewall rules must allow database access

### ⚠️ SQL Query Requirements
- First column in entity queries should use `[:-record:EntityType]` format
- Detail queries should use `[:-detail:collectionName]` format
- Column aliases must match entity field names exactly
- SQL syntax must be compatible with the external database type

### ⚠️ Draft Entity Creation
- **All imported entities are created as drafts only**
- Draft entities require manual review and commitment
- Draft status allows import validation without affecting production data
- Use entity commit operations after import validation

### ⚠️ Connection Management
- External database connections are temporary during import
- Connection failures cause immediate import termination
- Original database connection is restored after processing
- Long-running imports may cause connection timeouts

### ⚠️ Simultaneous Execution Prevention
- Only one SQL import can run at a time across the entire system
- Multiple simultaneous imports are automatically blocked
- External database locks may further restrict concurrent access
- Plan import timing to avoid conflicts

### ⚠️ Data Source Configuration
- Data source name in Parameter 2 must exactly match context.xml definition
- Incorrect data source names cause immediate failure
- Database drivers must be available in the application classpath
- Connection pooling settings affect performance and reliability

### ⚠️ Cross-Database Compatibility
- SQL syntax differences between database types may cause issues
- Data type mappings between external and target databases must be compatible
- Character encoding differences may affect text data
- Date/time format differences require careful handling

### ⚠️ Security Considerations
- External database credentials are stored in context.xml configuration
- Network traffic to external databases may be unencrypted
- Consider VPN or secure connections for sensitive data
- Validate data from external sources before committing

**Module:** core

**Full Class Name:** `com.namasoft.modules.commonbasic.importer.SQLDraftImporterFromDifferentDataSource`

**Related Actions:**
- [SQLDraftImporter](SQLDraftImporter.md) - Import drafts from main database
- [SQLImporterFromDifferentDataSource](SQLImporterFromDifferentDataSource.md) - Import committed entities from external database
- [SQLImporter](SQLImporter.md) - Import committed entities from main database


</div>