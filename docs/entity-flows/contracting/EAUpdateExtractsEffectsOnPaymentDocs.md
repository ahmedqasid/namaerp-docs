---
title: EAUpdateExtractsEffectsOnPaymentDocs
module: contracting
---

<div class='entity-flows'>

# EAUpdateExtractsEffectsOnPaymentDocs

**This document was generated using Claude.ai**

**Description:** Updates payment transaction entries when contracting extract documents are saved or modified

**Module:** contracting

**Full Class Name:** `com.namasoft.modules.contracting.domain.utils.EAUpdateExtractsEffectsOnPaymentDocs`

## Overview

This entity action automatically executes when any contracting extract document is saved. It synchronizes payment transaction records to reflect changes in extract conditions and ensures payment amounts are correctly calculated across all related payment documents.

## What This Action Does

When a contracting extract is saved, this action performs the following operations:

1. **Creates Transaction Entries**: Generates `ContPaymentTransactionEntry` records for each extract condition line that references a payment document
2. **Updates Payment Calculations**: Recalculates paid amounts and remaining balances for all affected payment documents
3. **Validates Payment Limits**: Ensures no payment term exceeds its due amount (prevents negative remaining values)
4. **Database Synchronization**: Removes old transaction entries and saves new ones to maintain data consistency

## Key Database Tables Affected

### ContPaymentTransactionEntry
- **Purpose**: Links extract conditions to payment documents
- **Key Fields**:
  - `paymentDoc`: Reference to the payment document
  - `extractDoc`: Reference to the extract document
  - `conditionValueAfterTax`: The extract condition amount after tax
  - `termCode`: Payment term code for grouping related conditions

### ContractingPaymentRootEntry  
- **Purpose**: Stores calculated totals for each payment term
- **Key Fields**:
  - `paymentDoc`: Reference to the payment document
  - `termCode`: Payment term code
  - `dueValue`: Total amount due for this term
  - `paidValue`: Total amount paid through extracts
  - `remainingValue`: Calculated remaining balance

## Business Logic Flow

### Step 1: Transaction Entry Creation
For each condition line in the extract that references a payment document:
```sql
-- New transaction entries are created linking extract to payment
INSERT INTO ContPaymentTransactionEntry (
    extractDocId, 
    paymentDocId, 
    conditionValueAfterTax, 
    termCode
) 
VALUES (
    @extractId, 
    @paymentDocId, 
    @conditionAmount, 
    @termCode
)
```

### Step 2: Payment Calculation Update
For each affected payment document:
```sql
-- Calculate total paid amount per term from all extracts
SELECT 
    cpt.paymentDocId,
    cpt.termCode,
    SUM(cpt.conditionValueAfterTax) AS totalPaid
FROM ContPaymentTransactionEntry cpt
WHERE cpt.paymentDocId = @paymentDocId
GROUP BY cpt.paymentDocId, cpt.termCode
```

### Step 3: Remaining Balance Validation
The system validates that remaining amounts don't go negative:
```sql
-- Check for negative remaining values
SELECT 
    cpr.termCode,
    cpr.dueValue,
    cpr.paidValue,
    (cpr.dueValue - cpr.paidValue) AS remaining
FROM ContractingPaymentRootEntry cpr
WHERE cpr.paymentDocId = @paymentDocId
  AND (cpr.dueValue - cpr.paidValue) < 0
```

## When This Action Triggers

- **Extract Creation**: When a new extract document is saved
- **Extract Modification**: When existing extract conditions are changed
- **Extract Deletion**: When an extract is deleted (removes associated transaction entries)

## Important Validation Rules

### Payment Limit Validation
- **Rule**: No payment term can have a negative remaining balance
- **Exception**: Documents with `allowForNegativeRemaining=true` bypass this check
- **Error Message**: "Term Code {termCode} remaining value is {amount} is negative in document {document}"

### Final Extract Validation
- **Rule**: Final extracts must not leave any remaining balances on payment documents
- **Error Message**: "The payment {payment} for the contract {contract} still has a remaining {amount}"

### Term Code Modification Restrictions
- **Rule**: Cannot modify or remove term codes that have existing transactions
- **Error Message**: "Document {document} you can not change or remove term code {termCode} because it has {count} transactions"

## Field Assignment Details

When creating transaction entries, the system copies data from extract condition lines:
- `extractDoc` = current extract document
- `paymentDoc` = condition line's referenced payment document  
- `conditionValueAfterTax` = condition line's calculated amount after tax
- `termCode` = condition line's term code

## Performance Considerations

- This action processes all payment documents referenced in the extract conditions
- For extracts with many condition lines, processing time increases proportionally
- Database transactions are flushed after each major operation to maintain consistency
- Calculations are performed in memory before database updates for efficiency

## Related Entity Actions

- **Payment Document Actions**: Update payment totals when individual payments are modified
- **Extract Deletion Actions**: Clean up transaction entries when extracts are removed
- **Contract Finalization**: Validates all payment obligations are met before contract completion

</div>

