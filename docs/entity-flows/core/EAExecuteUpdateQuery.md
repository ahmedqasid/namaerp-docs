---
title: EAExecuteUpdateQuery
module: core
---


<div class='entity-flows'>

# EAExecuteUpdateQuery

**This document was generated using Claude.ai**

## Overview

This entity flow executes custom SQL UPDATE, INSERT, or DELETE statements directly against the database. It's a powerful tool for performing bulk database operations and data modifications that go beyond standard entity operations, with optional cache eviction to maintain data consistency.

## When This Action Runs

- **Trigger:** Manual execution or automated through entity flows for bulk data operations
- **Target:** Database tables requiring direct SQL modification
- **Purpose:** Perform complex data updates, bulk operations, or database maintenance
- **Timing:** Typically used for data migration, bulk updates, or maintenance operations

## How It Works

### 1. SQL Query Preparation and Execution
- **Query Processing:** Prepares the provided SQL statement for execution
- **Parameter Substitution:** Supports field references using {fieldName} syntax from current entity
- **Direct Database Access:** Executes SQL directly against the database without ORM layer
- **Transaction Management:** Runs within current transaction context

### 2. Bulk Operation Support
- **Multiple Statements:** Can execute complex SQL statements including JOINs and subqueries
- **Batch Processing:** Processes SQL statement efficiently for bulk operations
- **Row-by-Row Processing:** Handles parameter substitution for each execution context
- **Performance Optimization:** Uses prepared statements for optimal performance

### 3. Cache Management Integration
- **Optional Cache Eviction:** Can clear Hibernate second-level cache after execution
- **Cache Consistency:** Ensures cached data reflects database changes
- **Memory Management:** Prevents stale cache data after direct database modifications
- **Performance Balance:** Optional cache clearing based on operation requirements

### 4. Result Processing
- **Success Indication:** Returns success result upon completion
- **Error Handling:** Handles SQL execution errors and transaction rollback
- **Operation Feedback:** Provides feedback on query execution status
- **Transaction Safety:** Maintains transaction integrity during execution

## Key Features

### Direct Database Access
- **SQL Flexibility:** Execute any valid SQL UPDATE, INSERT, or DELETE statement
- **Complex Operations:** Support complex operations with JOINs, subqueries, and functions
- **Bulk Modifications:** Perform bulk data modifications efficiently
- **Database-Specific Features:** Use database-specific SQL features and functions

### Parameter Substitution
- **Entity Field References:** Use {fieldName} to reference current entity field values
- **Dynamic Queries:** Create dynamic SQL based on entity data
- **Context-Aware Operations:** Tailor operations based on current entity context
- **Type Safety:** Automatic handling of data type conversions

### Performance Optimization
- **Prepared Statements:** Use prepared statements for optimal performance
- **Bulk Operations:** More efficient than individual entity operations for bulk changes
- **Direct Database Access:** Bypass ORM overhead for performance-critical operations
- **Transaction Efficiency:** Execute within existing transaction context

## Parameters

### Parameter 1: Update Query
- **Type:** Text (Required)
- **Format:** Valid SQL UPDATE, INSERT, or DELETE statement
- **Purpose:** Defines the database operation to execute
- **Field References:** Use {fieldName} to reference current entity fields

### Parameter 2: Evict Cache After Execution
- **Type:** Text (Optional)
- **Values:** "true" or "false"
- **Purpose:** Whether to clear Hibernate second-level cache after query execution
- **Default:** false (cache is not cleared)

**When to Use Cache Eviction:**
- Set to "true" when modifying data that might be cached
- Use when direct SQL changes affect cached entity data
- Required when updates affect entities loaded in current session
- Important for maintaining data consistency after bulk operations

## Database Tables Affected

### Target Tables
- **Any Database Tables:** Can modify any database table accessible to the application
- **Direct Modifications:** Changes are made directly to database tables
- **Referential Integrity:** Must respect database constraints and referential integrity
- **Transaction Context:** Modifications are part of current transaction

### Cache Impact
- **Hibernate Cache:** May require cache eviction if cached data is modified
- **Entity Cache:** Cached entities may become stale after direct SQL modifications
- **Query Cache:** Query result cache may need clearing for consistency
- **Session Cache:** Current session cache may contain outdated data

## Business Use Cases

### 1. Bulk Data Operations
- **Mass Updates:** Update large numbers of records efficiently
- **Data Migration:** Migrate data between tables or systems
- **Bulk Status Changes:** Change status of multiple related records
- **Batch Processing:** Process large datasets in single operations

### 2. Complex Data Modifications
- **Cross-Table Updates:** Update data across multiple related tables
- **Calculated Field Updates:** Update fields based on complex calculations
- **Conditional Bulk Updates:** Apply updates based on complex business logic
- **Data Synchronization:** Synchronize data between different parts of the system

### 3. System Maintenance
- **Data Cleanup:** Clean up obsolete or invalid data
- **Performance Optimization:** Update database statistics or optimize data structure
- **Audit Trail Creation:** Create audit records for tracking changes
- **Reference Data Updates:** Update reference data across the system

### 4. Integration Support
- **External System Integration:** Update data based on external system information
- **Import Processing:** Process imported data and update existing records
- **Synchronization Operations:** Synchronize data with external systems
- **Batch Processing:** Process batch operations from external sources

## Important Warnings

### ⚠️ Data Integrity Risks
- **Direct Database Access:** Bypasses entity validation and business logic
- **Referential Integrity:** Must ensure database constraints are respected
- **Transaction Safety:** Failed queries may cause transaction rollback
- **Data Consistency:** Direct changes may create data inconsistencies

### ⚠️ Cache Consistency
- **Stale Cache Data:** Direct SQL changes may leave stale data in cache
- **Cache Eviction:** May need to clear cache to maintain consistency
- **Performance Impact:** Cache eviction may temporarily impact performance
- **Session Cache:** Current session may contain outdated entity data

### ⚠️ SQL Injection and Security
- **Parameter Validation:** Ensure proper parameter substitution to prevent SQL injection
- **Input Sanitization:** Validate and sanitize any dynamic SQL components
- **Access Control:** Ensure appropriate permissions for database operations
- **Audit Requirements:** Log database modifications for security auditing

### ⚠️ Performance Considerations
- **Query Optimization:** Ensure SQL queries are optimized for performance
- **Index Usage:** Verify queries use appropriate database indexes
- **Bulk Operation Impact:** Large bulk operations may impact system performance
- **Transaction Duration:** Long-running queries may hold locks and affect concurrency

## Best Practices

### SQL Development
- **Query Testing:** Test SQL queries thoroughly in development environment
- **Performance Analysis:** Analyze query execution plans for optimization
- **Error Handling:** Implement appropriate error handling for SQL failures
- **Documentation:** Document complex SQL operations and their purpose

### Cache Management
- **Strategic Eviction:** Only evict cache when necessary to avoid performance impact
- **Selective Clearing:** Consider which cached data needs to be cleared
- **Timing Considerations:** Plan cache eviction timing to minimize user impact
- **Monitoring:** Monitor cache performance after eviction operations

### Safety Measures
- **Backup Strategy:** Backup affected data before bulk operations
- **Rollback Planning:** Have rollback procedures for failed operations
- **Validation:** Validate results after SQL execution
- **Gradual Rollout:** Test operations on small datasets before full deployment

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAExecuteUpdateQuery`


</div>

