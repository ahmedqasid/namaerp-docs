---
title: EAMakeSingleCheckInCheckOutIfNeeded
module: hr
---


<div class='entity-flows'>

# EAMakeSingleCheckInCheckOutIfNeeded

**This document was generated using Claude.ai**

## Overview

Converts incomplete attendance records from check-in only to check-out only when the recorded time falls within a specified range. Useful for correcting attendance data where employees forgot to check in but remembered to check out, typically for afternoon or evening shifts.

## When This Action Runs

Manual execution during attendance data cleanup when you identify patterns of missing check-ins with only check-out times recorded. Commonly used for employees who start work in the afternoon/evening and the system recorded their first punch as check-in instead of check-out.

## How It Works

1. **Processes attendance lines** - Iterates through all time attendance lines in the document
2. **Identifies incomplete records** - Finds lines with check-in data but no check-out data
3. **Validates time range** - Checks if the check-in time falls within the specified time range
4. **Converts to check-out** - Moves check-in date/time to check-out fields
5. **Clears check-in data** - Sets check-in date to null and time to empty
6. **Preserves other data** - All other attendance line information remains unchanged

## Parameters

**Parameter 1:** Range Start (Required) - Start time of the range (e.g., "14:00" for 2:00 PM)

**Parameter 2:** Range End (Required) - End time of the range (e.g., "23:59" for 11:59 PM)

## Database Tables Affected

- **TimeAttendanceLine** - Updates from/to date and time fields for matching records

**Module:** hr

**Full Class Name:** `com.namasoft.modules.humanresource.utils.actions.EAMakeSingleCheckInCheckOutIfNeeded`


</div>