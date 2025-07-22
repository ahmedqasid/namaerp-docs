---
title: EARegenAccFromQuery
module: core
---

# EARegenAccFromQuery

**Description:** RegenAccEffects all records returned by the query

**Parameters:**
- Query eg. select entityType,id from StockIssue where fromDoc_id = {id}
- Flush Before Starting (true,false)
- Do not RegenAccEffects cancelled Records (true,false)
- Flush After Each RegenAccEffects (true,false)
- Do In New Transaction - Continue on Errors (true,false)
- Run Update Query After Selecting Entities, and Before RegenAccEffects

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EARegenAccFromQuery`

**Module:** core

