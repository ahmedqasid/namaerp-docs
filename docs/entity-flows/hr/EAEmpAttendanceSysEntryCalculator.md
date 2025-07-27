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

## Important Warnings

### ⚠️ Manual Attendance Configuration
- Action fails if manual attendance calculation is enabled unless Parameter 2 is set to true
- Parameter 2 allows bypassing this check but use with caution
- Verify HR configuration settings before running

### ⚠️ Simultaneous Run Prevention
- **This action prevents simultaneous runs**
- Only one instance can execute at a time system-wide
- Ensures data consistency during bulk calculations

### ⚠️ SQL Query Requirements
- Query must return at least one column (employee ID or code)
- Employee ID/code in first column is mandatory
- Invalid employee IDs will cause calculation failures
- Large result sets may impact performance

### ⚠️ Date Range Handling
- If no dates provided in query, uses current month (start to end)
- Automatically limits dates to employee's employment period
- Commencement date acts as earliest calculation date
- Firing date acts as latest calculation date

### ⚠️ Transaction Management
- Each employee calculation runs in a separate transaction
- Failure for one employee doesn't affect others
- Failed calculations are logged but processing continues
- Review accumulated results for individual failures

### ⚠️ Progress Tracking
- Shows progress as "Calculating attendance for employee X of Y"
- Task can be killed by user during execution
- Killing the task stops further processing immediately

### ⚠️ Performance Considerations
- Processes employees sequentially, not in parallel
- Large employee counts may take significant time
- Consider breaking into smaller batches for better control
- Monitor system resources during execution

### ⚠️ Business Logic Impact
- Creates official attendance records used for payroll
- Overwrites existing system entries for the same period
- Manual attendance entries are typically preserved
- Affects salary calculations and reporting

### ⚠️ Error Handling
- Individual employee failures don't stop the entire process
- Each failure is captured in the accumulating result
- Review all error messages after completion
- May need to rerun for failed employees

### ⚠️ Date Calculation Examples
- Current month start: First day of current month at 00:00:00
- Current month end: Last day of current month at 23:59:59
- Respects employee-specific date boundaries
- Handles partial month calculations for new/terminated employees

**Module:** hr

**Full Class Name:** `com.namasoft.modules.humanresource.utils.actions.EAEmpAttendanceSysEntryCalculator`


</div>

