---
title: EAEmpAttendanceSysEntryCalculator
module: hr
---


<div class='entity-flows'>

# EAEmpAttendanceSysEntryCalculator

**This document was generated using Claude.ai**

**Description:** Creates EmpAttendanceSysEntry Automatically.

**Parameters:**
- Select Statement. The first column must be employee id or code, the second is optional and it should return start date, the third is optional and it should return end date
Example:- 
with dates as (
select cast(DATEADD(month, DATEDIFF(month, 0, GETDATE()), 0) as date) mstart,cast(DATEADD(s,-1,DATEADD(mm, DATEDIFF(m,0,GETDATE())+1,0)) as date) mend
)
select distinct l.employee_id,mstart,mend from TimeAttendanceLine l left join dates on 1 = 1 where fromDate >=dates.mstart and l.toDate<=mend
- Ignore manual attendance(true or false)

**Module:** hr

**Full Class Name:** `com.namasoft.modules.humanresource.utils.actions.EAEmpAttendanceSysEntryCalculator`

**⚠️ Warning:** This action prevents simultaneous runs


</div>

