---
title: EAPreventChangingFields
module: core
---


<div class='entity-flows'>

# EAPreventChangingFields

**This document was generated using Claude.ai**

## Overview

Enforces field-level data integrity by preventing unauthorized changes to specified header and detail fields, with optional line addition/deletion protection and conditional SQL logic support.

## When This Action Runs

Data integrity validation during entity save/commit operations for previously committed entities requiring field-level change protection.

## How It Works

1. **Validates entity state** (only applies to previously committed entities)
2. **Processes field configuration** from comma/line-separated field ID lists
3. **Compares header fields** between old and new entity data
4. **Validates detail collections** for line additions, deletions, and field changes
5. **Applies conditional SQL logic** for complex business rules when configured


## Parameters

**Parameter 1:** Field IDs (Required) - Comma/line-separated field IDs to protect (e.g., "code,name1" or "details.item")

**Parameter 2:** Prevent Adding New Lines (Optional) - Boolean to prevent adding detail lines (default: false)

**Parameter 3:** Prevent Deleting Lines (Optional) - Boolean to prevent deleting detail lines (default: false)

**Parameter 4:** Change Validation Query (Optional) - SQL query returning 1/0 to conditionally enable field change validation

**Parameter 5:** Added Lines Validation Query (Optional) - SQL query returning 1/0 to conditionally validate newly added lines

**Parameter 6:** Deleted Lines Validation Query (Optional) - SQL query returning 1/0 to conditionally validate deleted lines

## Database Tables Affected

- **No Direct Modifications** - Validation-only action that reads entity data for comparison
- **Entity Data Comparison** - Compares current and previous entity states
- **Commit Prevention** - Prevents entity commit when validation fails


## Important Warnings

### ⚠️ Entity Requirements
- Only works on previously committed entities (ignores new entities)
- Must run during entity validation phase before final commit
- All specified field IDs must be valid for the target entity type

### ⚠️ Performance Impact
- Field comparison operations add overhead to entity save operations
- Large detail collections may impact validation performance
- Conditional SQL queries add additional processing overhead

### ⚠️ Business Impact
- May prevent expected field changes, impacting user experience
- Requires proper integration with approval and change management workflows
- Needs proper error handling and user notification for validation failures


**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAPreventChangingFields`


</div>