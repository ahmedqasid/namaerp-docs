---
title: EAErrorIfQueryNotMatched
module: core
---


<div class='entity-flows'>

# EAErrorIfQueryNotMatched

**This document was generated using Claude.ai**

## Overview

Validates entity data using SQL query and displays custom error message if validation fails. Supports multilingual error messages for user feedback.

**⚠️ This entity flow has been replaced by CriteriaBasedValidation**

## When This Action Runs

Entity validation during save operations to enforce business rules and data constraints.

## How It Works

1. **Executes SQL query** against entity data (returns 0 for valid, non-zero for invalid)
2. **Evaluates result** to determine if validation passed or failed
3. **Renders error message** using template with entity field values
4. **Displays multilingual error** in Arabic and optional English

## Parameters

**Parameter 1:** Query (Required) - SQL query returning 0 for valid data, non-zero for invalid (use {fieldName} syntax)

**Parameter 2:** Arabic Error Tempo (Required) - Arabic error message template with field references

**Parameter 3:** English Error Tempo (Optional) - English error message template (fallback to Arabic if not provided)

## Database Tables Affected

- **None** - Validation only, no database modifications

## Important Warnings

### ⚠️ Deprecation
- This entity flow has been replaced by CriteriaBasedValidation
- Use CriteriaBasedValidation for new implementations

### ⚠️ Query Requirements
- Query must return 0 for valid data, non-zero for invalid data
- Ensure all referenced fields exist and are accessible
- Complex queries may impact validation performance


**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAErrorIfQueryNotMatched`


</div>