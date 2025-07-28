---
title: EAAutoExtendExpiredRentContracts
module: realestate
---


<div class='entity-flows'>

# EAAutoExtendExpiredRentContracts

**This document was generated using Claude.ai**

## Overview

Automatically creates new rent contracts by extending expired contracts. Finds committed, non-cancelled rent contracts that have expired (based on configurable days past expiration) and generates new contracts with updated date ranges, maintaining most original terms and conditions.

## When This Action Runs

Manual execution or scheduled batch processing for contract renewals. Typically used for periodic contract extension processing, handling multiple expired contracts simultaneously to ensure continuity of rental agreements.

## How It Works

1. **Identifies expired contracts** - Uses SQL query to find committed, non-cancelled contracts past their expiration date
2. **Processes each contract** - Iterates through found contracts in separate transactions
3. **Duplicates contract data** - Creates a copy of the original contract maintaining most settings
4. **Updates date ranges** - Calculates new from/to dates based on the original contract period
5. **Adjusts payment schedules** - Updates due dates for payment lines based on the new contract period
6. **Filters expenses** - Removes expenses marked as "do not copy with extension"
7. **Resets payment status** - Marks all payments as unpaid with zero paid amounts
8. **Commits new contract** - Saves the extended contract with auto-cancel flag for previous contract

## Parameters

**Parameter 1:** Generated Contract Book Code or ID (Required) - Book for the new extended contracts
**Parameter 2:** Generated Contract Term Code or ID (Required) - Payment term for the new extended contracts  
**Parameter 3:** Extend Contracts That Have At Least N Days Remaining (Optional) - Minimum days past expiration (default: 0)
**Parameter 4:** Manual Query (Optional) - Custom SQL to specify which contracts to extend

## Default Query Logic

```sql
select entityType,id from RERentContract where commitedBefore = 1 and cancelled = 0 and DATEDIFF(day,toDate,GETDATE())>=0
union all
select entityType,id from REOpeningRentContract where commitedBefore = 1 and cancelled = 0 and DATEDIFF(day,toDate,GETDATE())>=0
```

## Database Tables Affected

- **RERentContract** - Creates new extended rent contracts
- **REOpeningRentContract** - Source for opening contracts to extend
- **REPaymentLine** - Updates payment schedules with new due dates
- **RERentContractExpensesLine** - Copies applicable expenses to new contracts
- **Contract Books/Terms** - References for new contract assignment

## Important Warnings

### ⚠️ Transaction Processing
- Each contract processed in separate transaction
- Failure in one contract doesn't affect others
- Failed transactions throw exceptions and accumulate errors

### ⚠️ Auto-Cancel Previous Contract
- New contracts set autoCancelPreviousContract flag to true
- Previous contracts may be automatically cancelled when new ones are committed
- Ensure this behavior aligns with business requirements

### ⚠️ Date Calculation Logic
- New contract starts the day after previous contract ends
- Contract period (months/years) determines new end date
- Time zone and calendar calculations may affect exact dates

### ⚠️ Payment Schedule Updates
- All payment due dates shifted by the contract period
- Payment amounts remain the same but schedules change
- May affect customer payment expectations and cash flow

### ⚠️ Expense Filtering
- Expenses marked "do not copy with extension" are excluded
- Expense types with "no installment if from previous" may be filtered
- Review expense configuration before mass processing

### ⚠️ Payment Status Reset
- All payment lines marked as unpaid with zero paid amounts
- Previous payment history not transferred to new contracts
- May create confusion in accounting and collections

### ⚠️ Contract Code Generation
- New contracts get empty codes initially
- System generates new codes based on book configuration
- Ensure book numbering sequences can handle batch generation

### ⚠️ Fiscal Period Assignment
- System attempts to guess appropriate fiscal period
- May fail if fiscal periods not properly configured
- Verify fiscal year setup before processing

### ⚠️ Query Flexibility vs. Risk
- Custom query parameter allows flexible contract selection
- Incorrect queries may extend wrong contracts or cause errors
- Test custom queries thoroughly before production use

### ⚠️ Parameter Validation
- Parameters 1 and 2 (book and term) are required
- Period parameter must be integer if provided
- Cannot specify both period and custom query simultaneously

### ⚠️ Contract Type Conversion
- Handles both RERentContract and REOpeningRentContract types
- Opening contracts converted to regular rent contracts via DTO conversion
- Complex conversion logic may fail with data inconsistencies

### ⚠️ Business Logic Dependencies
- Relies on proper contract status management (committed, cancelled flags)
- Depends on expense type configuration for copying rules
- Contract duplication may not handle all custom fields

### ⚠️ Performance Considerations
- Processes contracts sequentially, not in parallel
- Large numbers of expired contracts may take significant time
- Database locks during transaction processing

### ⚠️ Error Handling and Recovery
- Failed contract extensions accumulate errors but continue processing
- No automatic rollback of successfully processed contracts
- Manual intervention needed for failed contract extensions

### ⚠️ Data Integrity
- Manual coding flags and installment codes may be reset
- Original contract relationships and references maintained
- Verify data consistency after bulk processing

**Module:** realestate

**Full Class Name:** `com.namasoft.modules.realstate.domain.utils.plugnplay.EAAutoExtendExpiredRentContracts`


</div>

