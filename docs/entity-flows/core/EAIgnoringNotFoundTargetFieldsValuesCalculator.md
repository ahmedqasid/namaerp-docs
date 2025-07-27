---
title: EAIgnoringNotFoundTargetFieldsValuesCalculator
module: core
---


<div class='entity-flows'>

# EAIgnoringNotFoundTargetFieldsValuesCalculator

**This document was generated using Claude.ai**

## Overview

This entity flow performs field value calculations and assignments with error tolerance. It extends the standard field value calculator but ignores any errors that occur during processing, ensuring the entire operation continues even when individual field assignments fail. This makes it ideal for data import scenarios where some field assignments may fail but the overall process should continue.

## When This Action Runs

- **Trigger:** Manual execution or automated through entity flows for error-tolerant field calculations
- **Target:** Any entity requiring bulk field assignments with error tolerance
- **Purpose:** Assign field values while continuing processing despite individual field errors
- **Timing:** Used in data import, migration, or bulk update scenarios where partial failures are acceptable

## How It Works

### 1. Standard Field Calculation Processing
- **Field Mapping:** Performs all standard field value calculation operations
- **Value Assignment:** Assigns values using the same syntax as EAFieldsValuesCalculator
- **Processing Logic:** Applies all standard field mapping logic and rules
- **Expression Evaluation:** Evaluates expressions and SQL queries for field values

### 2. Error Tolerance and Continuation
- **Error Catching:** Catches any exceptions during field assignment processing
- **Error Logging:** Logs all errors for troubleshooting purposes
- **Processing Continuation:** Continues processing despite individual field assignment failures
- **Success Result:** Always returns success result regardless of individual field errors

### 3. Graceful Degradation
- **Partial Success:** Allows partial success when some fields can be assigned
- **Error Isolation:** Isolates errors to prevent cascade failures
- **Robust Processing:** Provides robust processing for unreliable data scenarios
- **Failure Recovery:** Recovers from individual field assignment failures

## Key Features

### Error Tolerance
- **Exception Handling:** Comprehensive exception handling for all field operations
- **Error Logging:** Detailed error logging for troubleshooting failed assignments
- **Processing Continuation:** Continues processing despite individual failures
- **Robust Operations:** Robust operation in challenging data environments

### Field Calculation Inheritance
- **Full Calculator Features:** Inherits all features from EAFieldsValuesCalculator
- **Complete Syntax Support:** Supports all field mapping syntax and expressions
- **SQL Query Support:** Full support for SQL query-based field assignments
- **Reference Navigation:** Complete support for entity reference navigation

### Import and Migration Friendly
- **Data Import Scenarios:** Ideal for data import where source data may be incomplete
- **Migration Processing:** Perfect for data migration with variable data quality
- **Bulk Operations:** Suitable for bulk operations where some records may have issues
- **Legacy Data Processing:** Handles legacy data with missing or invalid fields

## Parameters

This entity flow uses the same parameters as [EAFieldsValuesCalculator](EAFieldsValuesCalculator.md):

### Parameter 1: Field Mapping Configuration (Required)
- **Type:** Multi-line field mapping configuration
- **Purpose:** Defines how fields are calculated and assigned
- **Format:** `targetField=sourceValue` with comprehensive syntax support
- **Reference:** Visit the [Field Mapping Guide](../../guide/entity-flows/ea-fields-values-calculator.md) for complete syntax

**Basic Field Assignment Examples:**
```
# Simple field copying
warehouse=book.ref1
name1=code
description=sourceEntity.description

# Value assignments with quotes
customer.runCommand="edit"
customer.runCommand="save"
```

**Advanced Value Assignment Examples:**
```
# SQL query values
maxValue=sql(SELECT MAX(n1) FROM InvItem WHERE id <> {id})
customerCount=sql(SELECT COUNT(*) FROM Customer WHERE active = 1)

# Conditional expressions
status=if({amount} > 1000, "HIGH", "LOW")
category=if({customer.type} = "RETAIL", "R", "W")

# Date and numeric calculations
dueDate={invoiceDate} + 30
totalWithTax={amount} * 1.15
```

## Database Tables Affected

### Target Entity Fields
- **Field Updates:** Updates target entity fields based on mapping configuration
- **Value Assignment:** Assigns calculated values to specified fields
- **Error Tolerance:** Continues processing even when some field updates fail
- **Partial Success:** May result in partial field updates when errors occur

### Referenced Data Access
- **Source Data Reading:** Reads data from source fields and related entities
- **SQL Query Execution:** Executes SQL queries for calculated field values
- **Reference Navigation:** Accesses related entity data through references
- **Database Queries:** Performs database queries for complex value calculations

### No Rollback on Errors
- **Partial Updates:** Successful field assignments are retained even when others fail
- **No Transaction Rollback:** Does not rollback successful operations when errors occur
- **Error Isolation:** Errors in one field assignment don't affect others
- **Progress Preservation:** Preserves progress made before errors occur

