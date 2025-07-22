---
title: EAGenerateEntityFromEntityActionWithApproval
module: core
---

# EAGenerateEntityFromEntityActionWithApproval

**Description:** Creates Entity from another entity, should be used in combination with DeleteRelatedEntityAction

**Parameters:**
- Target Type
- Finder SQL. eg: select id from CreditNote where ref5Id={id}
- Field Map. eg: 
code=code
fromDoc=$this
ref5=$this
- Update Only(true,false)
- Inverse Copy (Copy Fields from Generated to Generator). 
Example:
ref5=$this
description5=n1
- Run Entity Flow Per Each Line. eg: details
- Insert Only(true,false)
- Apply When Query (Used primarily for 'Per Each Line'). eg: select case when {line.item.item.itemType} = 'Service' then 1 else 0 end
- Group Details By (Please review samples doc)
- Run Only If number greater not zero eg: totlaizesql(select case when {details.item.item.code} in ('a','b','c') then 1 else 0 end)

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAGenerateEntityFromEntityActionWithApproval`

**Module:** core

