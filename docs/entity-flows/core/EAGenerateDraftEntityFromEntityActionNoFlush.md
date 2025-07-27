---
title: EAGenerateDraftEntityFromEntityActionNoFlush
module: core
---


<div class='entity-flows'>

# EAGenerateDraftEntityFromEntityActionNoFlush

**This document was generated using Claude.ai**
Visit [Field Values Calculator](../../guide/entity-flows/ea-fields-values-calculator.md) to know more about fields map and the available features

## Overview

This entity flow creates new entities from existing entities and saves them as draft documents without immediately flushing database changes. It provides the same functionality as the standard draft entity generation but defers database synchronization for batch processing or performance optimization scenarios.

## When This Action Runs

- **Trigger:** Manual execution or automated through entity flows for batch draft entity creation
- **Target:** Any entity type requiring draft entity generation without immediate database flush
- **Purpose:** Create draft entities efficiently in batch scenarios while controlling database transaction timing
- **Timing:** Used in bulk processing scenarios where multiple entities are generated before database flush

## How It Works

### 1. Draft Entity Generation
- **Standard Generation:** Performs all standard draft entity generation operations
- **Field Mapping:** Maps fields from source to target entity based on configuration
- **Draft Status:** Creates entities in draft status requiring approval
- **Relationship Handling:** Manages entity relationships and references

### 2. Database Transaction Management
- **No Auto-Flush:** Prevents automatic database flush after entity creation
- **Transaction Deferral:** Defers database synchronization until manual flush
- **Memory Persistence:** Maintains changes in memory until explicitly flushed
- **Batch Optimization:** Optimizes performance for batch processing scenarios

### 3. Performance Optimization
- **Reduced Database I/O:** Minimizes database write operations during generation
- **Batch Processing:** Enables efficient batch processing of multiple entities
- **Transaction Control:** Provides fine-grained control over transaction boundaries
- **Memory Management:** Manages memory usage during batch operations

### 4. Manual Flush Requirement
- **Explicit Flush:** Requires manual database flush to persist changes
- **Batch Completion:** Database changes are committed when batch processing completes
- **Error Recovery:** Allows rollback of entire batch if errors occur
- **Transaction Integrity:** Maintains transaction integrity across batch operations

## Key Features

### Batch Processing Optimization
- **No Auto-Flush:** Database changes are not automatically flushed
- **Performance Enhancement:** Improved performance for large batch operations
- **Memory Efficiency:** Efficient memory usage during bulk processing
- **Transaction Control:** Fine-grained control over database transaction timing

### Draft Document Creation
- **Draft Status:** Generated entities are saved as drafts requiring approval
- **Review Process:** Documents can be reviewed before final commitment
- **Approval Integration:** Integrates with document approval workflows
- **Quality Control:** Maintains quality control through review processes

### Advanced Field Mapping
- **Complex Assignments:** Support for complex field mapping scenarios
- **SQL Calculations:** Execute SQL queries for calculated field values
- **Reference Management:** Handle entity references and relationships
- **Collection Processing:** Process detail collections and line items

## Parameters

This entity flow uses the same parameters as [EAGenerateDraftEntityFromEntityAction](EAGenerateDraftEntityFromEntityAction.md):

### Parameter 1: Target Type (Required)
- **Type:** Entity Type
- **Purpose:** Specifies the type of entity to create
- **Format:** Entity type name (e.g., "SalesInvoice", "PurchaseOrder")

### Parameter 2: Finder SQL (Required)
- **Type:** SQL Query
- **Purpose:** SQL query to find existing target entity
- **Format:** SQL SELECT statement returning entity ID
- **Field References:** Use {fieldName} to reference source entity fields

**Validated Finder SQL Examples:**
```sql
-- Find existing credit note for sales invoice
SELECT id FROM CreditNote WHERE ref5Id = {id}

-- Find payment voucher for customer reference
SELECT id FROM PaymentVoucher WHERE ref1Id = {ref1.id} AND valueDate = {valueDate}

-- Always create new (return nothing)
SELECT id FROM SalesInvoice WHERE 1 = 0
```

### Parameter 3: Field Map (Optional)
- **Type:** Multi-line field mapping configuration
- **Purpose:** Defines how fields are copied from source to target
- **Format:** `targetField=sourceValue` with various source value types

### Parameter 4-10: Additional Parameters
- **Update Only:** Boolean flag for update-only mode
- **Inverse Copy:** Copy fields from generated entity back to source
- **Run Per Line:** Execute for each line in specified collection
- **Insert Only:** Boolean flag for insert-only mode
- **Apply When Query:** Conditional logic for generation
- **Group Details By:** Grouping criteria for detail processing
- **Run Only If:** Conditional execution based on expression

## Database Tables Affected

### Target Entity Tables
- **Generated Entity:** Creates or updates records in target entity table (in memory)
- **Draft Status:** Entity is saved with draft status flags
- **Field Updates:** Updates all mapped fields based on configuration
- **Deferred Persistence:** Changes remain in memory until manual flush

### Source Entity Updates
- **Inverse Mapping:** May update source entity fields based on inverse copy
- **Reference Updates:** Updates source entity with references to generated entity
- **Memory Changes:** All changes remain in memory until flush

### No Immediate Database Impact
- **Memory Only:** All changes remain in memory until explicit flush
- **Transaction Deferred:** Database transaction is not committed automatically
- **Batch Processing:** Multiple entities can be processed before flush

## Business Use Cases

