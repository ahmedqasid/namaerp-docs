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

## Important Warnings

### ⚠️ Simultaneous Run Prevention
- **This action prevents simultaneous runs**
- Only one import process can run at a time system-wide
- Ensures data consistency during imports

### ⚠️ SQL Query Requirements
- Query must return columns in expected order
- Date/time formats must match system expectations
- Invalid queries cause import failures
- Test queries separately before using in action

### ⚠️ Employee Matching
- Uses attendanceMachineCode field for employee lookup
- Unmatched records are skipped if Parameter 4 is true
- Missing machine codes prevent record import
- Ensure all employees have correct machine codes

### ⚠️ Format Formula Critical
- Incorrect format formulas cause parsing errors
- Field mappings must match query column order
- Time adjustments affect all imported records
- Test format formulas with sample data first

### ⚠️ Data Preprocessing
- Groovy scripts execute for each row
- Script errors stop entire import process
- Use preprocessing for complex transformations
- Keep scripts simple and well-tested

### ⚠️ Document State Handling
- Committed documents are re-committed after import
- Draft documents remain as drafts
- Editing conflicts may occur with concurrent users
- Consider document locking during imports

### ⚠️ Time Zone Considerations
- Time adjustments in format formula are literal hours
- No automatic time zone conversion
- Ensure source data time zone matches expectations
- Document time zone assumptions

### ⚠️ Performance Impact
- Large result sets may take significant time
- Each row processed individually
- No batching or optimization
- Consider date range filters in SQL query

### ⚠️ Error Handling
- Individual row errors don't stop import
- Failed rows are skipped and logged
- Review error messages after import
- May need to re-run for failed records

### ⚠️ Data Validation
- No validation of imported attendance data
- Duplicate checks not performed
- May create overlapping attendance records
- Review imported data for accuracy

### ⚠️ External Database Access
- Requires proper database connection configuration
- Network issues cause import failures
- Database permissions must allow SELECT operations
- Test connectivity before running imports

**Module:** hr

**Full Class Name:** `com.namasoft.modules.humanresource.utils.actions.EATimeAttendanceFromDBImportIntoDocument`


</div>