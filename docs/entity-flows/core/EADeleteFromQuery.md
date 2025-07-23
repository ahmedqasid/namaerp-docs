---
title: EADeleteFromQuery
module: core
---


<div class='entity-flows'>

# EADeleteFromQuery

**This document was generated using AI Tools**

## Purpose
This action deletes multiple entities identified by a SQL query. It executes a query to find entities, then deletes each one using proper business logic and validation. This is a powerful bulk deletion tool for data maintenance and cleanup operations.

## When to Use This Action
- **Bulk Deletion**: Remove multiple related entities in a single operation
- **Data Cleanup**: Clean up orphaned or obsolete records
- **Cascading Deletes**: Delete child records when parent records are removed
- **Maintenance Operations**: Remove test data or temporary records
- **Business Rule Enforcement**: Delete entities that violate current business rules

## How It Works
1. **Query Execution**: Runs SQL query to identify entities for deletion
2. **Entity Loading**: Loads each identified entity from the database
3. **Cancellation Check**: Optionally skips cancelled documents
4. **Business Deletion**: Deletes each entity using proper business logic
5. **Transaction Management**: Handles transactions and error recovery
6. **Cleanup Operations**: Optionally flushes database changes

## Parameters Required

### Parameter 1: Query (Required)
- **What it is**: SQL query that returns entityType and id columns for entities to delete
- **Format**: `SELECT entityType, id FROM [table] WHERE [conditions]`
- **Purpose**: Identifies which entities should be deleted
- **Requirements**: Query must return exactly 2 columns: entityType (string) and id (uniqueID)

### Parameter 2: Flush Before Starting (Optional)
- **What it is**: Whether to flush database before starting deletions
- **Format**: `true` or `false` (empty defaults to false)
- **Purpose**: Ensures database is synchronized before mass deletion begins
- **Use Case**: When other operations may have pending changes

### Parameter 3: Do Not Delete Cancelled Records (Optional)
- **What it is**: Whether to skip deletion of cancelled documents
- **Format**: `true` or `false` (empty defaults to true)
- **Default**: `true` - cancelled documents are NOT deleted
- **Purpose**: Protects cancelled documents from bulk deletion

### Parameter 4: Flush After Each Delete (Optional)
- **What it is**: Whether to flush database after each individual deletion
- **Format**: `true` or `false` (empty defaults to false)
- **Purpose**: Ensures each deletion is immediately committed to database
- **Performance**: Slows down bulk operations but provides better error recovery

### Parameter 5: Do In New Transaction - Continue on Errors (Optional)
- **What it is**: Whether to process each deletion in separate transaction and continue on errors
- **Format**: `true` or `false` (empty defaults to false)
- **Default**: `false` - stops on first error
- **Purpose**: Continues processing even if some deletions fail

### Parameter 6: Run Update Query After Selecting Entities (Optional)
- **What it is**: Additional SQL update to run after finding entities but before deleting
- **Format**: Valid SQL UPDATE statement
- **Purpose**: Perform database updates related to the deletion process
- **Use Case**: Update related records before deletion begins

## Query Format and Examples

### Basic Query Structure
```sql
SELECT entityType, id 
FROM [TableName] 
WHERE [conditions]
```

### Query Examples (Template Format - Verify Actual Table Names)
```sql
-- Delete all stock issues from a specific document
SELECT 'StockIssue' as entityType, id 
FROM [StockIssueTable] 
WHERE fromDoc_id = {id}

-- Delete old temporary records
SELECT entityType, id 
FROM [TemporaryRecordsTable] 
WHERE creationDate < DATEADD(day, -30, GETDATE())

-- Delete orphaned detail lines
SELECT 'OrderDetail' as entityType, id 
FROM [OrderDetailTable] od
WHERE NOT EXISTS (SELECT 1 FROM [OrderTable] o WHERE o.id = od.parent_id)
```

### Query Requirements
- **Two Columns**: Query must return exactly entityType and id columns
- **Entity Types**: entityType must be valid system entity type names
- **Valid IDs**: id must be valid UniqueID values for the specified entity types
- **Performance**: Consider adding appropriate WHERE conditions to limit results

## Transaction and Error Handling

### Normal Mode (Parameter 5 = false)
- **Single Transaction**: All deletions occur in one transaction
- **Stop on Error**: First deletion error stops entire operation
- **Rollback**: All changes rolled back if any deletion fails
- **Data Integrity**: Ensures all-or-nothing deletion behavior

### Continue on Errors Mode (Parameter 5 = true)  
- **Separate Transactions**: Each deletion occurs in its own transaction
- **Error Isolation**: Failed deletions don't affect successful ones
- **Error Logging**: Errors are logged but processing continues
- **Partial Success**: Some deletions may succeed while others fail

## Cancelled Document Handling

### What Counts as Cancelled
- **DocumentFile Only**: Cancellation check only applies to document entities
- **Cancelled Status**: Documents with cancelledBy field populated
- **Skip Logic**: Cancelled documents are skipped if Parameter 3 is true

