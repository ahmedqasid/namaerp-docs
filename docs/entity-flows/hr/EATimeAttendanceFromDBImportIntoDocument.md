---
title: EATimeAttendanceFromDBImportIntoDocument
module: hr
---


<div class='entity-flows'>

# EATimeAttendanceFromDBImportIntoDocument

**This document was generated using Claude.ai**

**Description:** Imports attendance into current document

**Parameters:**
- Query. eg: SELECT  USERID ,CHECKTIME [(yyyy-MM-dd HH:mm:ss)],CHECKTYPE
  FROM [DSCATM].dbo.CHECKINOUT atm left join dsc.dbo.Employee e on e.attendanceMachineCode = cast(atm.USERID as nvarchar(50))
  where month(atm.CHECKTIME)=MONTH(getdate()) and YEAR(atm.CHECKTIME) = YEAR(GETDATE())
- Format Formula. eg: empid#datetime{}#type{I-O}#exact#addhours{2}
- Data Pre-processor (groovy)
- Ignore unfound employees

**Module:** hr

**Full Class Name:** `com.namasoft.modules.humanresource.utils.actions.EATimeAttendanceFromDBImportIntoDocument`

**⚠️ Warning:** This action prevents simultaneous runs


</div>

