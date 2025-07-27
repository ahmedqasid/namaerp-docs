---
title: EADeleteFromQuery
module: core
---


<div class='entity-flows'>

# EADeleteFromQuery

**This document was generated using Claude.ai**

## Overview

This entity flow executes a SQL query to find entities and then deletes all entities returned by the query. It's a powerful bulk deletion tool that allows complex entity selection through SQL queries and provides various options for transaction management, error handling, and performance optimization.

## When This Action Runs

- **Trigger:** Manual execution or automated through entity flows for bulk deletion operations
- **Target:** Any entities returned by the specified SQL query
- **Purpose:** Delete multiple related entities based on complex query criteria
- **Timing:** Typically used for data cleanup, cascade deletions, or bulk maintenance operations

## How It Works

### 1. Query Execution and Entity Discovery
- **SQL Query Processing:** Executes the provided SQL query to find entities to delete
- **Entity Type and ID Extraction:** Query must return entityType and id columns for each entity
- **Parameter Substitution:** Supports parameter substitution using {fieldName} syntax in queries
- **Multiple Result Sets:** Handles queries that return multiple result sets

### 2. Entity Collection and Validation
- **Entity List Building:** Collects all entity type and ID pairs from query results
- **Duplicate Prevention:** Uses LinkedHashSet to prevent duplicate entity processing
- **Null Safety:** Skips rows with null or invalid entity types and IDs
- **Data Validation:** Validates entity types and IDs before processing

### 3. Optional Pre-Processing Update
- **Update Query Execution:** Optionally runs an update query before deletion operations
- **Transaction Handling:** Update query can run in new transaction if error handling is enabled
- **Data Preparation:** Allows data preparation or status updates before deletion
- **Conditional Execution:** Only runs if update query parameter is provided

### 4. Bulk Entity Deletion
- **Individual Entity Deletion:** Processes each entity found by the query
- **Business Logic Integration:** Uses EntityMediator for proper business logic execution
- **Transaction Management:** Supports different transaction modes for error handling
- **Document Status Handling:** Optionally skips cancelled documents based on configuration

### 5. Performance and Error Management
- **Database Flushing:** Optional flushing before starting and after each deletion
- **Error Continuation:** Option to continue processing even if some deletions fail
- **Transaction Isolation:** Can run each deletion in separate transaction for error isolation
- **Progress Tracking:** Accumulates results from all deletion operations

## Key Features

### Flexible Query-Based Selection
- **Complex Criteria:** Use any SQL query to select entities for deletion
- **Parameter Support:** Embed current entity field values in queries using {fieldName}
- **Multi-Entity Types:** Can delete entities of different types in single operation
- **Advanced Filtering:** Support complex WHERE clauses and JOINs

### Transaction Management Options
- **Single Transaction:** All deletions in one transaction (fail-all-or-nothing)
- **Individual Transactions:** Each deletion in separate transaction for error isolation
- **Flush Control:** Control when database changes are committed
- **Performance Optimization:** Balance between consistency and performance

### Error Handling Strategies
- **Fail Fast:** Stop on first error (default behavior)
- **Continue on Errors:** Process all entities even if some fail
- **Error Logging:** Comprehensive error logging for troubleshooting
- **Result Accumulation:** Collect all errors and warnings for review

## Parameters

### Parameter 1: Query
- **Type:** Text (Required)
- **Format:** SQL query that returns entityType and id columns
- **Purpose:** Defines which entities should be deleted
- **Parameter Support:** Use {fieldName} to reference current entity fields

**Example Queries:**
```sql
-- Delete all stock issues related to current document
SELECT entityType, id FROM StockIssue WHERE fromDoc_id = {id}

-- Delete specific entity types with conditions
SELECT 'SalesOrder' as entityType, salesOrder_id FROM SalesOrder WHERE ref1Id = {id} 

-- Complex query with multiple conditions
SELECT entityType, id FROM SalesInvoice WHERE branch_id = {branch.id} AND documentFileStatus = 'Draft'
```

### Parameter 2: Flush Before Starting
- **Type:** Text (Optional)
- **Values:** "true" or "false"
- **Purpose:** Whether to flush database changes before starting deletion process
- **Default:** false

### Parameter 3: Do not Delete cancelled Records
- **Type:** Text (Optional)
- **Values:** "true" or "false"
- **Purpose:** Skip deletion of cancelled document entities
- **Default:** false (cancelled documents will be deleted)

### Parameter 4: Flush After Each Delete
- **Type:** Text (Optional)
- **Values:** "true" or "false"
- **Purpose:** Whether to flush database changes after each individual deletion
- **Default:** false

