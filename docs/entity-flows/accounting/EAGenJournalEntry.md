---
title: EAGenJournalEntry
module: accounting
---


<div class='entity-flows'>

# EAGenJournalEntry

**This document was generated using AI Tools**

**Description:** Generates Journal Entry from Any Document File

**Parameters:**
- Finder query eg.(select id from JournalEntry where ref1Id = {id})
- Journal Entry Fields Updater(eg: book="JEB"
term="JET"
- Effects: fieldId=DebitEffectAccSideCode,CreditEffectAccSideCode eg: n1=N1EffectDR,N1EffectCR
lines.n2=DetailsN2EffectDR,DetailsN2EffectCR
- ShortenLedger (true,false)
- Inverse Copy Fields (From Journal Entry to my self)
- Apply When Query (Return 0 or 1), example:
select case when {lines.ref1.entityType} in ('Branch','Department') then 1 else 0 end
This example will make the effect happen only for lines ref1 being a branch or a department
- Currency Field  (optional)
- Rate Field (optional)

**Full Class Name:** `com.namasoft.modules.accounting.domain.utils.actions.EAGenJournalEntry`

**Module:** accounting


</div>

