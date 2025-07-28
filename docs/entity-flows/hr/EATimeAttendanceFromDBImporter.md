---
title: EATimeAttendanceFromDBImporter
module: hr
---


<div class='entity-flows'>

# EATimeAttendanceFromDBImporter

**This document was generated using Claude.ai**

## Overview

Creates or updates time attendance documents by importing data from external databases. Automatically generates one attendance document per period based on SQL query results, typically used for bulk import from biometric attendance systems.

## When This Action Runs

Manual execution or scheduled tasks for regular attendance data imports. Commonly used for monthly imports from attendance machines, creating new documents or updating existing ones based on period.

## How It Works

1. **Executes attendance query** - Runs SQL to retrieve attendance records from external database
2. **Processes data** - Transforms results using format formula and optional Groovy preprocessing
3. **Maps to employees** - Matches records to employees using attendance machine codes
4. **Finds or creates document** - Uses initialization query to determine document properties
5. **Imports attendance lines** - Adds processed attendance records to the document
6. **Saves document** - Either commits (if previously committed) or saves as draft based on parameter
7. **Disables versioning** - Temporarily disables entity versioning during save to improve performance

## Parameters

**Parameter 1:** Query (Required) - SQL query to retrieve attendance data
**Parameter 2:** Format Formula (Required) - Transformation rules for data mapping
**Parameter 3:** Document Initialization Query (Required) - SQL to determine document properties
**Parameter 4:** Save as Draft (Required) - true to save as draft, false to commit
**Parameter 5:** Data Pre-processor (Optional) - Groovy script for custom data processing
**Parameter 6:** Ignore Unfound Employees (Required) - true/false to skip unmatched records

## Example Attendance Query

```sql
SELECT USERID, CHECKTIME, CHECKTYPE
FROM [DSCATM].dbo.CHECKINOUT atm 
LEFT JOIN dsc.dbo.Employee e ON e.attendanceMachineCode = CAST(atm.USERID AS nvarchar(50))
WHERE MONTH(atm.CHECKTIME) = MONTH(GETDATE()) 
  AND YEAR(atm.CHECKTIME) = YEAR(GETDATE())
```

## Example Document Initialization Query

```sql
SELECT 
  'TA' + CAST(YEAR(GETDATE()) * 100 + MONTH(GETDATE()) AS nvarchar(6)) AS code,
  'TAB' AS book,
  YEAR(GETDATE()) * 100 + MONTH(GETDATE()) AS fiscalPeriod,
  CAST(DATEADD(month, DATEDIFF(month, 0, GETDATE()), 0) AS date) AS valueDate
```

## Database Tables Affected

- **TimeAttendance** - Creates new documents or updates existing ones
- **TimeAttendanceLine** - Creates attendance line records
- **Employee** - References employees by attendance machine code (read-only)
- **External Database** - Source of attendance data

## Important Warnings

### ⚠️ Simultaneous Run Prevention
- **This action prevents simultaneous runs**
- Only one import process can run at a time
- Uses class-level locking for all attendance importers

### ⚠️ Document Initialization Critical
- Initialization query determines document code, book, period, and date
- Must return exactly these columns in correct order
- Invalid initialization query prevents document creation

### ⚠️ Period-Based Document Creation
- Creates one document per fiscal period
- Document code should include period for uniqueness
- Existing documents are updated, not replaced

### ⚠️ Format Formula Requirements
- Must match query column order exactly
- Supports field mapping and transformations
- Time adjustments apply to all records

### ⚠️ Employee Matching Logic
- Uses attendanceMachineCode for lookup
- Unmatched records handled based on Parameter 6
- Ensure all active employees have machine codes

### ⚠️ Save Mode Behavior
- Draft mode: Creates draft if new, keeps draft if existing
- Commit mode: Always commits (even existing drafts)
- Previously committed documents always re-commit

### ⚠️ Entity Versioning Disabled
- Temporarily disables versioning during save
- Improves performance for bulk imports
- Version history not maintained for imports

### ⚠️ Data Preprocessing
- Groovy script executes per row
- Errors in script stop entire import
- Keep preprocessing logic simple

### ⚠️ Performance Considerations
- Large datasets may take significant time
- No batching implemented
- Consider splitting large imports by date ranges

### ⚠️ Error Handling
- Empty result sets cause early exit
- Individual row errors logged but don't stop import
- Check logs for skipped records

### ⚠️ Time Zone Handling
- No automatic time zone conversion
- Time adjustments are literal hours
- Ensure source and target time zones align

### ⚠️ Duplicate Prevention
- No built-in duplicate checking
- May create duplicate attendance records
- Consider cleanup actions after import

**Module:** hr

**Full Class Name:** `com.namasoft.modules.humanresource.utils.actions.EATimeAttendanceFromDBImporter`


</div>

