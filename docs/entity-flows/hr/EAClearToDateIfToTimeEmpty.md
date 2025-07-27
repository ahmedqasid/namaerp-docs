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

## Important Warnings

### ⚠️ Data Consistency Purpose
- Designed to maintain logical consistency between date and time fields
- Prevents scenarios where end date exists without corresponding end time value
- Ensures clean data for attendance calculations and reporting

### ⚠️ Data Loss Implications
- **Permanently removes to date values when to time is empty**
- Original to date information is lost and cannot be recovered
- Consider backing up data before running this cleanup action

### ⚠️ Incomplete Attendance Records
- Only affects attendance lines with missing to time values
- Does not attempt to populate missing to time values
- Leaves attendance records incomplete rather than correcting missing times

### ⚠️ Business Logic Impact
- May affect attendance calculations that depend on to date values
- Could impact payroll processing if attendance records become incomplete
- May affect reporting and analytics that use to date information

### ⚠️ Complementary Actions
- This action removes inconsistent data but doesn't fix underlying issues
- Consider using EATimeAttendanceSetDefaultToTime to populate missing times
- May need additional actions to complete attendance record cleanup

### ⚠️ Attendance Processing
- Incomplete attendance records may not be processed correctly
- Payroll calculations may exclude records with missing to date/time
- Consider the impact on employee work hour calculations

### ⚠️ Use Case Scenarios
- Most useful as a data cleanup step before applying other attendance actions
- Helpful for preparing data for consistent processing
- Should be followed by actions that populate missing attendance information

### ⚠️ Validation Requirements
- Ensures data meets basic consistency requirements
- Prevents time calculations with incomplete date/time pairs
- Maintains database referential integrity for attendance processing

**Module:** hr

**Full Class Name:** `com.namasoft.modules.humanresource.utils.actions.EAClearToDateIfToTimeEmpty`

**Related Actions:**
- [EAClearFromDateIfFromTimeEmpty](EAClearFromDateIfFromTimeEmpty.md) - Clears from dates when from times are empty
- [EATimeAttendanceSetDefaultFromTime](EATimeAttendanceSetDefaultFromTime.md) - Sets missing from times based on work schedules
- [EATimeAttendanceSetDefaultToTime](EATimeAttendanceSetDefaultToTime.md) - Sets missing to times based on work schedules


</div>

