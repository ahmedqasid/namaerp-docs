---
title: EASCPreventChangingFromDocFields
module: supplychain
---


<div class='entity-flows'>

# EASCPreventChangingFromDocFields

**This document was generated using AI Tools**

**Description:** Prevents changing fields in header or details, can also prevent adding new lines, or removing existing ones between any SC Document and its from doc

**Parameters:**
- Field IDs (csv or lines)
eg:code,name1
details.n1
- Prevent Adding NEW Lines(true or false)
- Prevent Deleting Lines (true or false)
- SQL Query to enable or disable CHANGE VALIDATION for current line. Example: select case when {line.item.item.code} = 'ABC' or {oldLine.item.item.code} = 'ABC' then 1 else 0 end
- SQL Query to enable or disable ADDED LINES VALIDATION for current line.
- SQL Query to enable or disable DELETED LINES VALIDATION for current line.

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EASCPreventChangingFromDocFields`

**Module:** supplychain


</div>

