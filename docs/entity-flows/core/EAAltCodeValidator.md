---
title: EAAltCodeValidator
module: core
---


<div class='entity-flows'>

# EAAltCodeValidator

**This document was generated using Claude.ai**

## Overview

This entity flow validates the alternative code (`altCode`) field of entities to ensure they follow specific formatting requirements. It enforces length constraints, prefix/suffix requirements, and regular expression patterns to maintain data consistency and business rules for alternative coding systems.

## When This Action Runs

- **Trigger:** Typically used as a validation action during entity save operations
- **Target:** Any entity that has an alternative code field
- **Scope:** Validates the altCode field against specified formatting rules
- **Alternative:** Consider using the field format grid in Fields and Entities Settings for simpler cases

## How It Works

### 1. Alternative Code Retrieval
- **Code Access:** Uses `PersistenceUtility.getAltCode()` to retrieve the alternative code
- **Field Focus:** Specifically targets the `altCode` field instead of the primary `code` field
- **Entity Support:** Works with any entity that has an alternative code field
- **Inheritance:** Extends EACodeValidator with altCode-specific behavior

### 2. Length Validation
- **Minimum Length:** Checks if code meets minimum character requirements
- **Maximum Length:** Ensures code doesn't exceed maximum character limits
- **Parameter Format:** Uses comma-separated values for min,max (e.g., "3,10")
- **Flexible Limits:** Either minimum or maximum can be omitted if not needed

### 3. Prefix and Suffix Validation
- **Start Pattern:** Validates that altCode begins with required prefix
- **End Pattern:** Ensures altCode ends with specified suffix
- **Parameter Format:** Comma-separated prefix,suffix values
- **Optional Components:** Either prefix or suffix can be empty if not required

### 4. Regular Expression Validation
- **Pattern Matching:** Tests altCode against custom regular expressions
- **Complex Rules:** Supports sophisticated formatting requirements
- **Validation Engine:** Uses internal RegExp validation system
- **Error Reporting:** Provides clear error messages for pattern mismatches

## Key Difference from Standard Code Validator

Unlike `EACodeValidator`:
- **Field Target:** Validates `altCode` field instead of primary `code` field
- **Secondary Coding:** Designed for alternative coding systems
- **Specialized Use:** Handles specific altCode business requirements

## Parameters

### Parameter 1: Min Length, Max Length
- **Type:** Text (Optional)
- **Format:** "minimum,maximum" (comma-separated)
- **Purpose:** Sets character length constraints for altCode

**Examples:**
- `3,10` - AltCode must be between 3 and 10 characters
- `5,` - AltCode must be at least 5 characters (no maximum)
- `,20` - AltCode cannot exceed 20 characters (no minimum)
- `8,8` - AltCode must be exactly 8 characters

**Validation Behavior:**
- Empty parameter skips length validation
- Missing values (empty before/after comma) skip that constraint
- Invalid numbers are ignored

### Parameter 2: Prefix, Suffix
- **Type:** Text (Optional)
- **Format:** "prefix,suffix" (comma-separated)
- **Purpose:** Enforces required start and end patterns

**Examples:**
- `ALT,` - AltCode must start with "ALT"
- `,_TEMP` - AltCode must end with "_TEMP"
- `PROD,_V1` - AltCode must start with "PROD" and end with "_V1"
- `CUST,` - AltCode must start with "CUST" (no suffix requirement)

**Validation Behavior:**
- Empty parameter skips prefix/suffix validation
- Empty prefix or suffix (before/after comma) skips that requirement
- Case-sensitive matching

### Parameter 3: Regular Expression
- **Type:** Text (Optional)
- **Format:** Valid regular expression pattern
- **Purpose:** Enforces complex formatting rules through pattern matching

**Examples:**
```
^[A-Z]{3}[0-9]{4}$     - Three uppercase letters followed by four digits
^ALT-[0-9]{6}$         - "ALT-" followed by exactly 6 digits
[A-Z0-9]{5,15}         - 5-15 alphanumeric uppercase characters
^(PROD|TEST|DEV)-.*    - Must start with PROD-, TEST-, or DEV-
```

**Pattern Guidelines:**
- Use standard regular expression syntax
- Start patterns with `^` and end with `$` for exact matching
- Test patterns thoroughly before implementation
- Consider case sensitivity requirements

## Database Tables Affected

### Primary Impact
- **Target Entity:** Any entity with altCode field being validated
  - `altCode`: Field being validated against formatting rules
  - Validation occurs before save operation
  - Invalid formats prevent entity save

### Common Entity Types with AltCode
- **Master Files:** Customer, Supplier, Product, Account
- **Document Files:** Invoice, Order, Receipt, Payment
- **Configuration Entities:** Branch, Department, Project

## Business Use Cases

### 1. Alternative Numbering Systems
- **Legacy Codes:** Maintain old system codes alongside new ones
- **External References:** Store external system identifiers
- **Customer Codes:** Use customer-specific reference numbers
- **Barcode Systems:** Validate barcode format requirements

### 2. Data Integration
- **Import Validation:** Ensure imported altCodes meet format standards
- **System Migration:** Validate legacy codes during data conversion
- **API Integration:** Enforce format for external system codes
- **Batch Processing:** Validate codes during bulk operations

### 3. Compliance Requirements
- **Industry Standards:** Enforce industry-specific code formats
- **Regulatory Compliance:** Meet legal requirements for alternative identifiers
- **Audit Requirements:** Maintain consistent coding for audit trails
- **Quality Control:** Ensure data quality in alternative coding systems

## Validation Examples

### Length Validation
```
Parameter: "5,12"
Valid: "ALT12345", "TEMP001234"
Invalid: "ALT1" (too short), "VERYLONGALTCODE123" (too long)
```

### Prefix/Suffix Validation
```
Parameter: "CUST,_V1"
Valid: "CUST001_V1", "CUSTOMER123_V1"
Invalid: "SUP001_V1" (wrong prefix), "CUST001_V2" (wrong suffix)
```

### Regular Expression Validation
```
Pattern: "^[A-Z]{3}[0-9]{4}$"
Valid: "ABC1234", "XYZ9876"
Invalid: "abc1234" (lowercase), "AB1234" (too short), "ABC12345" (too long)
```

## Important Warnings

### ⚠️ Configuration Recommendation
- **Field Format Grid:** Consider using Fields and Entities Settings for simpler validation rules
- **System Integration:** Entity actions should be reserved for complex validation scenarios
- **Performance Impact:** Validation actions run on every save operation
- **Maintenance Overhead:** Regular expressions require careful maintenance

### ⚠️ Validation Behavior
- **Save Prevention:** Invalid altCodes will prevent entity save operations
- **Error Messages:** Users will see validation error messages
- **Required Fields:** Validation only applies if altCode field has a value
- **Case Sensitivity:** All validations are case-sensitive

### ⚠️ Regular Expression Risks
- **Performance Impact:** Complex patterns may slow down save operations
- **Testing Required:** Thoroughly test patterns before production use
- **Escape Characters:** Be careful with special regex characters
- **Documentation:** Document patterns for future maintenance

### ⚠️ Business Logic Considerations
- **User Experience:** Overly restrictive rules may frustrate users
- **Data Migration:** Existing data may not meet new validation rules
- **Exception Handling:** Plan for legitimate cases that don't fit patterns
- **Rule Evolution:** Consider how validation rules may change over time

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAAltCodeValidator`

**Related Actions:**
- [EACodeValidator](EACodeValidator.md)


</div>

