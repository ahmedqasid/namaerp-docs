---
title: EAPreventChangingFields
module: core
---


<div class='entity-flows'>

# EAPreventChangingFields

**This document was generated using Claude.ai**

## Overview

This entity flow enforces field-level data integrity by preventing unauthorized changes to specified fields in both header and detail sections of entities. It provides comprehensive protection against field modifications, line additions, and line deletions, with conditional logic support for complex business rules. This action is essential for maintaining data integrity and enforcing business constraints after entity commitment.

## When This Action Runs

- **Trigger:** Automatic execution during entity save/commit operations for data integrity enforcement
- **Target:** Any entity requiring field-level change protection (only applies to previously committed entities)
- **Purpose:** Prevent unauthorized modifications to protected fields and collections
- **Timing:** Runs during entity validation phase before final commit

## How It Works

### 1. Entity State Validation
- **Commitment Check:** Only applies to entities that have been committed before (ignores new entities)
- **Data Comparison Setup:** Retrieves both current and previous entity data for comparison
- **Change Detection Preparation:** Sets up comparison framework for detecting changes
- **Field Storage Analysis:** Analyzes field storage locations (header vs. detail collections)

### 2. Field Protection Configuration
- **Field List Processing:** Processes comma-separated or line-separated field ID lists
- **Storage Categorization:** Categorizes fields by storage location (header or specific collections)
- **Protection Rule Setup:** Sets up protection rules for different field types
- **Validation Configuration:** Configures validation parameters for each field group

### 3. Header Field Validation
- **Direct Field Comparison:** Compares header fields between old and new entity data
- **Change Detection:** Detects any modifications to protected header fields
- **Violation Reporting:** Reports specific field changes that violate protection rules
- **Error Accumulation:** Accumulates all field validation errors for comprehensive reporting

### 4. Detail Collection Protection
- **Line Matching:** Matches detail lines between old and new entity states
- **Addition Prevention:** Prevents adding new lines when configured
- **Deletion Prevention:** Prevents removing existing lines when configured
- **Field Change Prevention:** Prevents modifying fields within existing lines
- **Conditional Logic Application:** Applies conditional SQL queries for complex business rules

## Key Features

### Comprehensive Field Protection
- **Header Field Protection:** Protects fields in the main entity header
- **Detail Field Protection:** Protects fields within detail collections
- **Mixed Protection:** Supports protection of both header and detail fields simultaneously
- **Flexible Field Selection:** Supports comma-separated or line-separated field specifications

### Collection Management Protection
- **Line Addition Control:** Prevents adding new lines to detail collections
- **Line Deletion Control:** Prevents removing existing lines from detail collections
- **Line Modification Control:** Prevents modifying fields within existing lines
- **Comprehensive Collection Protection:** Full protection of collection integrity

### Advanced Conditional Logic
- **SQL-Based Conditions:** Uses SQL queries to determine when protection rules apply
- **Line-Specific Logic:** Supports different logic for change, addition, and deletion validation
- **Current Line Context:** Provides access to current line data in conditional queries
- **Old Line Context:** Provides access to previous line data for comparison queries

## Parameters

### Parameter 1: Field IDs (Required)
- **Type:** Field ID List
- **Purpose:** Specifies which fields to protect from changes
- **Format:** Comma-separated or line-separated field IDs
- **Examples:**
```
# Header fields (comma-separated)
code,name1,description,amount

# Detail fields (line-separated)
details.item
details.quantity
details.price

# Mixed header and detail fields
code,name1
details.item
details.quantity
```

**Field ID Examples:**
```
# Simple header fields
code
name1
description
totalAmount

# Reference fields
customer
supplier.name1
item.code

# Detail collection fields
details.item
details.quantity
details.price
details.discount
lines.description
```

### Parameter 2: Prevent Adding New Lines (Optional)
- **Type:** Boolean
- **Purpose:** Controls whether new lines can be added to detail collections
- **Values:** "true" or "false"
- **Default:** false (allow adding lines)
- **Usage:** Set to "true" to prevent adding new detail lines

