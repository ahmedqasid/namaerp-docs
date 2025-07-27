---
title: EAErrorIfQueryNotMatched
module: core
---


<div class='entity-flows'>

# EAErrorIfQueryNotMatched

**This document was generated using Claude.ai**

## Overview

This entity flow validates entity data using a SQL query and displays a custom error message if the validation fails. It's a flexible validation tool that allows complex business rule validation using SQL logic and provides multilingual error messages for user feedback.
**This entity flow has been replaced by CriteriaBasedValidation**

## When This Action Runs

- **Trigger:** Entity validation during save operations or workflow processes
- **Target:** Any entity that needs custom validation logic
- **Purpose:** Enforce business rules and data constraints with custom error messages
- **Timing:** Runs during entity validation before save/update operations

## How It Works

### 1. Query Execution and Evaluation
- **SQL Query Processing:** Executes the provided SQL query against the entity data
- **Result Evaluation:** Checks if query returns a "match" (non-zero result)
- **Validation Logic:** Query should return 0 for valid data, non-zero for invalid data
- **Parameter Substitution:** Supports field references using {fieldName} syntax

### 2. Validation Result Processing
- **Match Detection:** Determines if entity data passes or fails validation
- **Condition Logic:** Query "not matched" means validation failed
- **Boolean Evaluation:** Uses query result to determine validation outcome
- **Error Triggering:** Triggers error display when validation fails

### 3. Error Message Rendering
- **Template Processing:** Processes error message templates with entity data
- **Field Substitution:** Replaces {fieldName} placeholders with actual field values
- **Dynamic Content:** Creates contextualized error messages based on entity data
- **Rich Formatting:** Supports complex message formatting and field references

### 4. Multilingual Error Display
- **Arabic Message:** Primary error message in Arabic language
- **English Message:** Optional secondary message in English language
- **Language Fallback:** Uses Arabic message for English if English not provided
- **Translated Result:** Creates properly localized error result for user display

## Key Features

### Flexible SQL Validation
- **Complex Logic:** Support any SQL expression for validation logic
- **Field Access:** Reference any entity field using {fieldName} syntax
- **Conditional Validation:** Use CASE statements for complex conditional logic
- **Data Type Support:** Works with all data types and field relationships

### Custom Error Messages
- **Dynamic Messages:** Error messages can include entity field values
- **Template System:** Use Tempo template syntax for rich message formatting
- **Contextual Feedback:** Provide specific feedback based on actual data values
- **User-Friendly Messages:** Create clear, actionable error messages for users

### Multilingual Support
- **Dual Language:** Support both Arabic and English error messages
- **Language Flexibility:** Optional English message with Arabic fallback
- **Localization Ready:** Proper support for multilingual applications
- **Cultural Adaptation:** Accommodate different language requirements

## Parameters

### Parameter 1: Query
- **Type:** Text (Required)
- **Format:** SQL query that returns 0 for valid data, non-zero for invalid data
- **Purpose:** Defines the validation logic to be applied
- **Field References:** Use {fieldName} to reference entity fields

**Query Examples:**
```sql
-- Validate that code is not 'abc'
SELECT CASE WHEN {code} = 'abc' THEN 1 ELSE 0 END

-- Validate that amount is positive
SELECT CASE WHEN {amount} <= 0 THEN 1 ELSE 0 END

-- Validate that date is not in the past
SELECT CASE WHEN {effectiveDate} < GETDATE() THEN 1 ELSE 0 END

-- Complex validation with multiple conditions
SELECT CASE WHEN {status} = 'ACTIVE' AND {approvalDate} IS NULL THEN 1 ELSE 0 END
```

### Parameter 2: Arabic Error Tempo
- **Type:** Text (Required)
- **Format:** Tempo template for Arabic error message
- **Purpose:** Provides Arabic error message when validation fails
- **Field References:** Use {fieldName} to include entity field values in message

**Message Examples:**
```
The code {code} must not be 'abc', please use something else.
The amount {amount} must be positive.
The date {effectiveDate} cannot be in the past.
Status {status} requires approval date to be set.
```

### Parameter 3: English Error Tempo
- **Type:** Text (Optional)
- **Format:** Tempo template for English error message
- **Purpose:** Provides English error message when validation fails
- **Fallback:** If not provided, Arabic message is used for both languages

