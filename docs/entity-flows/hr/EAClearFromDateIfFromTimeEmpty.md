---
title: EAClearFromDateIfFromTimeEmpty
module: hr
---


<div class='entity-flows'>

# EAClearFromDateIfFromTimeEmpty

**This document was generated using Claude.ai**

## Overview

Clears the from date field in time attendance lines when the corresponding from time field is empty. Ensures data consistency by removing orphaned date values that don't have associated time values.

## When This Action Runs

Manual execution during time attendance data cleanup or validation processes. Typically used to maintain data integrity when time attendance records have incomplete punch-in information.

## How It Works

1. **Iterates through attendance lines** - Processes all time attendance lines in the document
2. **Checks from time field** - Examines each line's from time value for emptiness
3. **Clears from date** - Sets from date to null when from time is empty or null
4. **Maintains consistency** - Ensures that date fields don't exist without corresponding time fields

## Parameters

**No Parameters** - This action does not require any input parameters

## Database Tables Affected

- **TimeAttendanceLine** - Updates from date fields to null when from time is empty

**Module:** hr

**Full Class Name:** `com.namasoft.modules.humanresource.utils.actions.EAClearFromDateIfFromTimeEmpty`

**Related Actions:**
- [EATimeAttendanceSetDefaultFromTime](EATimeAttendanceSetDefaultFromTime.md) - Sets missing from times based on work schedules
- [EATimeAttendanceSetDefaultToTime](EATimeAttendanceSetDefaultToTime.md) - Sets missing to times based on work schedules


</div>