### Parameter 3: Prevent Deleting Lines (Optional)
- **Type:** Boolean
- **Purpose:** Controls whether existing lines can be removed from detail collections
- **Values:** "true" or "false"
- **Default:** false (allow deleting lines)
- **Usage:** Set to "true" to prevent removing existing detail lines

### Parameter 4: Change Validation Query (Optional)
- **Type:** SQL Query
- **Purpose:** SQL query to conditionally enable/disable field change validation
- **Format:** SQL SELECT statement returning 1 (enable) or 0 (disable)
- **Context:** Access to {line} and {oldLine} for current and previous line data
- **Example:**
```sql
SELECT CASE 
  WHEN {line.item.code} = 'PROTECTED_ITEM' 
    OR {oldLine.item.code} = 'PROTECTED_ITEM' 
  THEN 1 
  ELSE 0 
END
```

### Parameter 5: Added Lines Validation Query (Optional)
- **Type:** SQL Query
- **Purpose:** SQL query to conditionally enable/disable validation for newly added lines
- **Format:** SQL SELECT statement returning 1 (enable) or 0 (disable)
- **Context:** Access to {line} for current line data
- **Example:**
```sql
SELECT CASE 
  WHEN {line.item.category} = 'RESTRICTED' 
  THEN 1 
  ELSE 0 
END
```

### Parameter 6: Deleted Lines Validation Query (Optional)
- **Type:** SQL Query
- **Purpose:** SQL query to conditionally enable/disable validation for deleted lines
- **Format:** SQL SELECT statement returning 1 (enable) or 0 (disable)
- **Context:** Access to {line} for deleted line data
- **Example:**
```sql
SELECT CASE 
  WHEN {line.status} = 'LOCKED' 
  THEN 1 
  ELSE 0 
END
```

## Database Tables Affected

### No Direct Database Modifications
- **Validation Only:** This action only performs validation and does not modify database tables
- **Read-Only Operation:** Only reads entity data for comparison and validation
- **Error Prevention:** Prevents invalid data from being saved to the database
- **Data Integrity Enforcement:** Enforces data integrity rules before database commit

### Entity Data Comparison
- **Current Entity State:** Reads current entity data for validation
- **Previous Entity State:** Reads previous entity data from entity old data
- **Field-Level Comparison:** Compares individual fields between current and previous states
- **Collection Comparison:** Compares detail collections for line additions, deletions, and modifications

### Validation Result Impact
- **Commit Prevention:** Prevents entity commit when validation fails
- **Error Reporting:** Reports specific validation errors to prevent data corruption
- **Business Rule Enforcement:** Enforces business rules through validation failures
- **Data Consistency Maintenance:** Maintains data consistency by preventing unauthorized changes

## Business Use Cases

### 1. Financial Document Protection
- **Invoice Lock-Down:** Prevent changes to invoices after approval or payment
- **Financial Period Protection:** Protect financial documents during closed periods
- **Audit Trail Integrity:** Maintain audit trail integrity for financial transactions
- **Regulatory Compliance:** Ensure compliance with financial regulations requiring immutable records

### 2. Contract and Agreement Protection
- **Contract Terms Protection:** Prevent unauthorized changes to contract terms and conditions
- **Price Protection:** Protect agreed prices from unauthorized modifications
- **Quantity Lock-Down:** Prevent changes to contracted quantities
- **Amendment Control:** Control contract amendments through proper approval processes

### 3. Approval Workflow Integration
- **Post-Approval Protection:** Prevent changes after document approval
- **Workflow State Enforcement:** Enforce workflow state requirements for field modifications
- **Authorization Level Protection:** Protect fields based on user authorization levels
- **Review Process Integrity:** Maintain integrity of review and approval processes

### 4. Data Integrity and Quality Control
- **Master Data Protection:** Protect critical master data from unauthorized changes
- **Reference Data Integrity:** Maintain integrity of reference data and relationships
- **Historical Data Preservation:** Preserve historical data for audit and compliance
- **Change Control Enforcement:** Enforce formal change control processes

