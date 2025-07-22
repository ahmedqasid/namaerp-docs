---
title: EAFixNextAndPreviousFromQuery
module: realestate
---

# EAFixNextAndPreviousFromQuery

**Description:** No description available

**Parameters:**
- Manual Query to specify contracts to fix (optional) eg:
select entityType,id from RERentContract where commitedBefore = 1 
union all
select entityType,id from REOpeningRentContract where commitedBefore = 1 

**Full Class Name:** `com.namasoft.modules.realstate.domain.utils.plugnplay.EAFixNextAndPreviousFromQuery`

**Module:** realestate

