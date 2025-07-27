---
title: EAReverseLedgerTrans
module: accounting
---

<div class='entity-flows'>

# EAReverseLedgerTrans

**This document was generated using Claude.ai**

## Overview

Reverses previously created accounting transactions by creating opposite entries. Used for document cancellations or partial reversals.

## When This Action Runs

- **Trigger:** Automatic during PreSendRequest event
- **Target:** Documents requiring ledger transaction reversals
- **Purpose:** Cancel or partially reverse existing accounting entries
- **Timing:** Before final ledger transaction processing

## How It Works

1. **Finds original ledger transaction** using entity ID from Parameter 1
2. **Swaps debit/credit amounts** (debits become credits, credits become debits)
3. **Applies percentage adjustments** if specified for partial reversals
4. **Adds reversed lines** to current document's ledger transaction
5. **Optionally consolidates** ledger lines to reduce duplicates

## Parameters

### Parameter 1: Source Entity Field (Required)
- **Purpose:** Entity whose ledger transactions should be reversed
- **Format:** Field reference (e.g., `originalDocument`, `sourceInvoice`)
- **Examples:** `originalSalesInvoice`, `cancelledPayments`

### Parameter 2: Shorten Reversed Lines
- **Values:** `true` or `false` (defaults to `false`)
- **Purpose:** Consolidate reversed lines with identical accounts

### Parameter 3: Shorten Final Lines  
- **Values:** `true` or `false` (defaults to `false`)
- **Purpose:** Consolidate all ledger lines after adding reversals

### Parameter 4: Percentages Field (Optional)
- **Purpose:** Partial reversal percentages (1-100)
- **Examples:** `details.reversalPercentage`, `sql(SELECT 50)`

## Common Use Cases

1. **Document Cancellation:** Full reversal of original document's accounting effects
2. **Partial Returns:** Reverse portion of transaction based on returned quantities
3. **Multiple Document Reversal:** Reverse accounting effects from multiple documents

## Important Warnings

### ⚠️ Critical Requirements
- **Source Entity Required:** Parameter 1 must reference entity with existing ledger effects
- **No Double Reversal Protection:** Multiple executions create multiple reversals
- **Timing Sensitivity:** Only works during document processing phase

### ⚠️ Data Validation
- **Percentage Range:** Values must be 0-100 for partial reversals
- **Entity Lookup:** Source entity must have previously generated ledger transactions

## Related Actions

- **EAGenJournalEntry** - Generates original journal entries that can be reversed
- **EAClearLedgerLines** - Clears ledger lines before generation
- **EAShortenLedger** - Consolidates duplicate account lines

**Module:** accounting

**Full Class Name:** `com.namasoft.modules.accounting.domain.utils.actions.EAReverseLedgerTrans`

</div>

