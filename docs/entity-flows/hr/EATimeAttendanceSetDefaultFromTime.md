---
title: EATimeAttendanceSetDefaultFromTime
module: hr
---


<div class='entity-flows'>

# EATimeAttendanceSetDefaultFromTime

**This document was generated using Claude.ai**

## Overview

Automatically sets punch-in (from) times for time attendance records that have missing start times. Uses employee work schedules to determine appropriate default start times based on shift patterns and existing punch-out times.

## When This Action Runs

Manual execution for fixing incomplete time attendance records, typically used during payroll processing or attendance data cleanup when employees have punch-out times but missing punch-in times.

## How It Works

1. **Identifies incomplete records** - Finds time attendance lines with missing from dates/times
2. **Retrieves work schedules** - Gets employee work day patterns and shift times
3. **Matches shift patterns** - Finds appropriate work time slots based on existing punch-out times
4. **Calculates distances** - Compares shift end times with recorded punch-out times
5. **Sets start times** - Assigns shift start times to missing from time fields
6. **Handles day wrapping** - Adjusts dates for shifts that span multiple days
7. **Validates duration** - Removes entries that exceed maximum continuous attendance limits

## Parameters

**Parameter 1:** Criteria Code (For Employee) (Optional) - Employee selection criteria for filtering which employees to process
**Parameter 2:** Calc Only If Workday (Optional) - "true" to process only on scheduled work days, "false" to process all days
**Parameter 3:** Max Distance In Hours (Optional) - Maximum difference in hours between shift end time and actual punch-out time

## Database Tables Affected

- **TimeAttendanceLine** - Updates from date and from time fields for incomplete records
- **Employee Work Schedules** - Reads work day patterns and shift definitions
- **HR Configuration** - References maximum continuous attendance settings

## Important Warnings

### ⚠️ Incomplete Record Requirements
- Only processes time attendance lines with empty from dates
- Records must have valid punch-out times for shift matching
- Lines without punch-out times are not processed

### ⚠️ Work Schedule Dependencies
- Requires properly configured employee work schedules with shift times
- Missing or incomplete work schedule data prevents default time setting
- Action relies on work time slots (work time 1, 2, 3) being properly defined

### ⚠️ Shift Matching Logic
- Matches shifts based on proximity of shift end time to actual punch-out time
- Uses maximum distance parameter to filter relevant shifts
- Prefers shifts that start before the punch-out time (normal flow)

### ⚠️ Day Spanning Shifts
- Automatically adjusts from date for shifts that wrap around midnight
- Sets from date to previous day if work time spans two days
- Day adjustment affects payroll periods and attendance calculations

### ⚠️ Attendance Duration Validation
- Calculates total attendance duration after setting from time
- Removes entries that exceed maximum continuous attendance limits
- Prevents unrealistic work duration records from being created

### ⚠️ Data Modification Impact
- Modifies existing time attendance records with calculated start times
- Changes affect payroll calculations and attendance reporting
- Generated start times may not reflect actual employee punch-in times

### ⚠️ Employee Filtering
- Criteria code parameter filters which employees are processed
- Empty criteria processes all employees with incomplete records
- Incorrect criteria codes may exclude intended employees

### ⚠️ Configuration Dependencies
- Maximum continuous attendance limit comes from HR configuration
- Missing or incorrect configuration may allow invalid attendance durations
- Configuration changes affect validation behavior

**Module:** hr

**Full Class Name:** `com.namasoft.modules.humanresource.utils.actions.EATimeAttendanceSetDefaultFromTime`

**Related Actions:**
- [EATimeAttendanceSetDefaultToTime](EATimeAttendanceSetDefaultToTime.md) - Sets default punch-out times for missing end times


</div>

