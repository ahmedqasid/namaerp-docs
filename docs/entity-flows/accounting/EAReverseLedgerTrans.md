---
title: EAReverseLedgerTrans
module: accounting
---


<div class='entity-flows'>

# EAReverseLedgerTrans

**This document was generated using Claude.ai**

**Description:** No description available

**Parameters:**
- The field that provides the entity to cancel its Ledger trans
- Shorten Ledger of Reversed Lines
- Shorten Ledger of Final Lines
- Percentages Field eg: 
sql(select case when {details.item.item.code} = '123' then {details.n1} else 100 end)
Another example: details.n4

**Module:** accounting

**Full Class Name:** `com.namasoft.modules.accounting.domain.utils.actions.EAReverseLedgerTrans`

**ℹ️ Note:** This action is an automatic action, it selects the appropriate events to execute itself


</div>

