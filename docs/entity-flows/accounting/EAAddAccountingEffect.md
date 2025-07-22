---
title: EAAddAccountingEffect
module: accounting
---


<div class='entity-flows'>

# EAAddAccountingEffect

**This document was generated using AI Tools**

**Description:** Add Extra Effect to Any Document File existing ledger request.

**Parameters:**
- Effects: fieldId=DebitEffectAccSideCode,CreditEffectAccSideCode eg:
n1=N1EffectDR,N1EffectCR
lines.n2=DetailsN2EffectDR,DetailsN2EffectCR
- Apply When Query (Return 0 or 1), example:
select case when {lines.ref1.entityType} in ('Branch','Department') then 1 else 0 end
This example will make the effect happen only for lines ref1 being a branch or a department
- ShortenLedger (true,false)
- Currency Field  (optional)
- Rate Field (optional)
- Flush Before Running (true,false)

**Full Class Name:** `com.namasoft.modules.accounting.domain.utils.actions.EAAddAccountingEffect`

**Module:** accounting

**ℹ️ Note:** This action is forced automatic


</div>

