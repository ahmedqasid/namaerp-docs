---
title: EAClearLedgerLines
module: accounting
---

<div class='entity-flows'>

# EAClearLedgerLines

**This document was generated using Claude.ai**

## Overview

Automatically removes all ledger transaction lines and debt entries from accounting requests during the pre-processing phase. This system utility ensures clean accounting request generation by clearing any existing transaction data.

## When This Action Runs

- **Trigger:** Pre Send Request (automatic)
- **Target:** LedgerTransReq entities
- **Purpose:** Clear existing transaction lines before new generation
- **Timing:** Before accounting request processing

## How It Works

### Automatic Clearing Process
- **Transaction Lines:** Removes all entries from the `lines` collection
- **Debt Entries:** Removes all entries from the `debts` collection  
- **Safe Operation:** Only processes valid LedgerTransReq objects
- **Memory Operation:** Works on in-memory objects before database persistence

## Business Use Cases

1. **Request Regeneration:** Clear previous attempts before generating new accounting entries
2. **Error Recovery:** Remove corrupted transaction data during error recovery
3. **Data Reset:** Start fresh when recalculating accounting effects

## Important Warnings

### ⚠️ Data Loss Risk
- **Permanent Removal:** All transaction lines are permanently removed from the request
- **No Recovery:** Original transaction data cannot be recovered once cleared
- **Automatic Execution:** Runs without user confirmation

### ⚠️ Troubleshooting Missing Transactions
If accounting transactions are missing:
1. Check system logs for entity flow execution
2. Verify if clearing was part of normal processing
3. Regenerate transactions if necessary

**Module:** accounting

**Full Class Name:** `com.namasoft.modules.accounting.domain.utils.actions.EAClearLedgerLines`

**ℹ️ Note:** This action is automatic and selects its own execution events

## Related Actions

- **EAReverseLedgerTrans**: Reverses existing ledger transactions
- **EASortLedger**: Sorts ledger transaction lines
- **EAShortenLedger**: Consolidates ledger transaction lines

</div>

