---
title: EAMakeCreationDateAlwaysAfter
module: core
---


<div class='entity-flows'>

# EAMakeCreationDateAlwaysAfter

**This document was generated using Claude.ai**

## Overview

Adjusts entity creation dates to ensure they always occur after a specified hour by adding random milliseconds while keeping the date within the same day.

## When This Action Runs

Date/time enforcement during entity creation or when time-based business rule validation is needed.

## How It Works

1. **Analyzes current creation time** and compares hour with specified minimum
2. **Adds random milliseconds** incrementally until time is after specified hour
3. **Maintains same-day constraint** with end-of-day boundary protection
4. **Updates creation date** with adjusted time ensuring business rule compliance
5. **Applies infinite loop protection** for edge cases and performance

## Parameters

**Parameter 1:** Hour (Required) - Minimum hour (0-23) after which creation time must occur (e.g., 9 for business hours, 13 for afternoon)

## Database Tables Affected

- **Entity Creation Date Fields** - Updates creation date field with adjusted time
- **Related Date Fields** - May synchronize value date and document dates
- **Self-Contained Operation** - Changes isolated to target entity only

## Important Warnings

### ⚠️ Time and Date Integrity
- Adjustments limited to same calendar day
- Original creation time is permanently modified
- May create artificial time progressions

### ⚠️ Business Logic Impact
- May affect calculations dependent on creation time
- Changed creation times may have audit implications
- May impact integration with systems expecting original times

### ⚠️ Configuration
- Hour parameter must be valid (0-23)
- Ensure hour parameter aligns with business requirements
- Consider time zone implications for hour settings

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAMakeCreationDateAlwaysAfter`

**Related Actions:**
- [EAMakeCreationDateAlwaysBefore](EAMakeCreationDateAlwaysBefore.md) - Ensures creation time is before specified hour


</div>

