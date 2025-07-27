---
title: EAShortenLedger
module: accounting
---

<div class='entity-flows'>

# EAShortenLedger

**This document was generated using Claude.ai**

## Overview

Consolidates duplicate ledger transaction lines by combining multiple lines with identical characteristics into single lines with net debit/credit amounts.

## When This Action Runs

- **Trigger:** Automatic during PreSendRequest phase
- **Target:** Ledger transactions with duplicate lines
- **Purpose:** Optimize ledger by consolidating identical lines
- **Timing:** Before ledger transaction is processed

## How It Works

### Grouping Criteria
Lines are consolidated if they have identical:
- **Account, Analysis Set, Branch, Department, Sector**
- **Entity Dimension, Subsidiary, Reference Fields**
- **Narration, Currency, Exchange Rate**

### Consolidation Process
1. **Groups lines** by identical characteristics
2. **Calculates net amounts** (total debits - total credits)
3. **Keeps first line** from each group with net amount
4. **Removes duplicate lines** and sorts remaining lines

### Example
**Before:** Account 1001-Cash has 3 lines: Debit $100, Debit $50, Credit $30  
**After:** Account 1001-Cash has 1 line: Debit $120 (net amount)

## Configuration

Controlled by `shortenLedger` setting in:
- **Document Term Info** - Applies to all documents using this term
- **Book Info** - Applies to all documents in this book

## Exclusions

Does not apply to:
- **Currency Difference Journals** (`CurrencyDiffJournal`)
- **Exchange Rate Updates** (`ExchangeRateUpdate`)

## Important Warnings

### ⚠️ Data Impact
- **Audit Trail Loss:** Individual line details are permanently lost
- **Irreversible:** Original line amounts cannot be recovered
- **Automatic Execution:** Cannot be manually controlled per transaction

### ⚠️ Reporting Impact
- Reports expecting detailed breakdown will show consolidated amounts
- Fewer lines improve performance but reduce detail visibility

## Related Actions

- **EASortLedger** - Sorts consolidated lines
- **EAClearLedgerLines** - Clears lines before shortening
- **EAGenJournalEntry** - Generates lines that may be shortened

**Module:** accounting

**Full Class Name:** `com.namasoft.modules.accounting.domain.utils.actions.EAShortenLedger`

</div>

