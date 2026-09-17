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

::: info The "With Action" field does not apply to this flow
Whatever you put in **With Action** (مع الإجراء) - on the entity flow header or on the action
line itself - is replaced with **Automatic** the moment the entity flow is saved, and an
Automatic line is considered on every event. Leaving the field empty and setting it to
*Post Commit* therefore behave exactly the same here, and neither is ever the reason an effect
fails to appear. Real installations run this flow with both, and both work.
:::

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

Two lines count as "similar" only when they agree on all of: the account, the subsidiary, the
entity dimension, the currency, the rate, both narrations and the three reference fields. Lines
that agree on all of that are merged by **netting** them - the totals of the two sides are
subtracted from each other and the difference is written to whichever side it belongs on.

::: warning A pair of exactly opposite lines disappears completely
Netting means a 401,700 debit and a 401,700 credit on the same account and subsidiary cancel to
zero - and a zero line is removed, so **both lines vanish from the entry** instead of showing as
an offsetting pair. The entry then reads as though the effect never ran at all.

This is normally exactly what you want from shortening, but it is the most misleading thing to
meet while diagnosing an entry. When you are testing a new effect, set this to `false` first,
confirm every line you expect is really there, then switch it back on.
:::

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

## The Sign of the Amount Decides the Direction

The amount is read out of the field exactly as it is stored - the system never takes its
absolute value. So the two side codes you write are not fixed as "the debit account" and "the
credit account"; they are the sides a **positive** amount goes to.

With `details.tax1.value=03,02` and a tax value of 401,700, side 03 is debited and side 02 is
credited, as you would expect.

When the amount is **negative**, the system rewrites the line before it reaches the entry: it
takes the amount off the side you named and writes the same amount, as a positive figure, on the
**opposite** side. A debit of -401,700 is stored as a credit of 401,700, and a credit of -401,700
is stored as a debit of 401,700. Both sides of the pair flip together, so with a negative amount
the two codes effectively swap roles - and the finished entry never shows a negative figure.

::: tip Taxes marked as a deduction
A tax whose plan line is ticked as a **deduction** stores its value as a negative number, so
`details.tax2.value` on a contract whose price is 40,170,000 and whose deduction tax is 1% holds
-401,700, not 401,700. Feeding that field into an effect therefore produces the mirror image of
what the two side codes read like.

Decide which you want and write the codes accordingly: leave them in their natural order and let
the flip happen, or write them the other way round so the flip cancels out and the entry comes out
in the direction the codes suggest. Either is fine - what you must not do is assume the amount is
positive because the screen shows a tax percentage.
:::

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

