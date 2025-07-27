---
title: EADSCNormalizeTimeAttendance
module: hr
---


<div class='entity-flows'>

# EADSCNormalizeTimeAttendance

**This document was generated using Claude.ai**

## Overview

Normalizes time attendance records to align with employee work shifts and schedules. Adjusts attendance times to fit within defined work periods, splits attendance lines that span break periods, and removes attendance outside work hours.

## When This Action Runs

Manual execution during attendance processing to clean up and standardize attendance data based on employee work schedules. Typically used to correct attendance times that don't align with official work shifts.

## How It Works

1. **Processes each attendance line** - Iterates through all time attendance lines in the document
2. **Validates required data** - Checks for employee, dates, and times; skips incomplete records
3. **Applies exclusion criteria** - Optionally excludes specific employees based on criteria definition
4. **Retrieves work schedule** - Gets employee's attendance plan and work day configuration for the date
5. **Calculates work shifts** - Identifies first and second work time periods for the day
6. **Adjusts attendance times** - Modifies from/to times to align with work shift boundaries
7. **Handles break periods** - Splits attendance lines that span lunch breaks or non-work periods
8. **Removes invalid records** - Deletes attendance lines that fall completely outside work hours

## Parameters

**Parameter 1:** Excluded Employees Criteria (Optional) - Code of criteria definition to exclude specific employees from normalization

## Example Normalization Logic

**Work Schedule Example:**
- First Shift: 8:30 AM - 12:00 PM
- Second Shift: 12:45 PM - 5:30 PM

**Normalization Rules:**
- Attendance at 8:20 AM → Adjusted to 8:30 AM (work start)
- Attendance at 12:40 PM → Adjusted to 12:45 PM (second shift start)
- Attendance 8:00 AM - 4:00 PM → Split into: 8:30 AM - 12:00 PM AND 12:45 PM - 4:00 PM

## Database Tables Affected

- **TimeAttendanceLine** - Updates from/to times, may delete invalid lines, may create new split lines
- **AttendancePlanLine** - Referenced for employee work schedule data (read-only)
- **CriteriaDefinition** - Used for employee exclusion logic (read-only)

## Important Warnings

### ⚠️ Data Modification Scope
- **Permanently modifies attendance times** to align with work schedules
- **Deletes attendance lines** that fall completely outside work hours
- **Creates new attendance lines** when splitting records across break periods
- Original attendance times are lost and cannot be recovered

### ⚠️ Work Schedule Dependencies
- Requires employee to have valid attendance plan for the date
- Work day configuration must be properly defined
- Missing or invalid work schedules result in no normalization

### ⚠️ Attendance Line Splitting Logic
- Attendance spanning break periods is split into multiple lines
- Each split line gets a new unique ID
- Split lines maintain all other properties from original line

### ⚠️ Machine Code Exclusion
- Attendance lines with machine codes are automatically skipped
- Assumes machine-recorded attendance is already accurate
- Manual attendance entries are subject to normalization

### ⚠️ Time Adjustment Rules
- **Early arrivals** - From times before work start are adjusted to work start time
- **Late departures** - To times after break start but before second shift are adjusted to first shift end
- **Break period entries** - From times during break are adjusted to second shift start
- **After hours** - Attendance completely outside work hours is deleted

### ⚠️ Employee Exclusion Criteria
- Optional criteria can exclude specific employees from normalization
- Excluded employees' attendance remains unchanged
- Criteria must match employee entity for exclusion to apply

### ⚠️ Break Period Handling
- Attendance lines that span lunch breaks are automatically split
- First part ends at first shift end time
- Second part starts at second shift start time
- Ensures no attendance is recorded during break periods

### ⚠️ Weekend and Non-Work Days
- No normalization occurs on days with no defined work schedule
- Weekend days are typically skipped unless work is scheduled
- Holiday handling depends on work day configuration

### ⚠️ Performance Considerations
- Processes each attendance line individually
- May create additional attendance lines through splitting
- Large attendance documents may require significant processing time

### ⚠️ Business Logic Impact
- Normalized times affect payroll calculations and work hour totals
- May reduce total recorded work hours if attendance was outside work periods
- Consider impact on overtime calculations and attendance tracking

**Module:** hr

**Full Class Name:** `com.namasoft.modules.humanresource.utils.actions.EADSCNormalizeTimeAttendance`


</div>

