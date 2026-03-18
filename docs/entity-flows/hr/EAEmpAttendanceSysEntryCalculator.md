---
title: EAEmpAttendanceSysEntryCalculator
module: hr
---


<div class='entity-flows'>

# EAEmpAttendanceSysEntryCalculator

**This document was generated using Claude.ai**

## Overview

Creates employee attendance system entries automatically based on SQL query results. Processes multiple employees in batch and calculates their attendance for specified date ranges, creating system-generated attendance records.

## When This Action Runs

Manual execution or scheduled tasks for batch attendance calculation. Typically used for end-of-month processing, bulk attendance recalculation, or automated attendance generation based on time attendance data.

## How It Works

1. **Validates configuration** - Checks if manual attendance calculation is enabled in HR settings
2. **Executes SQL query** - Runs the provided query to retrieve employee IDs and optional date ranges
3. **Processes each employee** - Iterates through query results with progress tracking
4. **Determines date range** - Uses query-provided dates or defaults to current month
5. **Calculates attendance** - Runs attendance calculation for each employee within date boundaries
6. **Handles employment dates** - Respects employee commencement and firing dates
7. **Creates transactions** - Each employee calculation runs in a separate database transaction
8. **Accumulates results** - Collects success/failure results from all employee calculations

## Parameters

**Parameter 1:** Select Statement (Required) - SQL query returning employee data
- First column: Employee ID or code (required)
- Second column: Start date (optional, defaults to month start)
- Third column: End date (optional, defaults to month end)

**Parameter 2:** Ignore Manual Attendance (Required) - true/false to bypass manual attendance configuration check

## Example SQL Query

```sql
with dates as (
    select cast(DATEADD(month, DATEDIFF(month, 0, GETDATE()), 0) as date) mstart,
           cast(DATEADD(s,-1,DATEADD(mm, DATEDIFF(m,0,GETDATE())+1,0)) as date) mend
)
select distinct l.employee_id, mstart, mend 
from TimeAttendanceLine l 
left join dates on 1 = 1 
where fromDate >= dates.mstart 
  and l.toDate <= mend
```

## Database Tables Affected

- **EmpAttendanceSysEntry** - Creates new system-generated attendance entries
- **Employee** - Reads employee data including commencement and firing dates
- **TimeAttendanceLine** - May be referenced in the SQL query for employee selection
- **HRConfiguration** - Checks manual attendance calculation settings

**Module:** hr

**Full Class Name:** `com.namasoft.modules.humanresource.utils.actions.EAEmpAttendanceSysEntryCalculator`


</div>

