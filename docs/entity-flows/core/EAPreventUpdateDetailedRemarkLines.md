---
title: EAPreventUpdateDetailedRemarkLines
module: core
---


<div class='entity-flows'>

# EAPreventUpdateDetailedRemarkLines

**This document was generated using Claude.ai**

## Overview

Prevents updates to existing detailed remark lines while preserving the ability to add new lines. For committed entities, it preserves all original data and only appends new lines with proper timestamp and user tracking.

## When This Action Runs

Automatic execution during detailed remark entity save operations to maintain data integrity and audit trail for remark modifications.

## How It Works

1. **Validates entity state** - Only processes entities that have been committed before
2. **Compares line collections** - Identifies new lines by comparing current and old details collections using line IDs
3. **Preserves original data** - Restores all header fields from old data (code, names, remarks, dates, related entities)
4. **Processes line collections** - Combines old lines (unchanged) with new lines (with current date/user)
5. **Sets audit fields** - Assigns current date and employee to new lines for tracking

## Parameters

**No Parameters Required** - This action runs automatically without configuration.

## Database Tables Affected

- **AbsDetailedRemark Header** - Restores original header field values from old data
- **AbsDetailedRemarkLine Details** - Preserves existing lines and appends new lines with audit information
- **Employee Reference** - Sets current employee on new lines for user tracking

## Important Warnings

### ⚠️ Data Preservation Behavior
- Existing remark lines cannot be modified once committed
- All header field changes are reverted to original values
- Only new line additions are permitted after initial commit

### ⚠️ Audit Trail Impact
- New lines automatically receive current date and user information
- Original lines maintain their original timestamps and user references
- Changes to header fields (remarks, dates, related entities) are not preserved

### ⚠️ Business Process Impact
- Users cannot edit existing remark content after saving
- Corrections require adding new remark lines rather than editing existing ones
- May impact workflows expecting editable remark functionality

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAPreventUpdateDetailedRemarkLines`


</div>
