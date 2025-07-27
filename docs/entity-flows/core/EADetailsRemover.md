---
title: EADetailsRemover
module: core
---


<div class='entity-flows'>

# EADetailsRemover

**This document was generated using Claude.ai**

## Overview

This entity flow removes specific lines from document detail collections based on query conditions or predefined criteria. It evaluates each line in a detail collection against specified conditions and removes lines that match the criteria, allowing for selective cleanup of detail records.

## When This Action Runs

- **Trigger:** Manual execution or automated through entity flows for detail cleanup
- **Target:** Documents with detail collections that need selective line removal
- **Purpose:** Remove unwanted or invalid detail lines based on business logic
- **Timing:** Typically runs during document processing or cleanup operations

## How It Works

### 1. Parameter Validation
- **Detail Name Validation:** Ensures a detail collection name is specified
- **Criteria Validation:** Requires at least one selection method (query or criteria code)
- **Input Checking:** Validates that required parameters are provided
- **Error Accumulation:** Collects validation errors for user feedback

### 2. Query-Based Line Selection
- **Query Execution:** Executes provided SQL-like query against detail lines
- **Line Evaluation:** Evaluates each detail line against the query conditions
- **Index Collection:** Collects indices of lines that match the query criteria
- **Dynamic Filtering:** Supports complex conditional logic through SQL expressions

### 3. Criteria-Based Line Selection
- **Criteria Definition Lookup:** Retrieves predefined criteria definition by code
- **Business Rule Application:** Applies configured business rules to detail lines
- **Entity Matching:** Uses criteria definition to identify matching lines
- **Standardized Logic:** Uses consistent criteria evaluation across the system

### 4. Line Removal Process
- **Index Sorting:** Sorts matching line indices in reverse order for safe removal
- **Sequential Removal:** Removes lines starting from highest index to avoid index shifting
- **Collection Modification:** Directly modifies the detail collection by removing items
- **Safe Deletion:** Ensures removal doesn't affect remaining line indices

### 5. Result Processing
- **Validation Results:** Returns any validation errors encountered
- **Success Indication:** Provides feedback on successful line removal operations
- **Error Handling:** Handles cases where detail collections don't exist
- **Graceful Degradation:** Continues processing even if some operations fail

## Key Features

### Flexible Line Selection
- **Query-Based Selection:** Use SQL-like queries for complex line selection logic
- **Criteria-Based Selection:** Use predefined criteria definitions for standardized rules
- **Conditional Logic:** Support complex conditional expressions for line evaluation
- **Dynamic Evaluation:** Evaluate conditions based on current line data

### Safe Line Removal
- **Index Management:** Handles line indices correctly during removal process
- **Reverse Ordering:** Removes lines from end to beginning to prevent index conflicts
- **Collection Integrity:** Maintains detail collection integrity during removal
- **Error Prevention:** Prevents errors from invalid indices or missing collections

### Multiple Selection Methods
- **Dual Criteria Support:** Can use both query and criteria definition in same action
- **Flexible Configuration:** Choose most appropriate selection method for use case
- **Standardization:** Use criteria definitions for consistent business rule application
- **Custom Logic:** Use queries for unique or complex selection requirements

## Parameters

### Parameter 1: Detail ID
- **Type:** Text (Required)
- **Format:** Name of the detail collection property
- **Purpose:** Specifies which detail collection to process
- **Examples:** "lines", "details", "items", "allocations"

**Common Detail Collection Names:**
- `lines` - Invoice lines, order lines, journal lines
- `details` - General detail collections
- `items` - Item details, product lines
- `allocations` - Payment allocations, cost allocations
- `distributions` - Account distributions
- `breakdowns` - Cost breakdowns, tax breakdowns

### Parameter 2: Query
- **Type:** Text (Optional, but required if no criteria code)
- **Format:** SQL-like query expression that returns 1 for lines to remove
- **Purpose:** Defines conditions for identifying lines to remove
- **Parameter Support:** Use {collection.field} syntax to reference line fields

**Query Examples:**
```sql
-- Remove lines without account assignment
SELECT CASE WHEN {lines.account.id} IS NULL THEN 1 ELSE 0 END

-- Remove lines with zero quantity
SELECT CASE WHEN {lines.quantity} = 0 THEN 1 ELSE 0 END

-- Remove lines with specific status
SELECT CASE WHEN {lines.status} = 'CANCELLED' THEN 1 ELSE 0 END

-- Remove lines with null or empty description
SELECT CASE WHEN {lines.description} IS NULL OR {lines.description} = '' THEN 1 ELSE 0 END
```

### Parameter 3: Criteria Definition Code
- **Type:** Text (Optional, but required if no query)
- **Format:** Code of a predefined criteria definition configured for detail collections
- **Purpose:** Uses standardized business rules to identify lines for removal
- **Requirements:** Criteria definition must be designed for detail line evaluation

