---
title: EAMakeCreationDateAlwaysBetween
module: core
---


<div class='entity-flows'>

# EAMakeCreationDateAlwaysBetween

**This document was generated using Claude.ai**

## Overview

Adjusts document creation dates to ensure they fall within a specified time window by synchronizing with value date and adding/subtracting random milliseconds until time is between start and end hours.

## When This Action Runs

Time window enforcement for DocumentFile entities requiring creation time constraints within specific business operation hours.

## How It Works

1. **Validates document value date** and synchronizes creation date with it
2. **Analyzes current hour** against target window boundaries
3. **Determines adjustment direction** (forward or backward) to reach target window
4. **Applies random milliseconds** bidirectionally until time falls within specified hours
5. **Updates creation date** with window-compliant time and infinite loop protection

## Parameters

**Parameter 1:** Ignore (Not Used) - This parameter is not used
**Parameter 2:** Start Hour (Required) - Starting hour (0-23) of time window, inclusive (e.g., 9 for 9 AM)
**Parameter 3:** End Hour (Required) - Ending hour (0-23) of time window, exclusive (e.g., 17 for 5 PM)

*Note: Start hour must be less than end hour and different from end hour*

## Database Tables Affected

- **DocumentFile Creation Date** - Updates creation date field with time adjusted to target window
- **Document Date Fields** - Synchronizes related date fields for consistency
- **Self-Contained Operation** - Changes isolated to target document only

## Important Warnings

### ⚠️ Parameter Requirements
- Start and end hours must be valid integers (0-23)
- Start hour must be less than end hour
- Start and end hours cannot be the same

### ⚠️ Document Timing Impact
- Original creation time is permanently modified
- May affect time-based document sequences
- Changed creation times may have audit implications

### ⚠️ Performance Considerations
- Time adjustment adds overhead to document creation
- Infinite loop protection may trigger in edge cases
- Long-running adjustments may be cancelled by system

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAMakeCreationDateAlwaysBetween`

**Related Actions:**
- [EAMakeCreationDateAlwaysBefore](EAMakeCreationDateAlwaysBefore.md) - Ensures creation time is before specified hour
- [EAMakeCreationDateAlwaysAfter](EAMakeCreationDateAlwaysAfter.md) - Ensures creation time is after specified hour


</div>

