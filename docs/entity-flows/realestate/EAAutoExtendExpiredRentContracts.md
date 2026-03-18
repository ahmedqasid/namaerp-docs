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

**Module:** realestate

**Full Class Name:** `com.namasoft.modules.realstate.domain.utils.plugnplay.EAAutoExtendExpiredRentContracts`


</div>