---
title: EASaveToAnotherServerUsingJSON
module: core
---


<div class='entity-flows'>

# EASaveToAnotherServerUsingJSON

**This document was generated using Claude.ai**

**Description:** No description available

**Parameters:**
- Other Server URL (ex. http://localhost:7070/)
- Login ID
- Password
- Append @draft to document files code if first save
- Ignore Not Found References on the Other Server (true/false)
- Save As Draft (true/false)
- Fields Value Overrider(Fields Map - Only Header Fields. e.g: 
book="ABC"
name1=sql(select case when {group.code} = '11' then '' else {group.name1} end))
- Do Not Use Current User Dimensions
- Max Trials Count (default 10)
- Save From Query (e.g: select entityType,id from SalesInvoice where valueDate >= {date1} )
- Add Manual Code Prefix (true/false)
- Keep Creation Date

**Module:** core

**Full Class Name:** `com.namasoft.commonservices.utils.EASaveToAnotherServerUsingJSON`

**Related Actions:**
- [EASaveToAnotherServer](EASaveToAnotherServer.md)


</div>

