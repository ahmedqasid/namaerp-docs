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

**Module:** hr

**Full Class Name:** `com.namasoft.modules.humanresource.utils.SetAttendanceToFixedTimeIfEmpty`


</div>