### Cancellation Behavior
- **Parameter 3 = true (default)**: Cancelled documents are skipped
- **Parameter 3 = false**: Cancelled documents are deleted normally
- **Non-Documents**: Cancellation check doesn't apply to master file entities

## Important Notes

⚠️ **CRITICAL WARNINGS:**

1. **Permanent Deletion**: This action permanently deletes entities - cannot be undone
2. **Bulk Operation**: Can delete large numbers of entities - use with extreme caution
3. **Business Logic**: Each deletion goes through full business validation and triggers
4. **Referential Integrity**: May fail if deleted entities have dependent references
5. **Performance Impact**: Large deletions can impact system performance
6. **Data Loss**: Improper queries can delete unintended data

## Query Safety Guidelines

### Query Validation
- **Test First**: Always test queries with SELECT before using in deletion
- **Limit Results**: Use appropriate WHERE conditions to limit scope
- **Verify Entities**: Ensure query returns correct entities
- **Check Dependencies**: Verify entities can be safely deleted

### Safe Query Practices
```sql
-- GOOD: Specific and limited
SELECT 'TempRecord' as entityType, id 
FROM [TempRecordTable] 
WHERE creationDate < '2024-01-01' 
  AND status = 'Obsolete'

-- DANGEROUS: Too broad
SELECT entityType, id 
FROM [SomeTable]  -- No WHERE clause!

-- GOOD: Test first with COUNT
SELECT COUNT(*) 
FROM [TableName] 
WHERE [your_conditions]
```

## Monitoring and Troubleshooting

### Success Indicators
- **Entities Deleted**: Target entities are removed from database
- **No Errors**: Action completes without deletion failures
- **Referential Integrity**: No foreign key constraint violations
- **Audit Trail**: Deletion activities are logged

### Common Issues

**"Query returns no results"**
- Check query syntax and table names
- Verify WHERE conditions are correct
- Confirm target entities exist in database
- Check if entities were already deleted

**"Entity deletion failed - referential integrity"**
- Target entity has dependent child records
- Check for foreign key relationships
- Delete child records first or use cascade deletion
- Review entity relationships and dependencies

**"Some deletions succeeded, others failed"**
- Review error logs for specific failure reasons
- Check if some entities have different validation rules
- Verify entity types and IDs are correct
- Consider using continue-on-errors mode

**"Transaction timeout during bulk deletion"**
- Too many entities being deleted in single transaction
- Enable continue-on-errors mode for separate transactions
- Add LIMIT clause to query to process smaller batches
- Consider running during maintenance windows

**"Performance issues during deletion"**
- Large number of entities being processed
- Enable flush-after-each if memory issues occur
- Consider breaking operation into smaller batches
- Run during off-peak hours

## SQL Queries for Monitoring

```sql
-- Preview entities that would be deleted (test your query first)
SELECT entityType, id, COUNT(*) as count_entities
FROM (
    [YOUR_DELETION_QUERY_HERE]
) preview
GROUP BY entityType, id

-- Check for entities with dependencies before deletion
SELECT d.entityType, d.id, COUNT(r.id) as dependent_count
FROM ([YOUR_DELETION_QUERY]) d
LEFT JOIN [RelatedTable] r ON d.id = r.parent_id
GROUP BY d.entityType, d.id
HAVING COUNT(r.id) > 0

-- Monitor recent deletion activities (verify actual table/column names)
SELECT actionClass, entityType, lastRunDate, success, errorMessage
FROM [EntityActionLogTable]
WHERE actionClass LIKE '%EADeleteFromQuery%'
  AND lastRunDate > DATEADD(hour, -24, GETDATE())
ORDER BY lastRunDate DESC
```

## Best Practices

### Pre-Deletion Checklist
1. **Test Query**: Run SELECT version of query to verify results
2. **Check Dependencies**: Verify entities can be safely deleted
3. **Backup Data**: Consider backup before major deletion operations
4. **User Notification**: Inform users if deletion affects their work
5. **Timing**: Run during maintenance windows for large operations

### Query Design
- **Specific Conditions**: Use precise WHERE clauses
- **Limit Scope**: Avoid overly broad deletions
- **Test Thoroughly**: Validate query results before execution
- **Performance**: Consider indexing on query conditions

### Error Recovery
- **Continue Mode**: Use continue-on-errors for resilient processing
- **Logging**: Monitor logs for deletion failures
- **Retry Logic**: Have procedures for retrying failed deletions
- **Rollback Plan**: Know how to recover from unintended deletions

### Performance Optimization
- **Batch Size**: Limit query results for large operations
- **Off-Peak Hours**: Run major deletions during low-usage periods
- **Resource Monitoring**: Monitor system resources during execution
- **Database Maintenance**: Consider database optimization after large deletions

## Related Actions
- **EADeleteFromAnotherServer**: For deleting entities on remote servers
- **EARecommitFromQuery**: For re-processing entities identified by queries
- **Bulk Operations**: Other actions for mass entity processing
- **Data Maintenance**: Tools for database cleanup and maintenance

---

**Module:** core  
**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EADeleteFromQuery`

</div>