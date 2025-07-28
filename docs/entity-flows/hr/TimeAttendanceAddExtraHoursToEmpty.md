---
title: TimeAttendanceAddExtraHoursToEmpty
module: hr
---


<div class='entity-flows'>

# TimeAttendanceAddExtraHoursToEmpty

**This document was generated using Claude.ai**

## Overview

Fills missing attendance times based on employee work schedules with optional hour adjustments. Automatically calculates check-in and check-out times from employee attendance plans when dates are present but times are missing, allowing for early arrivals or late departures.

## When This Action Runs

Manual execution during attendance data processing. Typically used when you have attendance records with dates but missing times, and need to populate them based on standard work schedules with flexibility for overtime or adjusted hours.

## How It Works

1. **Processes each attendance line** - Iterates through all attendance records
2. **Identifies missing times** - Finds records with dates but no corresponding times
3. **Retrieves attendance plans** - Gets employee's work schedule for the date
4. **Calculates work times** - Determines standard shift times from attendance plan
5. **Applies hour adjustments** - Adds extra hours to start/end times if specified
6. **Updates missing times** - Sets calculated times only where previously empty
7. **Caches plan lookups** - Stores retrieved plans for performance optimization

## Parameters

**Parameter 1:** Extra From Hours (Optional) - Hours to add to start time (negative for earlier, default: 0)
**Parameter 2:** Extra To Hours (Optional) - Hours to add to end time (positive for later, default: 0)

## Example Usage

- Parameter 1: "-0.5" - Employees arrive 30 minutes early
- Parameter 2: "1" - Employees leave 1 hour late
- Both parameters empty - Use exact shift times

## Database Tables Affected

- **TimeAttendanceLine** - Updates from/to times for records with missing values
- **AttendancePlanLine** - Reads employee work schedules (read-only)
- **Employee** - References for attendance plan lookups (read-only)

## Important Warnings

### ⚠️ Schedule Dependency
- Requires valid attendance plans for employees
- Missing attendance plans result in no time updates
- Only works for dates with defined work schedules

### ⚠️ Weekend Handling
- Skips weekends unless work is scheduled
- No times set for non-working days
- Check attendance plan configuration for weekend work

### ⚠️ First Shift Only
- Only uses the first work period (WorkTime1) from schedules
- Ignores second shifts or split schedules
- Not suitable for complex multi-shift scenarios

### ⚠️ Missing Time Detection
- Only processes lines with dates but missing times
- Existing times are never modified
- Both from and to times processed independently

### ⚠️ Hour Adjustment Logic
- Extra hours can be positive or negative decimals
- Negative values move times earlier
- Positive values move times later
- Adjustments may create invalid times if too large

### ⚠️ Performance Optimization
- Caches attendance plans by employee and month
- Reduces database queries for repeated lookups
- Cache persists only during action execution

### ⚠️ Date Validation
- Assumes dates in attendance lines are valid
- No validation of date ranges
- May process historical or future dates

### ⚠️ Business Logic Assumptions
- Assumes employees follow standard schedules
- Extra hours apply uniformly to all employees
- No individual employee exceptions handled

### ⚠️ Common Use Cases
- Filling times for salaried employees with flexible hours
- Handling overtime scenarios with consistent patterns
- Completing imported attendance data with only dates

### ⚠️ Error Handling
- Null pointer checks prevent crashes
- Missing data silently skipped
- No error messages for failed time calculations

### ⚠️ Time Calculation Precision
- Hour adjustments support decimal values
- 0.5 = 30 minutes, 0.25 = 15 minutes
- Results depend on time field precision

**Module:** hr

**Full Class Name:** `com.namasoft.modules.humanresource.utils.TimeAttendanceAddExtraHoursToEmpty`


</div>

