---
title: EAClearToDateIfToTimeEmpty
module: hr
---


<div class='entity-flows'>

# EAClearToDateIfToTimeEmpty

**This document was generated using Claude.ai**

## Overview

Clears the to date field in time attendance lines when the corresponding to time field is empty. Ensures data consistency by removing orphaned date values that don't have associated time values for end-of-work periods.

## When This Action Runs

Manual execution during time attendance data cleanup or validation processes. Typically used to maintain data integrity when time attendance records have incomplete punch-out information.

## How It Works

1. **Iterates through attendance lines** - Processes all time attendance lines in the document
2. **Checks to time field** - Examines each line's to time value for emptiness
3. **Clears to date** - Sets to date to null when to time is empty or null
4. **Maintains consistency** - Ensures that date fields don't exist without corresponding time fields

## Parameters

**No Parameters** - This action does not require any input parameters

## Database Tables Affected

- **TimeAttendanceLine** - Updates to date fields to null when to time is empty

**Module:** hr

**Full Class Name:** `com.namasoft.modules.humanresource.utils.actions.EAClearToDateIfToTimeEmpty`

**Related Actions:**
- [EAClearFromDateIfFromTimeEmpty](EAClearFromDateIfFromTimeEmpty.md) - Clears from dates when from times are empty
- [EATimeAttendanceSetDefaultFromTime](EATimeAttendanceSetDefaultFromTime.md) - Sets missing from times based on work schedules
- [EATimeAttendanceSetDefaultToTime](EATimeAttendanceSetDefaultToTime.md) - Sets missing to times based on work schedules


</div>

