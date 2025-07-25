---
title: EAGenSCDocFromDocWithFieldsMapWithoutFlush
module: supplychain
---


<div class='entity-flows'>

# EAGenSCDocFromDocWithFieldsMapWithoutFlush

**This document was generated using Claude.ai**

**Description:** No description available

**Parameters:**
- Target Type
- Finder SQL. eg: select id from CreditNote where ref5Id={id}
- Field Map. eg: 
code=code
fromDoc=$this
ref5=$this
- After Copy Lines Fields Map
- Inverse Copy (Copy Fields from Generated to Generator). 
Example:
ref5=$this
description5=n1
- Handle Approval(true,false)
- Save as Draft(true,false)
- Run Only If number greater not zero eg: totlaizesql(select case when {details.item.item.code} in ('a','b','c') then 1 else 0 end)
- Copy only lines matching criteria (Criteria Definition Code)
- Copy Only Lines Matching Query eg: 
select case when {details.item.item.code} in ('a','b','c') then 1 else 0 end 
- Group Lines By
- Query to list all docs that should be deleted if not handled by the entity flow (For Group Lines By)

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EAGenSCDocFromDocWithFieldsMapWithoutFlush`

**Related Actions:**
- [EAAutoGenSCDocFromDocWithFieldsMap](EAAutoGenSCDocFromDocWithFieldsMap.md)


</div>

