---
title: SetAttendanceToFixedTimeIfEmpty
module: hr
---


<div class='entity-flows'>

# SetAttendanceToFixedTimeIfEmpty

**This document was generated using Claude.ai**

## Overview

Fills missing time values in attendance records with default fixed times. Automatically completes partial attendance entries by adding default check-in and check-out times where missing, and synchronizes dates between from/to fields.

## When This Action Runs

Manual execution during attendance data cleanup or processing. Typically used when importing attendance data with incomplete time information or when standardizing attendance records with consistent time values.

## How It Works

1. **Iterates through attendance lines** - Processes each attendance line in the document
2. **Skips completely empty lines** - Ignores lines with both from and to times empty
3. **Synchronizes dates** - Copies from date to to date (or vice versa) when one is missing
4. **Applies default from time** - Sets from time to default if empty or zero
5. **Applies default to time** - Sets to time to default if empty or zero
6. **Preserves existing values** - Only modifies empty or zero time fields

## Parameters

**Parameter 1:** Default From Time (Required) - Default check-in time (e.g., "08:00")
**Parameter 2:** Default To Time (Required) - Default check-out time (e.g., "17:00")

## Database Tables Affected

- **TimeAttendanceLine** - Updates from/to dates and times for incomplete records

## Important Warnings

### ⚠️ Time Value Detection
- Treats zero time values (00:00) as empty and replaces them
- This may incorrectly replace legitimate midnight times
- Consider if midnight is a valid time in your business context

### ⚠️ Date Synchronization Logic
- If to date is empty, copies from date to to date
- If from date is empty, copies to date to from date
- Ensures both dates are populated for valid attendance records

### ⚠️ Partial Record Completion
- Only processes lines that have at least one time value
- Completely empty lines are skipped entirely
- Designed for completing partial records, not creating new ones

### ⚠️ Default Time Application
- Same default times applied to all incomplete records
- No consideration of employee shifts or schedules
- May not be appropriate for employees with different work hours

### ⚠️ No Validation
- Does not validate if default times make business sense
- Could create invalid attendance records (e.g., check-out before check-in)
- Review results after applying defaults

### ⚠️ Bulk Updates
- Modifies all matching records in the document
- No way to selectively apply to specific employees
- Consider filtering attendance lines before running

### ⚠️ Time Format Requirements
- Time parameters must be in valid format (HH:MM)
- Invalid time formats cause parsing errors
- Test with sample data before bulk application

### ⚠️ Business Logic Assumptions
- Assumes single shift per day (one check-in, one check-out)
- Not suitable for multiple shift scenarios
- May oversimplify complex attendance patterns

### ⚠️ Data Loss Prevention
- Only fills empty values, preserves existing data
- Original non-empty times are never modified
- Safe to run multiple times on same document

### ⚠️ Common Use Cases
- Standardizing imported attendance data
- Filling missing times for salaried employees
- Creating uniform attendance records for reporting

**Module:** hr

**Full Class Name:** `com.namasoft.modules.humanresource.utils.SetAttendanceToFixedTimeIfEmpty`


</div>