## Validation Logic and Processing

### Header Field Validation
1. **Field Identification:** Identifies header fields from the field list
2. **Value Comparison:** Compares current and previous field values
3. **Change Detection:** Detects any modifications to protected fields
4. **Error Reporting:** Reports specific fields that have been changed
5. **Validation Failure:** Fails validation if any protected field has changed

### Detail Collection Validation
1. **Line Matching:** Matches lines between old and new collections using detail line matcher
2. **Addition Check:** Identifies newly added lines and validates against addition rules
3. **Deletion Check:** Identifies deleted lines and validates against deletion rules
4. **Modification Check:** Compares fields within matched lines for unauthorized changes
5. **Conditional Logic:** Applies conditional SQL queries to determine validation applicability

### Conditional Query Processing
- **Query Execution:** Executes conditional SQL queries in the context of current and old lines
- **Result Interpretation:** Interprets query results (1 = enable validation, 0 = disable validation)
- **Context Provision:** Provides line context variables for query execution
- **Error Handling:** Handles query execution errors gracefully

## Important Warnings

### ⚠️ Entity State and Timing Requirements
- **Committed Entity Requirement:** Only works on entities that have been committed before (ignores new entities)
- **Timing Sensitivity:** Must run during entity validation phase before final commit
- **State Dependency:** Depends on proper entity state management and old data availability
- **Validation Phase Integration:** Must be properly integrated into entity validation workflow

### ⚠️ Field Configuration Requirements
- **Valid Field IDs:** All specified field IDs must be valid for the target entity type
- **Field Accessibility:** Fields must be accessible through entity reflection
- **Storage Location Accuracy:** Field storage locations must be correctly identified
- **Collection Field Specification:** Detail collection fields must be properly specified

### ⚠️ Performance Considerations
- **Comparison Overhead:** Field comparison operations add overhead to entity save operations
- **Collection Processing:** Large detail collections may impact validation performance
- **SQL Query Execution:** Conditional SQL queries add additional processing overhead
- **Memory Usage:** Entity data comparison may consume additional memory

### ⚠️ Business Logic Impact
- **Change Process Impact:** May require changes to existing business processes for field modifications
- **User Experience:** May impact user experience by preventing expected field changes
- **Workflow Integration:** Must be properly integrated with approval and change management workflows
- **Error Handling:** Requires proper error handling and user notification for validation failures

## Best Practices

### Configuration and Setup
- **Field Selection Strategy:** Carefully select fields that truly need protection
- **Business Rule Alignment:** Align field protection with actual business requirements
- **Testing and Validation:** Thoroughly test field protection rules with various scenarios
- **Documentation:** Document business rationale for field protection rules

### Performance Optimization
- **Selective Protection:** Only protect fields that absolutely require protection
- **Efficient Queries:** Write efficient conditional SQL queries to minimize performance impact
- **Collection Size Management:** Consider performance impact on entities with large collections
- **Monitoring:** Monitor performance impact of field protection validation

### Business Process Integration
- **Change Management:** Integrate with formal change management processes
- **Approval Workflows:** Coordinate with approval workflow systems
- **User Training:** Train users on field protection rules and procedures
- **Exception Handling:** Establish procedures for handling legitimate exceptions

### Error Handling and User Experience
- **Clear Error Messages:** Provide clear, actionable error messages for validation failures
- **User Guidance:** Guide users on proper procedures for legitimate field changes
- **Alternative Processes:** Provide alternative processes for authorized field modifications
- **Support Procedures:** Establish support procedures for handling field protection issues

### Maintenance and Updates
- **Regular Review:** Regularly review field protection rules for continued relevance
- **Business Change Adaptation:** Adapt protection rules to changing business requirements
- **Configuration Management:** Maintain proper configuration management for protection rules
- **Impact Assessment:** Assess impact of protection rule changes before implementation

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAPreventChangingFields`


</div>

