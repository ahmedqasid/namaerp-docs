---
title: EAClearLedgerLines
module: accounting
---

<div class='entity-flows'>

# EAClearLedgerLines

**This document was generated using Claude.ai**

**Description:** Removes all ledger transaction lines from accounting requests

**Module:** accounting

**Full Class Name:** `com.namasoft.modules.accounting.domain.utils.actions.EAClearLedgerLines`

**ℹ️ Note:** This action is an automatic action, it selects the appropriate events to execute itself

## Overview

The `EAClearLedgerLines` action is a system utility that automatically clears (removes) all accounting transaction lines from ledger transaction requests before they are processed. This action is part of the accounting workflow and runs automatically during the "Pre Send Request" phase.

## When This Action Runs

- **Trigger Event:** Pre Send Request (PreSendRequest)
- **Execution:** Automatic - no manual intervention required
- **Timing:** Before the accounting request is sent for processing

## What It Does

This action performs the following operations on ledger transaction requests:

1. **Clears Transaction Lines**: Removes all accounting entries from the `lines` collection
2. **Clears Debt Lines**: Removes all debt-related entries from the `debts` collection
3. **Safe Operation**: Only operates on valid ledger transaction requests (LedgerTransReq objects)

## Technical Details

### Database Impact
- **Tables Affected**: None directly (works on in-memory objects before database persistence)
- **Data Loss**: Yes - permanently removes all transaction lines from the request
- **Rollback**: Not applicable (action occurs before database operations)

### Business Logic
```
IF request type is "Pre Send Request" THEN
    IF current request is a LedgerTransReq THEN
        Clear all entries from lines collection
        Clear all entries from debts collection
    END IF
END IF
```

## Use Cases

This action is typically used in scenarios where:

1. **Request Cleanup**: Clearing previous transaction attempts before generating new ones
2. **Data Reset**: Starting fresh when recalculating accounting effects
3. **Error Recovery**: Removing corrupted or invalid transaction lines

## ⚠️ Important Warnings

### Data Loss Warning
- **PERMANENT REMOVAL**: This action permanently removes ALL transaction lines from the request
- **NO UNDO**: Once cleared, the original transaction data cannot be recovered
- **AUTOMATIC EXECUTION**: Runs automatically without user confirmation

### Impact on Business Processes
- **Accounting Effects**: All previously generated accounting entries will be lost
- **Audit Trail**: Transaction history before this action may be incomplete
- **Reporting**: Financial reports may show gaps if this action removes necessary data

### When Problems Occur
If you notice missing accounting transactions or incomplete financial data, this action might have cleared necessary transaction lines. Check:

1. **System Logs**: Look for entity flow execution logs
2. **Request History**: Verify if the clearing was intentional
3. **Data Recovery**: May require regenerating the cleared transactions

## Related Actions

- **EAReverseLedgerTrans**: Reverses existing ledger transactions
- **EASortLedger**: Sorts ledger transaction lines
- **EAShortenLedger**: Consolidates ledger transaction lines

</div>