### Parameter 5: Do In New Transaction - Continue on Errors
- **Type:** Text (Optional)
- **Values:** "true" or "false"
- **Purpose:** Run each deletion in separate transaction and continue if errors occur
- **Default:** false (stop on first error)

### Parameter 6: Run Update Query After Selecting Entities, and Before Delete
- **Type:** Text (Optional)
- **Format:** SQL update query to run before deletions
- **Purpose:** Prepare data or update statuses before deletion
- **Parameter Support:** Use {fieldName} to reference current entity fields

## Database Tables Affected

### Query Target Tables
- **Any Tables:** The SQL query can reference any database tables
- **Entity Resolution:** Query results are used to identify specific entities for deletion
- **Read Operations:** Query execution only reads data to identify deletion targets

### Entity Tables
- **Target Entity Tables:** All tables corresponding to entities returned by query
  - Entity records will be deleted according to business logic
  - Related records may be affected by cascade deletion rules
  - Referential integrity constraints will be enforced

### Audit and Log Tables
- **Deletion Logs:** Audit logs created for each deletion operation
- **Transaction Logs:** Transaction logging based on current system settings
- **Error Logs:** Error information logged for failed operations

## Business Use Cases

### 1. Cascade Deletion Operations
- **Document Line Cleanup:** Delete all lines when parent document is deleted
- **Related Entity Cleanup:** Remove all entities related to a master record
- **Transaction Cleanup:** Delete all sub-transactions when main transaction is removed
- **Dependency Resolution:** Handle complex entity dependency deletions

### 2. Data Maintenance and Cleanup
- **Bulk Data Cleanup:** Remove obsolete or invalid data based on complex criteria
- **Status-Based Cleanup:** Delete entities with specific statuses or conditions
- **Date-Based Cleanup:** Remove old records based on date criteria
- **Conditional Cleanup:** Complex cleanup operations based on business rules

### 3. System Administration
- **Migration Support:** Delete old data during system migrations
- **Performance Optimization:** Remove unnecessary data to improve performance
- **Storage Management:** Clean up large datasets to free storage space
- **Compliance Requirements:** Delete data according to retention policies

## Important Warnings

### ⚠️ Data Loss Risk
- **Irreversible Operation:** Deleted entities cannot be easily recovered
- **Bulk Deletion:** Large numbers of entities can be deleted in single operation
- **Cascade Effects:** Deletions may trigger additional cascade deletions
- **Business Logic Impact:** Entity business logic will be executed during deletion

### ⚠️ Query Safety
- **Query Validation:** Ensure query returns correct entities before execution
- **Parameter Injection:** Validate parameter substitution to prevent SQL injection
- **Result Verification:** Test queries with SELECT before using for deletion
- **Performance Impact:** Complex queries may impact system performance

### ⚠️ Transaction Management
- **Transaction Boundaries:** Understand transaction implications of different settings
- **Error Handling:** Choose appropriate error handling strategy for your use case
- **Database Locking:** Bulk operations may create database locks
- **Resource Usage:** Large operations may consume significant system resources

### ⚠️ System Impact
- **Performance Impact:** Bulk deletions may affect system performance
- **Concurrent Users:** May impact other users during large deletion operations
- **Referential Integrity:** May fail if entities are referenced by other records
- **Business Logic:** Entity deletion business logic will be executed for each entity

## Best Practices

### Query Design
- **Test Queries:** Always test with SELECT before using for deletion
- **Use Parameters:** Use parameter substitution for dynamic queries
- **Optimize Performance:** Design efficient queries to minimize execution time
- **Validate Results:** Verify query results return expected entities

### Transaction Strategy
- **Choose Appropriate Mode:** Select transaction mode based on requirements
- **Error Handling:** Consider whether to stop on errors or continue processing
- **Performance Balance:** Balance between performance and error isolation
- **Monitoring:** Monitor transaction logs during bulk operations

### Safety Measures
- **Backup Data:** Backup affected data before bulk deletion operations
- **Test Environment:** Test deletion operations in non-production environment
- **Gradual Rollout:** Start with small batches before processing large datasets
- **User Communication:** Notify users of maintenance operations that may affect performance

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EADeleteFromQuery`

**Related Actions:**
- [EARunManualNotificationFromQuery](EARunManualNotificationFromQuery.md)
- [EARegenAccFromQuery](EARegenAccFromQuery.md)
- [EARegenInvTransReqFromQuery](../supplychain/EARegenInvTransReqFromQuery.md)
- [EASaveRecordsFromQuery](EASaveRecordsFromQuery.md)
- [EAEGBRASSFixCreationDates](../supplychain/EAEGBRASSFixCreationDates.md)


</div>

