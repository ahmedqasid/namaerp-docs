---
title: EAUpdateExtractsEffectsOnPaymentDocs
module: contracting
---

<div class='entity-flows'>

# EAUpdateExtractsEffectsOnPaymentDocs

**This document was generated using Claude.ai**

## Overview

Automatically synchronizes payment transaction records when contracting extract documents are saved. Ensures payment amounts are correctly calculated across all related payment documents.

## When This Action Runs

- **Trigger:** Automatic when extract documents are saved
- **Target:** Contracting extract documents with payment references
- **Purpose:** Synchronize payment calculations with extract conditions
- **Timing:** After extract document save/modification

## How It Works

1. **Creates transaction entries** linking extract conditions to payment documents
2. **Recalculates payment balances** for all affected payment documents
3. **Validates payment limits** to prevent negative remaining values
4. **Synchronizes database** by removing old entries and saving new ones

## Database Tables Affected

### ContPaymentTransactionEntry
- **Purpose:** Links extract conditions to payment documents
- **Key Fields:** `paymentDoc`, `extractDoc`, `conditionValueAfterTax`, `termCode`

### ContractingPaymentRootEntry
- **Purpose:** Stores calculated totals for each payment term
- **Key Fields:** `paymentDoc`, `termCode`, `dueValue`, `paidValue`, `remainingValue`

## Business Logic Flow

### Transaction Entry Creation
```sql
-- Links extract conditions to payment documents
INSERT INTO ContPaymentTransactionEntry (
    extractDocId, paymentDocId, conditionValueAfterTax, termCode
) VALUES (@extractId, @paymentDocId, @conditionAmount, @termCode)
```

### Payment Calculation Update
```sql
-- Calculate total paid amount per term from all extracts
SELECT cpt.paymentDocId, cpt.termCode, SUM(cpt.conditionValueAfterTax) AS totalPaid
FROM ContPaymentTransactionEntry cpt
WHERE cpt.paymentDocId = @paymentDocId
GROUP BY cpt.paymentDocId, cpt.termCode
```

## Validation Rules

### Payment Limit Validation
- **Rule:** No payment term can have negative remaining balance
- **Exception:** Documents with `allowForNegativeRemaining=true` bypass check
- **Error:** "Term Code {termCode} remaining value is {amount} is negative"

### Final Extract Validation
- **Rule:** Final extracts must not leave remaining balances
- **Error:** "The payment {payment} for contract {contract} still has remaining {amount}"

### Term Code Restrictions
- **Rule:** Cannot modify term codes with existing transactions
- **Error:** "Cannot change or remove term code {termCode} because it has {count} transactions"

## Important Warnings

### ⚠️ Validation Requirements
- **Payment Limits:** Enforces no negative remaining balances (unless explicitly allowed)
- **Term Code Integrity:** Prevents modification of term codes with active transactions
- **Final Extract Completeness:** Ensures all payments are fully processed

### ⚠️ Performance Impact
- **Extract Size:** Processing time increases with number of condition lines
- **Database Operations:** Multiple table updates require transaction consistency
- **Memory Usage:** Calculations performed in memory before database updates

## Related Actions

- **Payment Document Processing** - Updates individual payment totals
- **Extract Deletion Cleanup** - Removes transaction entries when extracts deleted
- **Contract Finalization** - Validates payment obligations completion

**Module:** contracting

**Full Class Name:** `com.namasoft.modules.contracting.domain.utils.EAUpdateExtractsEffectsOnPaymentDocs`

</div>

