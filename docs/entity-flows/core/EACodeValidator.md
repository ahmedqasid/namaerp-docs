---
title: EACodeValidator
module: core
---


<div class='entity-flows'>

# EACodeValidator

**This document was generated using Claude.ai**

## Overview

This entity flow validates that entity code fields conform to specific formatting rules. It enforces code length limits, required prefixes/suffixes, and pattern matching using regular expressions. This ensures consistent code formatting across the system and prevents data entry errors.

## When This Action Runs

- **Trigger:** Entity validation during save operations
- **Target:** Any entity with a code field that needs format validation
- **Purpose:** Enforce consistent code formatting and prevent invalid codes
- **Timing:** Runs during entity validation before save/update operations

## How It Works

### 1. Length Validation
- **Minimum Length:** Checks if code meets minimum character requirements
- **Maximum Length:** Validates code doesn't exceed maximum character limits
- **Character Counting:** Counts actual characters in the code field
- **Validation Feedback:** Provides specific error messages for length violations

### 2. Prefix and Suffix Validation
- **Prefix Check:** Ensures code starts with required prefix text
- **Suffix Check:** Validates code ends with required suffix text
- **String Matching:** Uses exact string matching for prefix/suffix validation
- **Case Sensitivity:** Prefix and suffix matching is case-sensitive

### 3. Regular Expression Pattern Matching
- **Pattern Validation:** Tests code against custom regular expression patterns
- **Complex Rules:** Supports sophisticated validation rules through regex
- **Pattern Compilation:** Compiles regex patterns for efficient validation
- **Flexible Matching:** Allows for complex code format requirements

### 4. Error Reporting
- **Accumulative Results:** Collects multiple validation errors in single result
- **Specific Messages:** Provides clear error messages for each validation failure
- **User Feedback:** Returns detailed feedback about which rules were violated
- **Validation Summary:** Aggregates all validation issues for user review

## Validation Rules

### Length Rules
- **Minimum Length:** Ensures codes meet minimum character requirements
- **Maximum Length:** Prevents codes from becoming too long
- **Character Count:** Based on actual string length, not display width
- **Null Handling:** Handles empty or null codes appropriately

### Format Rules
- **Prefix Requirements:** Codes must start with specified text
- **Suffix Requirements:** Codes must end with specified text
- **Case Sensitivity:** All text matching is case-sensitive
- **Exact Matching:** Uses exact string matching for prefix/suffix

### Pattern Rules
- **Regular Expressions:** Supports full regex pattern matching
- **Complex Patterns:** Can validate complex code structures
- **Character Classes:** Supports regex character classes and quantifiers
- **Custom Validation:** Allows for highly specific validation rules

## Parameters

### Parameter 1: Min Len,Max Len
- **Type:** Text (Optional)
- **Format:** "MinLength,MaxLength" (comma-separated values)
- **Purpose:** Sets minimum and maximum character length limits for codes
- **Validation:** Both values must be positive integers

**Examples:**
- `3,10` - Code must be between 3 and 10 characters
- `5,` - Code must be at least 5 characters (no maximum)
- `,20` - Code must not exceed 20 characters (no minimum)
- `8,8` - Code must be exactly 8 characters

**Length Rules:**
- Minimum length enforced if specified
- Maximum length enforced if specified
- Either value can be omitted (empty string)
- Both values can be specified for range validation

### Parameter 2: Prefix,Suffix
- **Type:** Text (Optional)
- **Format:** "Prefix,Suffix" (comma-separated values)
- **Purpose:** Enforces required prefix and/or suffix text for codes
- **Case Sensitivity:** Matching is case-sensitive

**Examples:**
- `INV,` - Code must start with "INV"
- `,_TEMP` - Code must end with "_TEMP"
- `PROD,_V1` - Code must start with "PROD" and end with "_V1"
- `TEST,TEST` - Code must start and end with "TEST"

**Format Rules:**
- Prefix text must appear at the beginning of the code
- Suffix text must appear at the end of the code
- Either value can be omitted (empty string)
- Both prefix and suffix can be enforced simultaneously

### Parameter 3: Regular Expression
- **Type:** Text (Optional)
- **Format:** Valid regular expression pattern
- **Purpose:** Validates code against complex pattern rules
- **Engine:** Uses system regular expression engine

