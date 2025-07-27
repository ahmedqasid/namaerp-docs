---
title: EACodeValidator
module: core
---


<div class='entity-flows'>

# EACodeValidator

**This document was generated using Claude.ai**

## Overview

Validates entity code fields against formatting rules including length limits, prefixes/suffixes, and regex patterns. Ensures consistent code formatting and prevents data entry errors.

## When This Action Runs

Entity validation during save operations to enforce consistent code formatting and prevent invalid codes.

## How It Works

1. **Validates length** against min/max limits
2. **Checks prefix/suffix** requirements (case-sensitive)
3. **Tests regex patterns** for complex format rules
4. **Reports errors** with specific validation failure messages

## Key Parameters

**Parameter 1:** Min Len,Max Len (Optional) - "MinLength,MaxLength" format (e.g., `3,10`)
**Parameter 2:** Prefix,Suffix (Optional) - "Prefix,Suffix" format (e.g., `INV,_TEMP`) 
**Parameter 3:** Regular Expression (Optional) - Regex pattern for complex validation


## Database Tables Affected

- **Target Entity** - Reads code field for validation only

No database modifications - only validates data and prevents invalid saves.

## Important Warnings

### ⚠️ Rule Compatibility
- Ensure length limits don't conflict with prefix/suffix requirements
- Test all validation rules together to ensure compatibility
- Complex regex patterns may impact validation performance

### ⚠️ Case Sensitivity
- All prefix/suffix matching is case-sensitive
- Consider impact on existing codes that may not meet new rules

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EACodeValidator`

</div>

