---
title: EAShortenLedger
module: accounting
---

<div class='entity-flows'>

# EAShortenLedger

**This document was generated using Claude.ai**

**Description:** Consolidates duplicate ledger transaction lines by combining multiple lines with identical characteristics into single lines with the net debit/credit amounts.

**Module:** accounting

**Full Class Name:** `com.namasoft.modules.accounting.domain.utils.actions.EAShortenLedger`

**ℹ️ Note:** This action is an automatic action that runs during the PreSendRequest phase of document processing.

## Purpose

The EAShortenLedger action optimizes ledger transactions by consolidating multiple journal lines that have identical characteristics. Instead of having multiple separate lines for the same account with the same dimensions and references, the system combines them into a single line showing the net effect.

## When It Runs

This action executes automatically during the **PreSendRequest** phase, which occurs just before a business document (like an invoice, payment, or journal entry) sends its accounting effects to the ledger. The action only runs if the current business request involves ledger transactions.

## How Line Consolidation Works

The system groups ledger lines based on a unique identifier created from these fields:

### Grouping Criteria
Lines are considered identical and eligible for consolidation if they have the same:

- **Account** - The chart of accounts entry
- **Analysis Set** - Cost center grouping (if used)
- **Branch** - Operating branch (if used)
- **Department** - Department assignment (if used)
- **Sector** - Business sector (if used)
- **Entity Dimension** - Additional dimensional reference (if used)
- **Subsidiary** - Subsidiary account reference (if used)
- **Reference Fields** (Ref1, Ref2, Ref3) - Additional reference links (if used)
- **Narration** - Transaction description text (if used)
- **Narration2** - Secondary description text (if used)
- **Currency** - Transaction currency
- **Exchange Rate** - Currency conversion rate (if applicable)

### Consolidation Process

1. **Line Grouping**: All ledger lines are analyzed and grouped by their unique identifier
2. **Total Calculation**: For each group with multiple lines:
   - Calculate total debit amounts across all lines in the group
   - Calculate total credit amounts across all lines in the group
3. **Net Amount Determination**: Calculate the net difference (total debits - total credits)
4. **Line Replacement**: 
   - Keep only the first line from each group
   - Set the net amount on the appropriate side (debit if net positive, credit if net negative)
   - Set the opposite side to zero
   - Remove all other lines from the group
5. **Cleanup**: Remove any resulting empty lines and sort the remaining lines

### Example Scenario

**Before Shortening:**
```
Account: 1001-Cash
- Line 1: Debit $100
- Line 2: Debit $50  
- Line 3: Credit $30

Account: 2001-Accounts Payable
- Line 4: Credit $120
```

**After Shortening:**
```
Account: 1001-Cash
- Line 1: Debit $120 (net of $100 + $50 - $30)

Account: 2001-Accounts Payable  
- Line 4: Credit $120 (unchanged - only one line)
```

## Exclusions

The shortening process **does not apply** to transactions originating from:
- **Currency Difference Journals** (`CurrencyDiffJournal`)
- **Exchange Rate Updates** (`ExchangeRateUpdate`)

These transaction types maintain their original line structure to preserve audit trails for currency adjustments.

## Configuration Control

The EAShortenLedger action can be controlled through two configuration settings:

### Document Term Configuration
- **Field**: `shortenLedger` in Document Term Info
- **Effect**: When enabled, applies shortening to all documents using this term

### Book Configuration  
- **Field**: `shortenLedger` in Book Info
- **Effect**: When enabled, applies shortening to all documents in this book

If either the document's term or book has shortening enabled, the action will execute.

## Database Impact

This optimization reduces the number of journal entry lines stored in the database, which:
- **Improves Performance**: Fewer lines to process and query
- **Reduces Storage**: Less database space required
- **Simplifies Reporting**: Cleaner, more readable ledger reports
- **Maintains Accuracy**: Net amounts remain mathematically correct

## ⚠️ Important Considerations

- **Audit Trail**: Individual line details are lost after consolidation - only net amounts remain
- **Reporting Impact**: Reports expecting detailed line-by-line breakdown may show consolidated amounts
- **Irreversible**: Once shortened, the original individual line amounts cannot be recovered
- **Automatic Execution**: Cannot be manually controlled on individual transactions - governed by term/book settings only

## Related Actions

- **EASortLedger**: Often runs in conjunction to sort the consolidated lines
- **EAClearLedgerLines**: May clear lines before shortening in certain scenarios

</div>

