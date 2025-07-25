---
title: EAGuessEntityFromNames
module: core
---


<div class='entity-flows'>

# EAGuessEntityFromNames

**This document was generated using Claude.ai**

**Description:** Guesses the nearest matching entity using names

**Parameters:**
- Guess Into Field (Target)
- Guess From Field (Source)
- Target Entity Type (If field is reference not generic reference)
- Always guess even if target field is not empty (default is false)
- Max Applicable weight (default is 50)
- Minimum Substring Length (default is 4)
- Previous Result Cache Statement (eg: select distinct l.text2,l.item_id from PurchaseQuotationLine l
 where l.text2 <> '' and l.item_id is not null)
- Extra Comparison Fields (eg: defaultDetailData.minPrice=details.n2)
- Min Matched First Letters

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAGuessEntityFromNames`


</div>

