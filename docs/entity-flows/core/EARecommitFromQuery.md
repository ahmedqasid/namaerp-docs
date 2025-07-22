---
title: EARecommitFromQuery
module: core
---

# EARecommitFromQuery

**Description:** Recommit all records returned by the query

**Parameters:**
- Query eg. select entityType,id from StockIssue where fromDoc_id = {id}
- Flush Before Starting (true,false)
- Do not Recommit cancelled Records (true,false)
- Flush After Each Recommit (true,false)
- Do In New Transaction - Continue on Errors (true,false)
- Run Update Query After Selecting Entities, and Before Recommit

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EARecommitFromQuery`

**Module:** core