### 1. Bulk Document Generation
- **Large Batch Processing:** Generate hundreds or thousands of documents efficiently
- **Import Processing:** Process large data imports with entity generation
- **Migration Operations:** Generate entities during system migration
- **Periodic Processing:** Handle periodic bulk document generation

### 2. Performance-Critical Operations
- **High-Volume Processing:** Process high volumes of entities efficiently
- **Real-Time Processing:** Handle real-time entity generation with performance optimization
- **Resource Optimization:** Optimize database and memory resource usage
- **System Integration:** Integrate with external systems requiring batch processing

### 3. Transaction Management
- **Atomic Operations:** Ensure atomic processing of multiple related entities
- **Error Recovery:** Provide rollback capability for batch operations
- **Transaction Control:** Maintain precise control over transaction boundaries
- **Data Integrity:** Ensure data integrity across complex batch operations

### 4. Memory-Intensive Processing
- **Large Dataset Processing:** Handle large datasets efficiently
- **Complex Calculations:** Perform complex calculations without database overhead
- **Temporary Processing:** Process temporary entities before final persistence
- **Staging Operations:** Stage entities for review before database commitment

## No-Flush Benefits

### Performance Advantages
- **Reduced Database I/O:** Minimizes database write operations during processing
- **Faster Processing:** Significantly faster processing for large batches
- **Resource Efficiency:** More efficient use of database and system resources
- **Scalability:** Better scalability for high-volume operations

### Transaction Control
- **Batch Atomicity:** Entire batch can be committed or rolled back as single unit
- **Error Handling:** Better error handling and recovery for batch operations
- **Consistency:** Maintains consistency across multiple related entities
- **Rollback Capability:** Easy rollback of entire batch if errors occur

### Memory Management
- **Efficient Memory Use:** More efficient memory usage during batch processing
- **Controlled Persistence:** Control when changes are persisted to database
- **Resource Planning:** Better resource planning for large operations
- **System Stability:** Improved system stability during bulk operations

## Important Warnings

### ⚠️ Manual Flush Requirement
- **No Auto-Flush:** Changes are NOT automatically saved to database
- **Manual Intervention:** Requires manual flush to persist changes
- **Data Loss Risk:** Risk of data loss if system fails before manual flush
- **Batch Completion:** Must ensure batch completion and proper flush

### ⚠️ Memory Usage Considerations
- **Memory Consumption:** Large batches may consume significant memory
- **System Resources:** Monitor system memory usage during processing
- **Batch Size Limits:** Consider practical limits on batch sizes
- **Memory Leaks:** Risk of memory leaks if batches are not properly completed

### ⚠️ Transaction Management
- **Transaction Boundaries:** Careful management of transaction boundaries required
- **Deadlock Risk:** Risk of database deadlocks in complex scenarios
- **Isolation Levels:** Consider database isolation levels for batch processing
- **Concurrency Issues:** Potential concurrency issues with other operations

### ⚠️ Error Handling Complexity
- **Batch Error Handling:** More complex error handling for batch operations
- **Partial Failures:** Risk of partial batch failures requiring cleanup
- **Recovery Procedures:** Need comprehensive recovery procedures
- **Monitoring Requirements:** Enhanced monitoring required for batch operations

## Best Practices

### Batch Processing Strategy
- **Reasonable Batch Sizes:** Use reasonable batch sizes to balance performance and memory usage
- **Progress Monitoring:** Monitor batch processing progress and performance
- **Error Handling:** Implement comprehensive error handling for batch operations
- **Resource Monitoring:** Monitor system resources during batch processing

### Manual Flush Management
- **Explicit Flush Timing:** Plan explicit flush timing carefully
- **Transaction Boundaries:** Clearly define transaction boundaries
- **Error Recovery:** Have procedures for handling flush failures
- **Batch Completion:** Ensure proper batch completion and cleanup

### Performance Optimization
- **Memory Management:** Monitor and manage memory usage during processing
- **Database Optimization:** Optimize database configuration for batch operations
- **System Tuning:** Tune system parameters for optimal batch performance
- **Resource Planning:** Plan system resources for peak batch processing loads

### Monitoring and Maintenance
- **Batch Monitoring:** Monitor batch processing performance and errors
- **Resource Tracking:** Track resource usage during batch operations
- **Performance Metrics:** Collect performance metrics for optimization
- **Regular Maintenance:** Perform regular maintenance of batch processing systems

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAGenerateDraftEntityFromEntityActionNoFlush`

**Related Actions:**
- [EAGenerateDraftEntityFromEntityAction](EAGenerateDraftEntityFromEntityAction.md) - Standard draft entity generation with auto-flush
- [EAGenerateEntityFromEntityActionNoFlush](EAGenerateEntityFromEntityActionNoFlush.md) - Standard entity generation without flush
- [EAAutomaticGenerateEntityFromEntityAction](EAAutomaticGenerateEntityFromEntityAction.md) - Automatic entity generation
- [EAGenerateEntityFromEntityActionNoFlushWithApproval](EAGenerateEntityFromEntityActionNoFlushWithApproval.md) - Generation with approval, no flush
- [EAGenerateEntityFromEntityActionWithApproval](EAGenerateEntityFromEntityActionWithApproval.md) - Generation with approval process
- [EAAutomaticGenerateEntityFromEntityActionWithApproval](EAAutomaticGenerateEntityFromEntityActionWithApproval.md) - Automatic generation with approval


</div>