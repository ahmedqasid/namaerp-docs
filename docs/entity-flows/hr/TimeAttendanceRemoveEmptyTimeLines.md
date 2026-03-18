---
title: TimeAttendanceRemoveEmptyTimeLines
module: hr
---


<div class='entity-flows'>

# TimeAttendanceRemoveEmptyTimeLines

**This document was generated using Claude.ai**

## Overview

Removes attendance lines that have no time information. Cleans up time attendance documents by deleting any lines where both check-in (from time) and check-out (to time) are empty, helping maintain clean and meaningful attendance data.

## When This Action Runs

Manual execution during attendance data cleanup. Typically used after data imports, bulk updates, or when preparing attendance documents for processing to remove incomplete or placeholder records.

## How It Works

1. **Iterates backwards through lines** - Processes from last to first to avoid index issues
2. **Checks time fields** - Examines both from time and to time for each line
3. **Identifies empty lines** - Finds lines where both times are null or empty
4. **Removes empty lines** - Deletes lines with no time information
5. **Preserves valid lines** - Keeps any line with at least one time value

## Parameters

**No Parameters** - This action does not require any input parameters

## Database Tables Affected

- **TimeAttendanceLine** - Removes records with empty time values from the collection

**Module:** hr

**Full Class Name:** `com.namasoft.modules.humanresource.utils.TimeAttendanceRemoveEmptyTimeLines`


</div>