**Common Pattern Examples:**
- `^[A-Z]{3}[0-9]{3}$` - Three uppercase letters followed by three digits
- `^(PROD|TEST|DEV)_.*` - Must start with PROD_, TEST_, or DEV_
- `^[A-Z0-9_]+$` - Only uppercase letters, digits, and underscores
- `^.{1,50}$` - Any characters, maximum 50 length

**Pattern Guidelines:**
- Use standard regex syntax
- Test patterns thoroughly before implementation
- Consider escape characters for special symbols
- Patterns are compiled once for efficiency

## Database Tables Affected

### Target Entity
- **Code Field:** The entity's code field that is being validated
  - Read to get current code value for validation
  - No modifications made by this action
  - Validation prevents save if rules are violated

### No Direct Database Modifications
This action only validates data and does not modify any database tables. It prevents invalid data from being saved.

## Business Use Cases

### 1. Data Quality Management
- **Consistent Formatting:** Ensure all entity codes follow organizational standards
- **Error Prevention:** Prevent entry of codes that don't meet business rules
- **Data Integrity:** Maintain consistent code formats across the system
- **Quality Assurance:** Enforce coding standards for better data management

### 2. Business Rule Enforcement
- **Naming Conventions:** Enforce company-specific code naming conventions
- **Department Codes:** Validate department-specific code formats
- **Product Categories:** Ensure product codes follow category-specific patterns
- **Location Codes:** Validate location codes for consistency

### 3. System Integration
- **External System Compatibility:** Ensure codes meet external system requirements
- **Import Validation:** Validate imported data against code formatting rules
- **API Compliance:** Ensure API-created entities have properly formatted codes
- **Migration Support:** Validate code formats during system migrations

## Validation Examples

### Length Validation Examples
```
Parameter: "3,10"
Valid: "ABC", "PRODUCT1", "TEST123456"
Invalid: "AB" (too short), "VERYLONGPRODUCTCODE" (too long)
```

### Prefix/Suffix Validation Examples
```
Parameter: "PROD,_V1"
Valid: "PROD123_V1", "PRODUCT_MAIN_V1"
Invalid: "TESTPROD_V1" (wrong prefix), "PROD123_V2" (wrong suffix)
```

### Regex Validation Examples
```
Pattern: "^[A-Z]{3}[0-9]{3}$"
Valid: "ABC123", "XYZ789"
Invalid: "ABC12" (too short), "abc123" (lowercase), "ABC12X" (wrong format)
```

## Important Warnings

### ⚠️ Validation Rule Conflicts
- **Conflicting Rules:** Ensure length limits don't conflict with prefix/suffix requirements
- **Pattern Compatibility:** Verify regex patterns allow for required prefixes/suffixes
- **Rule Testing:** Test all validation rules together to ensure compatibility
- **Edge Cases:** Consider edge cases where multiple rules might conflict

### ⚠️ Regular Expression Complexity
- **Performance Impact:** Complex regex patterns may impact validation performance
- **Pattern Testing:** Thoroughly test regex patterns before production use
- **Escape Characters:** Properly escape special characters in patterns
- **Pattern Documentation:** Document complex patterns for future maintenance

### ⚠️ Case Sensitivity
- **Text Matching:** All prefix/suffix matching is case-sensitive
- **User Training:** Ensure users understand case sensitivity requirements
- **Consistent Usage:** Maintain consistent case usage across the organization
- **Documentation:** Clearly document case requirements for codes

### ⚠️ Existing Data Impact
- **Legacy Codes:** Consider impact on existing codes that may not meet new rules
- **Migration Planning:** Plan for updating existing codes if validation rules change
- **Backward Compatibility:** Consider backward compatibility when implementing new rules
- **Data Cleanup:** May require data cleanup for existing non-compliant codes

## Best Practices

### Rule Design
- **Simple Rules:** Start with simple validation rules and add complexity gradually
- **Clear Requirements:** Ensure validation rules reflect clear business requirements
- **Consistent Application:** Apply similar validation rules consistently across similar entities
- **Documentation:** Document all validation rules and their business justification

### Testing
- **Comprehensive Testing:** Test all validation scenarios including edge cases
- **User Acceptance:** Validate rules with end users before implementation
- **Performance Testing:** Test validation performance with large datasets
- **Error Message Clarity:** Ensure error messages are clear and actionable

### Implementation
- **Gradual Rollout:** Implement validation rules gradually to minimize disruption
- **User Training:** Train users on new code formatting requirements
- **Error Handling:** Provide clear guidance when validation fails
- **Rule Maintenance:** Regularly review and update validation rules as needed

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EACodeValidator`


</div>