## Database Tables Affected

### No Direct Database Modifications
This action only validates data and does not modify any database tables. It:
- Reads entity field values for query execution
- Evaluates validation logic against current data
- Prevents entity save if validation fails
- Does not change entity or database state

## Business Use Cases

### 1. Data Quality Validation
- **Business Rule Enforcement:** Enforce complex business rules not covered by basic field validation
- **Data Consistency:** Ensure data consistency across multiple fields
- **Format Validation:** Validate complex data formats and patterns
- **Cross-Field Validation:** Validate relationships between different entity fields

### 2. Workflow Validation
- **Status Validation:** Ensure entities are in appropriate states for operations
- **Process Validation:** Validate entities meet requirements for workflow progression
- **Approval Validation:** Ensure required approvals are in place before proceeding
- **Conditional Validation:** Apply different validation rules based on entity state

### 3. Compliance and Governance
- **Regulatory Compliance:** Enforce regulatory requirements through validation
- **Policy Enforcement:** Ensure entities comply with organizational policies
- **Audit Requirements:** Validate entities meet audit and compliance standards
- **Data Governance:** Enforce data governance rules and standards

### 4. User Experience Enhancement
- **Clear Error Messages:** Provide specific, actionable error messages to users
- **Field-Specific Feedback:** Include actual field values in error messages for clarity
- **Multilingual Support:** Support users in different languages
- **Contextual Help:** Provide context-specific guidance for resolving validation issues

## Validation Logic Examples

### Simple Field Validation
```sql
-- Ensure customer code is not empty
SELECT CASE WHEN {customerCode} IS NULL OR {customerCode} = '' THEN 1 ELSE 0 END
```

### Range Validation
```sql
-- Ensure quantity is within valid range
SELECT CASE WHEN {quantity} < 1 OR {quantity} > 1000 THEN 1 ELSE 0 END
```

### Status-Based Validation
```sql
-- Ensure approved documents have approval date
SELECT CASE WHEN {status} = 'APPROVED' AND {approvalDate} IS NULL THEN 1 ELSE 0 END
```

### Cross-Field Validation
```sql
-- Ensure end date is after start date
SELECT CASE WHEN {endDate} <= {startDate} THEN 1 ELSE 0 END
```

## Important Warnings

### ⚠️ Query Design
- **Query Logic:** Ensure query returns 0 for valid data, non-zero for invalid data
- **Performance Impact:** Complex queries may impact validation performance
- **Field References:** Ensure all referenced fields exist and are accessible
- **Syntax Validation:** Validate SQL syntax before deployment

### ⚠️ Error Message Quality
- **User-Friendly Language:** Use clear, non-technical language in error messages
- **Actionable Guidance:** Provide specific guidance on how to fix validation errors
- **Field Value Inclusion:** Include relevant field values for context
- **Message Length:** Keep messages concise but informative

### ⚠️ Multilingual Considerations
- **Translation Quality:** Ensure accurate translation of error messages
- **Cultural Appropriateness:** Consider cultural context in message content
- **Character Encoding:** Ensure proper handling of Arabic text and special characters
- **Display Direction:** Consider right-to-left text direction for Arabic messages

### ⚠️ Performance and Scalability
- **Query Complexity:** Complex validation queries may impact system performance
- **Frequent Execution:** Validation runs on every save operation
- **Database Load:** Multiple validations may increase database query load
- **Optimization:** Optimize queries for performance in high-volume scenarios

## Best Practices

### Query Design
- **Simple Logic:** Keep validation logic as simple as possible while meeting requirements
- **Clear Conditions:** Use clear, understandable conditional logic
- **Field Validation:** Validate field existence and data types in queries
- **Testing:** Thoroughly test queries with various data scenarios

### Error Message Design
- **User Focus:** Write messages from user perspective, not technical perspective
- **Specific Guidance:** Provide specific instructions for resolving validation issues
- **Consistent Tone:** Maintain consistent tone and style across all error messages
- **Field Context:** Include relevant field values to help users identify issues

### Implementation Strategy
- **Gradual Deployment:** Implement validation rules gradually to minimize user disruption
- **User Training:** Train users on new validation rules and error messages
- **Documentation:** Document validation rules and their business justification
- **Monitoring:** Monitor validation failures to identify common issues

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAErrorIfQueryNotMatched`


</div>

