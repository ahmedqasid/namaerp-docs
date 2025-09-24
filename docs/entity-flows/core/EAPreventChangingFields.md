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

**Parameter 1:** Field IDs (Required)
- Comma/line-separated field IDs to protect
- Examples: `code,name1` or `details.n1`

**Parameter 2:** Prevent Adding New Lines (Optional)
- Boolean value: `true` or `false`
- Prevents adding new detail lines (default: `false`)

**Parameter 3:** Prevent Deleting Lines (Optional)
- Boolean value: `true` or `false`
- Prevents deleting detail lines (default: `false`)

**Parameter 4:** Change Validation Query (Optional)
- SQL query returning 1 (enable validation) or 0 (disable validation)
- Conditionally enables field change validation for current line
- Example: `select case when {line.item.item.code} = 'ABC' or {oldLine.item.item.code} = 'ABC' then 1 else 0 end`
- Available variables: `{line.*}` for new values, `{oldLine.*}` for previous values

**Parameter 5:** Added Lines Validation Query (Optional)
- SQL query returning 1 (enable validation) or 0 (disable validation)
- Conditionally validates newly added lines
- Example: `select case when {currentLine.n1} > 0 then 1 else 0 end`
- Use `{currentLine.*}` to access the added line fields

**Parameter 6:** Deleted Lines Validation Query (Optional)
- SQL query returning 1 (enable validation) or 0 (disable validation)
- Conditionally validates deleted lines
- **Important:** Use `{currentLine.*}` to access deleted line data, NOT the detail field name
- Example: `select case when {currentLine.n1} > 0 then 1 else 0 end`
- Access deleted line fields via `{currentLine.*}` pattern

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAPreventChangingFields`


</div>