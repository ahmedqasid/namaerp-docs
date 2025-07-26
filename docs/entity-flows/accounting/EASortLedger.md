---
title: EASortLedger
module: accounting
---

<div class='entity-flows'>

# EASortLedger

**This document was generated using Claude.ai**

**Description:** Sort the ledger transaction lines

**Module:** accounting

**Full Class Name:** `com.namasoft.modules.accounting.domain.utils.actions.EASortLedger`

**ℹ️ Note:** This action is an automatic action, it selects the appropriate events to execute itself

## Overview

The EASortLedger action is an automatic system function that organizes ledger transaction lines in a specific order before they are sent to the accounting system. This sorting ensures that debit and credit entries are arranged in a logical sequence that follows accounting best practices.

## When This Action Runs

- **Trigger:** Automatically executes during the `PreSendRequest` event
- **Applies to:** Any entity that generates ledger transactions (LedgerTransReq)
- **Frequency:** Every time a document with accounting effects is processed
- **Cannot be disabled:** This action runs automatically and cannot be manually controlled

## What It Does

The action performs the following steps:

1. **Identifies the transaction request:** Checks if the current document has a pending LedgerTransReq (ledger transaction request)
2. **Sorts the transaction lines:** Arranges the ledger lines using a specific sorting algorithm
3. **Maintains data integrity:** Ensures all accounting information remains accurate during the sorting process

## Sorting Logic

The sorting algorithm works as follows:

### Primary Sorting Rule
Transaction lines are sorted based on their **net amount** (Credit - Debit):

- **Negative amounts first:** Lines where debit > credit appear at the beginning
- **Positive amounts last:** Lines where credit > debit appear at the end
- **Same-sign grouping:** All negative amounts are grouped together, all positive amounts are grouped together

### Detailed Sorting Behavior
```
Net Amount = Credit Local Amount - Debit Local Amount

If both lines have positive net amounts → Order doesn't change (0)
If both lines have negative net amounts → Order doesn't change (0)
If line1 is negative and line2 is positive → line1 comes first (-1)
If line1 is positive and line2 is negative → line2 comes first (1)
```

## Database Impact

### Tables Affected
- **LedgerTrans:** Final ledger transactions (after processing)
- **LedgerTransLine:** Individual ledger transaction lines (after processing)

### Fields Used in Sorting
- `credit_local_amount` - Local currency credit amount
- `debit_local_amount` - Local currency debit amount

## Important Notes

⚠️ **Warning:** This action only sorts the lines in memory before they are processed. The actual database records are not directly modified by this action.

⚠️ **Automatic Execution:** This action cannot be manually triggered or disabled through the UI. It runs automatically as part of the accounting workflow.

⚠️ **Order Dependency:** Some accounting reports and processes may depend on this specific sorting order. Modifying this behavior could affect financial reporting.

## Technical Details

### Method Called
The sorting is performed by calling `AccSideUtils.sortLines()` method, which contains the core sorting algorithm.

### Performance Considerations
- Sorting is performed in memory using Java's efficient sorting algorithms
- Performance impact is minimal for typical transaction volumes
- Large transaction sets (1000+ lines) may experience slight processing delays


## Related Actions
- Other accounting effect actions that run before EASortLedger
- Validation actions that run after sorting
- Currency conversion actions that affect the amounts used for sorting

</div>

