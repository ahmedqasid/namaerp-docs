---
title: EAAutoExtendExpiredRentContracts
module: realestate
---


<div class='entity-flows'>

# EAAutoExtendExpiredRentContracts

**This document was generated using Claude.ai**

**Description:** No description available

**Parameters:**
- Generated Contract Book Code Or ID
- Generated Contract Term Code Or ID
- Extend Contracts That have at least n days remainig (default is 0 days)
- Manual Query to specify contracts to extend (optional) eg:
select entityType,id from RERentContract where commitedBefore = 1 and cancelled = 0 and DATEDIFF(day,toDate,GETDATE())>=0
union all
select entityType,id from REOpeningRentContract where commitedBefore = 1 and cancelled = 0 and DATEDIFF(day,toDate,GETDATE())>=0

**Module:** realestate

**Full Class Name:** `com.namasoft.modules.realstate.domain.utils.plugnplay.EAAutoExtendExpiredRentContracts`


</div>

