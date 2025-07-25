---
title: EAPreventChangingFields
module: core
---


<div class='entity-flows'>

# EAPreventChangingFields

**This document was generated using Claude.ai**

**Description:** Prevents changing fields in header or details, can also prevent adding new lines, or removing existing ones

**Parameters:**
- Field IDs (csv or lines)
eg:code,name1
details.n1
- Prevent Adding NEW Lines(true or false)
- Prevent Deleting Lines (true or false)
- SQL Query to enable or disable CHANGE VALIDATION for current line. Example: select case when {line.item.item.code} = 'ABC' or {oldLine.item.item.code} = 'ABC' then 1 else 0 end
- SQL Query to enable or disable ADDED LINES VALIDATION for current line.
- SQL Query to enable or disable DELETED LINES VALIDATION for current line.

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAPreventChangingFields`


</div>

