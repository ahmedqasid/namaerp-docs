---
title: EASetCreationDateToStartOfDay
module: core
---


<div class='entity-flows'>

# EASetCreationDateToStartOfDay

**This document was generated using Claude.ai**

## Overview

Adjusts the entity's creation date to the start of the day (00:00:00). Preserves the original date but sets the time component to midnight, useful for date normalization and grouping operations.

## When This Action Runs

Manual execution for date standardization, reporting preparation, or when grouping entities by creation date without considering specific time components.

## How It Works

1. **Checks creation date** - Verifies if the entity has a creation date set
2. **Skips if empty** - Returns success without changes if creation date is null or empty
3. **Preserves date** - Keeps the original date (year, month, day)
4. **Sets time to midnight** - Changes time component to 00:00:00.000
5. **Updates entity** - Saves the modified creation date to the entity

## Parameters

**No Parameters** - Action does not require any input parameters

## Database Tables Affected

- **Entity Tables** - Updates the creation date field (creationDate) in the entity's main table
- **Audit Tables** - May trigger audit logging if entity modification tracking is enabled

## Important Warnings

### ⚠️ Date Modification Impact
- **Original creation time is permanently lost** - Time component is irreversibly changed to midnight
- **Affects audit trails** - Changes may impact creation time-based auditing and reporting
- **No backup of original time** - Consider capturing original timestamp before modification if needed

### ⚠️ Entity Requirements
- Entity must have a valid creation date field
- Action skips entities with null or empty creation dates
- Only affects the current entity being processed

### ⚠️ Time Zone Considerations
- Uses system/server time zone for time calculations
- May cause unexpected results if entities were created in different time zones
- Start of day is based on server time zone, not entity creation time zone

### ⚠️ Business Logic Impact
- May affect calculations that depend on precise creation timestamps
- Could impact time-based business rules and workflows
- Consider implications for reports that use creation time for sorting or filtering

### ⚠️ Data Consistency
- Use consistently across related entities to maintain data integrity
- Consider running on all entities in a batch to avoid mixed timestamp formats
- May cause confusion if only some entities have normalized creation dates

### ⚠️ Reporting and Analytics
- Will change results for time-based reports that include creation timestamps
- May improve date-based grouping and aggregation queries
- Could affect existing dashboard and analytics that rely on creation time precision

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EASetCreationDateToStartOfDay`

**Related Actions:**
- [EASetCreationDateToEndOfDay](EASetCreationDateToEndOfDay.md) - Similar action for end-of-day adjustment (currently unsupported)


</div>