**Criteria Definition Usage:**
- Must be configured in the system's criteria definition setup
- Should be specifically designed for detail line evaluation
- Provides consistent business rule application across different documents
- Allows for centralized management of line removal logic

## Database Tables Affected

### Document Entity
- **Detail Collections:** The specified detail collection within the document
  - Matching lines are removed from the collection
  - Collection size is reduced after line removal
  - Remaining lines maintain their relative order

### Supporting Tables
- **CriteriaDefinition:** Referenced when using criteria-based selection
  - Read to retrieve criteria configuration and business rules
  - Used for standardized line evaluation logic
  - Provides reusable selection criteria

### No Direct Database Modifications
This action modifies in-memory detail collections but does not directly update database tables until the entity is saved.

## Business Use Cases

### 1. Data Quality Management
- **Invalid Line Cleanup:** Remove lines with missing required data
- **Incomplete Records:** Remove lines that don't meet minimum data requirements
- **Error Correction:** Remove lines created in error or with incorrect data
- **Quality Standards:** Enforce data quality standards by removing non-compliant lines

### 2. Business Rule Enforcement
- **Status-Based Cleanup:** Remove lines with specific statuses (cancelled, expired)
- **Conditional Removal:** Remove lines based on complex business conditions
- **Policy Compliance:** Remove lines that violate business policies
- **Workflow Management:** Remove lines at specific workflow stages

### 3. Document Processing
- **Pre-Processing Cleanup:** Remove unwanted lines before document processing
- **Post-Processing Cleanup:** Clean up temporary or intermediate lines
- **Validation Cleanup:** Remove lines that fail validation criteria
- **Optimization:** Remove unnecessary lines to improve performance

### 4. System Maintenance
- **Migration Cleanup:** Remove obsolete lines during system migrations
- **Legacy Data Cleanup:** Remove old or outdated line formats
- **Performance Optimization:** Remove lines that impact system performance
- **Storage Optimization:** Remove lines to reduce storage requirements

## Line Selection Logic

### Query-Based Selection
- Executes query against each line in the detail collection
- Lines where query returns 1 (true) are marked for removal
- Supports complex SQL expressions and conditional logic
- Allows reference to line fields using {collection.field} syntax

### Criteria-Based Selection
- Uses predefined criteria definitions for standardized rule application
- Criteria must be configured for detail line evaluation
- Provides consistent business rule application across documents
- Allows centralized management of selection logic

### Index Management
- Collects indices of all lines matching selection criteria
- Sorts indices in reverse order (highest to lowest)
- Removes lines starting from highest index to prevent index shifting
- Ensures safe removal without affecting remaining line positions

## Important Warnings

### ⚠️ Data Loss Risk
- **Permanent Removal:** Removed lines cannot be easily recovered
- **No Undo Function:** Line removal is permanent once entity is saved
- **Bulk Removal:** Multiple lines can be removed in single operation
- **Backup Recommendation:** Backup entity data before bulk line removal

### ⚠️ Selection Criteria Accuracy
- **Query Testing:** Test queries thoroughly to ensure correct line selection
- **Criteria Validation:** Verify criteria definitions select intended lines
- **Unintended Removal:** Incorrect criteria may remove wrong lines
- **Impact Assessment:** Assess impact of line removal on business processes

### ⚠️ Parameter Configuration
- **Detail Collection Existence:** Specified detail collection must exist on entity
- **Parameter Requirements:** Must provide either query or criteria definition code
- **Syntax Validation:** Ensure query syntax is correct for line evaluation
- **Field References:** Verify field references in queries are valid

### ⚠️ Business Logic Impact
- **Document Totals:** Line removal may affect document totals and calculations
- **Related Records:** Removed lines may have related records that need cleanup
- **Workflow Impact:** Line removal may affect document workflow and approvals
- **Integration Effects:** May impact integrations that depend on specific lines

## Best Practices

### Planning and Testing
- **Test Environment:** Test line removal logic in non-production environment
- **Small Batches:** Start with small sets of documents before bulk operations
- **Criteria Validation:** Validate selection criteria with business users
- **Impact Analysis:** Analyze business impact of line removal

### Query Design
- **Precise Conditions:** Design queries to select only intended lines
- **Field Validation:** Verify field references are correct and accessible
- **Performance Optimization:** Optimize queries for performance with large detail collections
- **Documentation:** Document query logic for future maintenance

### Safety Measures
- **Backup Strategy:** Backup affected documents before line removal operations
- **Audit Trail:** Maintain audit trail of line removal operations
- **User Training:** Train users on proper use of line removal functionality
- **Access Control:** Restrict access to line removal configuration

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EADetailsRemover`


</div>

