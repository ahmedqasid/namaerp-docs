---
title: EASortLedger
module: accounting
---

<div class='entity-flows'>

# EASortLedger

**This document was generated using Claude.ai**

## Overview

Automatically sorts ledger transaction lines in a specific order before they are sent to the accounting system. Ensures debit and credit entries follow accounting best practices.

## When This Action Runs

- **Trigger:** Automatic during PreSendRequest event
- **Target:** Documents with ledger transactions (LedgerTransReq)
- **Purpose:** Organize transaction lines in logical sequence
- **Timing:** Before ledger transaction processing

## How It Works

### Sorting Logic
Lines are sorted based on **net amount** (Credit - Debit):
- **Negative amounts first:** Debit > Credit (debit entries)
- **Positive amounts last:** Credit > Debit (credit entries)
- **Grouping:** All debits grouped together, all credits grouped together

### Sorting Calculation
```
Net Amount = Credit Local Amount - Debit Local Amount

Negative net (debits) → Appear first
Positive net (credits) → Appear last
Same sign → Order preserved
```

## Database Impact

### Fields Used
- `credit_local_amount` - Local currency credit amount
- `debit_local_amount` - Local currency debit amount

### Tables Affected
- **LedgerTrans** - Final sorted transactions
- **LedgerTransLine** - Individual sorted lines

## Important Warnings

### ⚠️ Processing Notes
- **Memory Sorting:** Only sorts lines in memory before processing
- **Automatic Execution:** Cannot be manually controlled or disabled
- **Order Dependency:** Reports may depend on this sorting order

### ⚠️ Performance Impact
- Minimal impact for typical volumes
- Large transaction sets (1000+ lines) may experience delays

## Related Actions

- **EAShortenLedger** - Often runs after sorting to consolidate lines
- **EAGenJournalEntry** - Generates lines that get sorted
- **EAClearLedgerLines** - Clears lines before sorting

**Module:** accounting

**Full Class Name:** `com.namasoft.modules.accounting.domain.utils.actions.EASortLedger`

</div>

