---
title: EAChangeEmployeeStateHandler
module: hr
---

# EAChangeEmployeeStateHandler

**Description:** Change Employee State From Query Based On Vacation Documents

**Parameters:**
- Query. eg: select d.id from VacationDocument d left join Employee e on e.id = d.employee_id left join VacationType t on t.id = d.vacationType_id
 where d.commitedBefore = 1 and d.startDate >= cast(getdate() as date) and t.changeEmployeeStateTo <> e.employeeState

**Full Class Name:** `com.namasoft.modules.humanresource.utils.actions.EAChangeEmployeeStateHandler`

**Module:** hr

