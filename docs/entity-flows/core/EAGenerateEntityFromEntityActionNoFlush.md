---
title: EAGenerateEntityFromEntityActionNoFlush
module: core
---


<div class='entity-flows'>

# EAGenerateEntityFromEntityActionNoFlush

**This document was generated using Claude.ai**

## Overview

This entity flow creates new entities from existing entities with full commitment but without immediate database flush. It provides the same comprehensive field mapping and validation as the standard entity generation but defers database synchronization for batch processing or performance optimization scenarios.

## When This Action Runs

- **Trigger:** Manual execution or automated through entity flows for batch entity creation
- **Target:** Any entity type requiring full document generation without immediate database flush
- **Purpose:** Create fully committed entities efficiently in batch scenarios while controlling database transaction timing
- **Timing:** Used in bulk processing scenarios where multiple entities are generated before database flush

## How It Works

### 1. Complete Entity Generation
- **Standard Generation:** Performs all standard entity generation operations
- **Full Validation:** Applies all validation rules and business logic
- **Field Mapping:** Maps fields comprehensively from source to target entity
- **Relationship Handling:** Manages complex entity relationships and references

### 2. Database Transaction Management
- **No Auto-Flush:** Prevents automatic database flush after entity creation
- **Transaction Deferral:** Defers database synchronization until manual flush
- **Memory Persistence:** Maintains committed changes in memory until explicitly flushed
- **Batch Optimization:** Optimizes performance for batch processing scenarios

### 3. Full Commitment Process
- **Complete Validation:** Performs full entity validation and business rule enforcement
- **Committed Status:** Entities are fully committed (not draft) but not yet flushed
- **Workflow Preparation:** Prepares entities for workflow integration after flush
- **Reference Management:** Maintains all entity references and relationships

### 4. Performance Optimization
- **Reduced Database I/O:** Minimizes database write operations during generation
- **Batch Processing:** Enables efficient batch processing of multiple entities
- **Transaction Control:** Provides fine-grained control over transaction boundaries
- **Memory Management:** Manages memory usage efficiently during batch operations

## Key Features

### Batch Processing Optimization
- **No Auto-Flush:** Database changes are not automatically flushed
- **Performance Enhancement:** Improved performance for large batch operations
- **Memory Efficiency:** Efficient memory usage during bulk processing
- **Transaction Control:** Fine-grained control over database transaction timing

### Complete Entity Processing
- **Full Validation:** All validation rules and constraints are enforced
- **Business Rules:** All business rules are applied during generation
- **Committed Status:** Generated entities are fully committed (not draft)
- **Workflow Ready:** Entities are ready for workflow integration after flush

### Advanced Field Mapping
- **Complex Assignments:** Support for complex field mapping scenarios
- **SQL Calculations:** Execute SQL queries for calculated field values
- **Reference Management:** Handle entity references and relationships
- **Collection Processing:** Process detail collections and line items

## Parameters

This entity flow uses the same parameters as [EAGenerateEntityFromEntityAction](EAGenerateEntityFromEntityAction.md):

### Parameter 1: Target Type (Required)
- **Type:** Entity Type
- **Purpose:** Specifies the type of entity to create
- **Format:** Entity type name (e.g., "SalesInvoice", "PurchaseOrder")

### Parameter 2: Finder SQL (Required)
- **Type:** SQL Query
- **Purpose:** SQL query to find existing target entity for updates
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
- **Format:** `targetField=sourceValue` with comprehensive syntax support
- **Reference:** Visit the [Field Mapping Guide](https://docs.namasoft.com/guide/entity-flows/ea-fields-values-calculator.html) for complete syntax

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
- **Committed Status:** Entity is fully committed and validated
- **Field Updates:** Updates all mapped fields based on configuration
- **Deferred Persistence:** Changes remain in memory until manual flush

### Source Entity Updates
- **Inverse Mapping:** Updates source entity fields based on inverse copy
- **Reference Updates:** Updates source entity with references to generated entity
- **Status Changes:** Source entity status may be updated based on generation
- **Memory Changes:** All changes remain in memory until flush

### No Immediate Database Impact
- **Memory Only:** All changes remain in memory until explicit flush
- **Transaction Deferred:** Database transaction is not committed automatically
- **Batch Processing:** Multiple entities can be processed before flush
- **Workflow Deferred:** Workflow triggers are deferred until flush

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

### 4. Complex Business Processes
- **Multi-Step Workflows:** Support complex multi-step business processes
- **Dependent Entity Creation:** Create multiple dependent entities efficiently
- **Cross-Module Processing:** Process entities across multiple business modules
- **Integration Workflows:** Support complex integration workflows

## No-Flush Benefits vs Standard Generation

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

## Differences from Draft Generation

### Validation and Commitment
- **Full Validation:** Enforces all validation rules (unlike draft generation)
- **Business Rules:** Applies all business rules and constraints
- **Committed Status:** Entities are fully committed, not in draft status
- **Workflow Ready:** Ready for immediate workflow integration after flush

### Processing Completeness
- **Complete Processing:** Full entity processing with all business logic
- **Reference Integrity:** Maintains full referential integrity
- **Audit Trails:** Creates complete audit trails for compliance
- **Integration Ready:** Ready for immediate system integration after flush

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

### ⚠️ Transaction Management Complexity
- **Transaction Boundaries:** Careful management of transaction boundaries required
- **Deadlock Risk:** Risk of database deadlocks in complex scenarios
- **Isolation Levels:** Consider database isolation levels for batch processing
- **Concurrency Issues:** Potential concurrency issues with other operations

### ⚠️ Workflow and Process Dependencies
- **Deferred Workflows:** Workflows are not triggered until database flush
- **Integration Delays:** External system integration is delayed until flush
- **Process Coordination:** Must coordinate with dependent processes
- **Timing Dependencies:** Consider timing dependencies for related processes

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

### Integration Considerations
- **Workflow Coordination:** Coordinate with workflow systems for post-flush processing
- **External Systems:** Plan integration with external systems after flush
- **Notification Systems:** Configure notifications for batch completion
- **Monitoring Systems:** Implement monitoring for batch processing status

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAGenerateEntityFromEntityActionNoFlush`

**Related Actions:**
- [EAGenerateEntityFromEntityAction](EAGenerateEntityFromEntityAction.md) - Standard entity generation with auto-flush
- [EAGenerateDraftEntityFromEntityActionNoFlush](EAGenerateDraftEntityFromEntityActionNoFlush.md) - Draft entity generation without flush
- [EAAutomaticGenerateEntityFromEntityAction](EAAutomaticGenerateEntityFromEntityAction.md) - Automatic entity generation
- [EAGenerateEntityFromEntityActionNoFlushWithApproval](EAGenerateEntityFromEntityActionNoFlushWithApproval.md) - Generation with approval, no flush
- [EAGenerateEntityFromEntityActionWithApproval](EAGenerateEntityFromEntityActionWithApproval.md) - Generation with approval process
- [EAAutomaticGenerateEntityFromEntityActionWithApproval](EAAutomaticGenerateEntityFromEntityActionWithApproval.md) - Automatic generation with approval


</div>