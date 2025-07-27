---
title: EATimeAttendanceSetDefaultToTime
module: hr
---


<div class='entity-flows'>

# EATimeAttendanceSetDefaultToTime

**This document was generated using Claude.ai**

## Overview

Automatically sets punch-out (to) times for time attendance records that have missing end times. Uses employee work schedules to determine appropriate default end times based on shift patterns and existing punch-in times.

## When This Action Runs

Manual execution for fixing incomplete time attendance records, typically used during payroll processing or attendance data cleanup when employees have punch-in times but missing punch-out times.

## How It Works

1. **Identifies incomplete records** - Finds time attendance lines with missing to dates/times
2. **Retrieves work schedules** - Gets employee work day patterns and shift times
3. **Matches shift patterns** - Finds appropriate work time slots based on existing punch-in times
4. **Calculates distances** - Compares shift start times with recorded punch-in times
5. **Sets end times** - Assigns shift end times to missing to time fields
6. **Handles day wrapping** - Adjusts dates for shifts that span multiple days
7. **Validates duration** - Removes entries that exceed maximum continuous attendance limits

## Parameters

**Parameter 1:** Criteria Code (For Employee) (Optional) - Employee selection criteria for filtering which employees to process
**Parameter 2:** Calc Only If Workday (Optional) - "true" to process only on scheduled work days, "false" to process all days
**Parameter 3:** Max Distance In Hours (Optional) - Maximum difference in hours between shift start time and actual punch-in time

## Database Tables Affected

- **TimeAttendanceLine** - Updates to date and to time fields for incomplete records
- **Employee Work Schedules** - Reads work day patterns and shift definitions
- **HR Configuration** - References maximum continuous attendance settings

## Important Warnings

### ⚠️ Incomplete Record Requirements
- Only processes time attendance lines with empty to dates
- Records must have valid punch-in times for shift matching
- Lines without punch-in times are not processed

### ⚠️ Work Schedule Dependencies
- Requires properly configured employee work schedules with shift times
- Missing or incomplete work schedule data prevents default time setting
- Action relies on work time slots (work time 1, 2, 3) being properly defined

### ⚠️ Shift Matching Logic
- Matches shifts based on proximity of shift start time to actual punch-in time
- Uses maximum distance parameter to filter relevant shifts
- Prefers shifts that end after the punch-in time (normal flow)

### ⚠️ Day Spanning Shifts
- Automatically adjusts to date for shifts that wrap around midnight
- Sets to date to next day if work time spans two days and ends before punch-in time
- Day adjustment affects payroll periods and attendance calculations

### ⚠️ Attendance Duration Validation
- Calculates total attendance duration after setting to time
- Removes entries that exceed maximum continuous attendance limits
- Prevents unrealistic work duration records from being created

### ⚠️ Data Modification Impact
- Modifies existing time attendance records with calculated end times
- Changes affect payroll calculations and attendance reporting
- Generated end times may not reflect actual employee punch-out times

### ⚠️ Employee Filtering
- Criteria code parameter filters which employees are processed
- Empty criteria processes all employees with incomplete records
- Incorrect criteria codes may exclude intended employees

### ⚠️ Configuration Dependencies
- Maximum continuous attendance limit comes from HR configuration
- Missing or incorrect configuration may allow invalid attendance durations
- Configuration changes affect validation behavior

### ⚠️ Time Logic Considerations
- System matches shifts where end time occurs after punch-in time
- For day-wrapping shifts, considers only cases where shift end is before punch-in
- Complex shift patterns may require manual review of generated end times

**Module:** hr

**Full Class Name:** `com.namasoft.modules.humanresource.utils.actions.EATimeAttendanceSetDefaultToTime`

**Related Actions:**
- [EATimeAttendanceSetDefaultFromTime](EATimeAttendanceSetDefaultFromTime.md) - Sets default punch-in times for missing start times


</div>

