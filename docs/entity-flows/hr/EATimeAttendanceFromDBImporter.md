---
title: EATimeAttendanceFromDBImporter
module: hr
---


<div class='entity-flows'>

# EATimeAttendanceFromDBImporter

**This document was generated using AI Tools**

**Description:** Creates attendance doc per period from select

**Parameters:**
- Query. eg: SELECT  USERID ,CHECKTIME [(yyyy-MM-dd HH:mm:ss)],CHECKTYPE
  FROM [DSCATM].dbo.CHECKINOUT atm left join dsc.dbo.Employee e on e.attendanceMachineCode = cast(atm.USERID as nvarchar(50))
  where month(atm.CHECKTIME)=MONTH(getdate()) and YEAR(atm.CHECKTIME) = YEAR(GETDATE())
- Format Formula. eg: empid#datetime{}#type{I-O}#exact#addhours{2}
- Document Initialization Query. eg: select 'TA'+cast(year(getdate())*100+ MONTH(getdate()) as nvarchar(6)) code,'TAB' book,year(getdate())*100+ MONTH(getdate()) fiscalPeriod,cast(DATEADD(month, DATEDIFF(month, 0, GETDATE()), 0) as date) valueDate 
- Save as draft(true,false)
- Data Pre-processor (groovy)
- Ignore Unfound Employees

**Full Class Name:** `com.namasoft.modules.humanresource.utils.actions.EATimeAttendanceFromDBImporter`

**Module:** hr

**⚠️ Warning:** This action prevents simultaneous runs


</div>

