---
title: EAEGBRASSFixCreationDates
module: supplychain
---


<div class='entity-flows'>

# EAEGBRASSFixCreationDates

**This document was generated using Claude.ai**

**Description:** Fix Creation Date all records returned by the query

**Parameters:**
- Query eg. select entityType,id from StockIssue where fromDoc_id = {id}
- Flush Before Starting (true,false)
- Do not Fix Creation Date cancelled Records (true,false)
- Flush After Each Fix Creation Date (true,false)
- Do In New Transaction - Continue on Errors (true,false)
- Run Update Query After Selecting Entities, and Before Fix Creation Date

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EAEGBRASSFixCreationDates`

**Related Actions:**
- [EARunManualNotificationFromQuery](../core/EARunManualNotificationFromQuery.md)
- [EARegenAccFromQuery](../core/EARegenAccFromQuery.md)
- [EARegenInvTransReqFromQuery](EARegenInvTransReqFromQuery.md)
- [EASaveRecordsFromQuery](../core/EASaveRecordsFromQuery.md)
- [EADeleteFromQuery](../core/EADeleteFromQuery.md)


</div>

