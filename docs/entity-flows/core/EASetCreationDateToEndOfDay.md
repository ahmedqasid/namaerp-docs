---
title: EASetCreationDateToEndOfDay
module: core
---


<div class='entity-flows'>

# EASetCreationDateToEndOfDay

**This document was generated using Claude.ai**

## Overview

**⚠️ DEPRECATED/UNSUPPORTED ACTION**

This entity action is currently unsupported and will throw an error when executed. The functionality appears to be intended for adjusting entity creation dates to end-of-day time, but the implementation is incomplete.

## When This Action Runs

**DO NOT USE** - This action is not functional and will cause errors.

## How It Works

1. **Checks creation date** - Verifies if the entity has a creation date
2. **Throws exception** - Immediately throws "Unsupported operation" error
3. **No processing** - No actual date modification occurs

## Parameters

**No Parameters** - Action does not accept any parameters

## Database Tables Affected

**None** - Action does not modify any data due to unsupported status

## Important Warnings

### ⚠️ CRITICAL - Action Not Functional
- **This action will always fail with an error message**
- **Do not use this action in production workflows**
- **Contact technical support team if this functionality is needed**
- **The action throws: "Unsupported operation, please contact technical support team. EASetCreationDateToEndOfDay"**

### ⚠️ Implementation Status
- Action is incomplete and marked as unsupported in the source code
- Original intent was likely to modify creation date timestamps to end-of-day (23:59:59)
- Current implementation only checks for null creation date then throws exception
- May be a placeholder for future development or deprecated functionality

### ⚠️ Alternative Solutions
- Use database update queries to modify creation dates if needed
- Consider using other date/time manipulation entity actions
- Consult with development team for proper date adjustment approaches
- Manual database updates may be required for creation date modifications

### ⚠️ Technical Support Required
- Any attempt to use this action requires contacting technical support
- Error message explicitly directs users to contact support team
- This may indicate the action requires special configuration or is intentionally disabled

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EASetCreationDateToEndOfDay`

**Status:** Unsupported/Deprecated - Contact Technical Support


</div>