## Business Use Cases

### 1. Data Import and Migration
- **Legacy Data Import:** Import data where some fields may not map correctly
- **Excel Import Processing:** Process Excel imports where some data may be invalid
- **System Migration:** Migrate data between systems with different field structures
- **Bulk Data Processing:** Process large datasets where some records may have issues

### 2. Unreliable Data Processing
- **Third-Party Data:** Process data from external systems with variable quality
- **User-Generated Data:** Handle user-entered data that may contain errors
- **API Integration:** Process API data where some fields may be missing
- **Data Synchronization:** Synchronize data between systems with different schemas

### 3. Batch Operations with Tolerance
- **Bulk Updates:** Perform bulk updates where some records may fail
- **Scheduled Processing:** Run scheduled processes that need to complete despite errors
- **Data Cleansing:** Clean data while tolerating individual field assignment failures
- **Maintenance Operations:** Perform maintenance operations with error tolerance

### 4. Development and Testing
- **Development Environment:** Process test data that may have inconsistencies
- **Data Setup:** Set up development data where some assignments may fail
- **Testing Scenarios:** Test with incomplete or invalid data scenarios
- **Prototype Development:** Develop prototypes with tolerance for data issues

## Error Handling Strategy

### Error Logging and Monitoring
- **Comprehensive Logging:** All errors are logged with full stack traces
- **Error Details:** Detailed error information for troubleshooting
- **Field-Level Errors:** Specific information about which field assignments failed
- **Context Information:** Context information about the entity and operation

### Error Types Handled
- **Field Not Found:** Handles cases where target fields don't exist
- **Invalid References:** Manages invalid entity references gracefully
- **SQL Query Errors:** Handles SQL query execution failures
- **Data Type Mismatches:** Manages data type conversion errors

### Recovery and Continuation
- **Automatic Recovery:** Automatically recovers from individual field errors
- **Processing Continuation:** Continues with remaining field assignments
- **Partial Success Management:** Manages scenarios with partial success
- **Error Isolation:** Prevents error propagation to other operations

## Important Warnings

### ⚠️ Error Masking Risk
- **Silent Failures:** Errors are logged but processing continues, potentially masking critical issues
- **Data Integrity:** Partial field assignments may lead to data integrity issues
- **Validation Bypass:** May bypass important validation that would normally prevent errors
- **Debugging Challenges:** Silent error handling may make debugging more difficult

### ⚠️ Data Consistency Concerns
- **Partial Updates:** Partial field updates may leave entities in inconsistent states
- **Related Data:** Errors in reference fields may affect related entity relationships
- **Business Rules:** May bypass business rules that depend on all fields being set correctly
- **Validation Dependencies:** Field dependencies may be broken by partial updates

### ⚠️ Production Use Considerations
- **Error Monitoring:** Requires robust error monitoring to track silent failures
- **Data Validation:** Additional data validation may be needed after processing
- **Quality Assurance:** Extra quality assurance steps recommended for critical data
- **Recovery Procedures:** Recovery procedures needed for handling partial failures

### ⚠️ Performance and Resource Impact
- **Error Processing Overhead:** Error handling and logging may impact performance
- **Memory Usage:** Error logging may consume additional memory resources
- **Database Impact:** Partial updates may impact database consistency
- **Transaction Management:** Complex transaction management with partial failures

## Best Practices

### Error Monitoring and Management
- **Log Monitoring:** Monitor error logs regularly for failed field assignments
- **Error Analysis:** Analyze error patterns to identify systematic issues
- **Data Quality Monitoring:** Monitor data quality after processing
- **Recovery Planning:** Plan recovery procedures for critical field assignment failures

### Data Validation and Quality
- **Pre-Processing Validation:** Validate data before processing when possible
- **Post-Processing Checks:** Implement post-processing data quality checks
- **Critical Field Identification:** Identify critical fields that must not fail
- **Alternative Processing:** Consider alternative processing for critical operations

### Testing and Development
- **Comprehensive Testing:** Test with various error scenarios and invalid data
- **Error Simulation:** Simulate different types of field assignment errors
- **Recovery Testing:** Test recovery procedures for partial failures
- **Performance Testing:** Test performance impact of error handling

### Production Deployment
- **Gradual Rollout:** Gradually roll out to production with monitoring
- **Backup Procedures:** Implement backup procedures before processing
- **Rollback Planning:** Plan rollback procedures for critical failures
- **Monitoring Setup:** Set up comprehensive monitoring for error detection

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAIgnoringNotFoundTargetFieldsValuesCalculator`

**Related Actions:**
- [EAFieldsValuesCalculator](EAFieldsValuesCalculator.md) - Standard field value calculator without error tolerance
- [EAAutomaticFieldsValuesCalculator](EAAutomaticFieldsValuesCalculator.md) - Automatic field value calculation


</div>

