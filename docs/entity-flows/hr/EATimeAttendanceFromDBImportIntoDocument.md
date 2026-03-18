---
title: EATimeAttendanceFromDBImportIntoDocument
module: hr
---


<div class='entity-flows'>

# EATimeAttendanceFromDBImportIntoDocument

**This document was generated using Claude.ai**

## Overview

Imports time attendance data from external databases directly into the current time attendance document. Executes SQL queries against attendance machine databases and transforms the results into attendance lines within the existing document.

## When This Action Runs

Manual execution during attendance data import processes. Used when importing attendance records from biometric devices, access control systems, or other external attendance tracking databases into the current document.

## How It Works

1. **Opens document for editing** - Starts editing mode on the current time attendance document
2. **Executes SQL query** - Runs the provided query against external database
3. **Processes query results** - Transforms each row using format formula
4. **Optional preprocessing** - Applies Groovy script for data transformation if provided
5. **Maps to employees** - Matches records to employees using attendance machine codes
6. **Creates attendance lines** - Generates time attendance lines from processed data
7. **Merges with existing lines** - Adds new lines to document's existing attendance records
8. **Saves document** - Commits changes if document was previously committed, otherwise saves as draft

## Parameters

**Parameter 1:** Query (Required) - SQL query to retrieve attendance data

**Parameter 2:** Format Formula (Required) - Transformation rules for data mapping

**Parameter 3:** Data Pre-processor (Optional) - Groovy script for custom data processing

**Parameter 4:** Ignore Unfound Employees (Required) - true/false to skip records with no matching employee

## Example SQL Query

```sql
SELECT USERID, CHECKTIME, CHECKTYPE
FROM [DSCATM].dbo.CHECKINOUT atm 
LEFT JOIN dsc.dbo.Employee e ON e.attendanceMachineCode = CAST(atm.USERID AS nvarchar(50))
WHERE MONTH(atm.CHECKTIME) = MONTH(GETDATE()) 
  AND YEAR(atm.CHECKTIME) = YEAR(GETDATE())
```

## Format Formula Syntax

Example: `empid#datetime{}#type{I-O}#exact#addhours{2}`

- **empid** - Employee identifier field
- **datetime{}** - Date/time field with optional format
- **type{I-O}** - Check type mapping (I=In, O=Out)
- **exact** - Exact matching mode
- **addhours{2}** - Time adjustment (add 2 hours)

## Database Tables Affected

- **TimeAttendance** - Updates the current document with new attendance lines
- **TimeAttendanceLine** - Creates new attendance line records
- **Employee** - References employees by attendance machine code (read-only)
- **External Database** - Reads attendance data from specified connection

**Module:** hr

**Full Class Name:** `com.namasoft.modules.humanresource.utils.actions.EATimeAttendanceFromDBImportIntoDocument`


</div>