---
title: EAAddAccountingEffect
module: accounting
---

<div class='entity-flows'>

# EAAddAccountingEffect

**This document was enhanced using Claude.ai for technical support staff**

## Purpose
This entity flow adds extra accounting effects (journal entries) to documents that already have existing ledger transactions. It works by creating additional debit and credit entries based on field values in your document.

## When Does This Run?
- **Automatic Execution**: This flow runs automatically during the "PreSendRequest" event
- **Target Documents**: Works on any Document File (invoices, receipts, etc.) that has accounting effects
- **Timing**: Executes just before the accounting request is sent to create journal entries

## Parameters (Simple Explanation)

### 1. Effects Configuration
**Format:** `fieldId=DebitEffectAccSideCode,CreditEffectAccSideCode`

**What it does:** Tells the system which field contains the amount and which accounting side codes to use for debit/credit entries.

**Examples:**
- `n1=N1EffectDR,N1EffectCR` - Uses the "n1" field value with side codes "N1EffectDR" for debit and "N1EffectCR" for credit
- `lines.n2=DetailsN2EffectDR,DetailsN2EffectCR` - Uses "n2" field from document lines (details) with specified side codes

**Multiple Effects:** Put each effect on a new line to create multiple accounting entries.

### 2. Apply When Query (Optional)
**Purpose:** Controls when the effect should be applied using SQL logic.

**Format:** SQL query that returns 0 (don't apply) or 1 (apply the effect)

**Example:**
```sql
select case when {lines.ref1.entityType} in ('Branch','Department') then 1 else 0 end
```
This means: "Only apply this accounting effect if the reference field (ref1) in the document lines points to a Branch or Department entity."

### 3. ShortenLedger
**Options:** `true` or `false`
**Purpose:** When set to `true`, combines similar accounting entries to reduce the number of journal entry lines
**Recommendation:** Usually set to `true` to keep ledger clean and organized

### 4. Currency Field (Optional)
**Purpose:** Specify which field contains the currency for multi-currency transactions
**Format:** Field ID (like `currencyId` or `lines.currency`)
**When to use:** Only needed for documents with multiple currencies

### 5. Rate Field (Optional)
**Purpose:** Specify which field contains the exchange rate
**Format:** Field ID (like `rate` or `lines.exchangeRate`)
**When to use:** Only needed when currency conversion is required

### 6. Flush Before Running
**Options:** `true` or `false`
**Purpose:** Forces the system to save all pending changes to database before running this flow
**When to use:** Set to `true` if this flow depends on data from other flows that might not be saved yet

## Important Warnings and Limitations

### ⚠️ Stock Document Restriction
**Critical:** This flow cannot be used with:
- Stock Issue documents
- Stock Receipt documents  
- Stock Transfer documents

**Unless:** The global configuration option `EnablePresendRequestsForCostLedger` is enabled.

**Why:** Stock documents have special cost calculation logic that conflicts with this flow's timing.

### ⚠️ Document Must Have Existing Ledger Effects
This flow only works on documents that already generate accounting entries. It adds to existing effects, it doesn't create them from scratch.

### ⚠️ Field Values Must Exist
The field specified in the Effects parameter must contain actual numeric values. Empty or zero values are ignored.

## Common Use Cases

### 1. Additional Tax Entries
When you need to create separate journal entries for specific tax calculations that aren't handled by the main document logic.

### 2. Commission Tracking
Creating separate debit/credit entries to track sales commissions or agent fees.

### 3. Department/Branch Allocation
Adding entries to allocate costs or revenues to specific departments or branches based on document details.

### 4. Multi-Currency Adjustments
Creating additional entries for currency conversion differences or adjustments.


## Module Information
- **Module:** accounting
- **Full Class Name:** `com.namasoft.modules.accounting.domain.utils.actions.EAAddAccountingEffect`
- **Execution Type:** Automatic (runs on PreSendRequest event)

</div>

