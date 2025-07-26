---
title: EARVPVControlJournal
module: accounting
---

<div class='entity-flows'>

# EARVPVControlJournal

**This document was generated using Claude.ai**

**Description:** Entity action that creates control journal entries for Receipt and Payment Vouchers (RVPV) when they have a related subsidiary account

**Module:** accounting

**Full Class Name:** `com.namasoft.modules.accounting.utils.entityactions.EARVPVControlJournal`

## Overview

The EARVPVControlJournal is an accounting entity action that automatically generates control journal entries for Receipt and Payment Vouchers (RVPV documents). This action creates accounting entries that track subsidiary account movements by generating debit and credit entries based on the voucher's related subsidiary.

## What is RVPV?

RVPV stands for "Receipt and Payment Voucher" - these are core accounting documents used to record:
- **Receipt Vouchers (RV)**: Money received by the organization
- **Payment Vouchers (PV)**: Money paid out by the organization

## When This Action Runs

This entity action is triggered automatically when an RVPV document is being processed for accounting effects, specifically when:

1. The voucher has a `relatedSubsidiary` field filled
2. The voucher is being sent to generate a ledger transaction request
3. The system needs to create control journal entries for subsidiary tracking

## How It Works

### Input Parameters
The action expects two parameters that define the subsidiary account types:
- **Parameter 0**: Debit side subsidiary account type (as text)
- **Parameter 1**: Credit side subsidiary account type (as text)

### Processing Logic

1. **Safety Check**: If there's no related subsidiary or no ledger transaction request, the action does nothing and returns success

2. **Account Configuration**: Creates two accounting side configurations:
   - Debit side: Uses Customer dimension source with the debit subsidiary account type
   - Credit side: Uses Customer dimension source with the credit subsidiary account type

3. **Data Collection**: Gathers information from the voucher:
   - Document reference and metadata
   - Amount and currency information
   - Related subsidiary details
   - Narration from remarks field

4. **Journal Entry Creation**: Generates two accounting lines:
   - One debit line using the debit side configuration
   - One credit line using the credit side configuration

## Database Impact

The action creates entries in the accounting ledger system that will appear in:
- General ledger reports
- Subsidiary account balances
- Control journal reports

## Key Fields Used

From the RVPV Voucher entity, this action uses:
- `relatedSubsidiary`: The subsidiary account this voucher relates to
- `amount`: The monetary amount for the journal entries
- `remarks`: Used as narration in the journal entries
- `code`: Document code for reference
- `id`: Document ID for tracking

## Configuration Notes

### Subsidiary Account Types
The subsidiary account types passed as parameters typically include:
- **MainAccount**: Primary account for the subsidiary
- **ReceivableAccount**: For customer receivables
- **PayableAccount**: For vendor payables
- **Other specific account types** as configured in the system

### Customer-Specific Implementations

Some customers may have custom implementations (like `SWSRVPVControlJournals`) that extend this base functionality with additional business rules.

## Related Documentation

- For detailed entity field information, refer to https://dm.namasoft.com
- For subsidiary account configuration, see the Basic module documentation
- For ledger transaction details, refer to the Accounting module guide

## Warnings and Considerations

- **Data Consistency**: Ensure subsidiary account mappings are properly configured before processing vouchers
- **Performance**: Large volumes of RVPV documents will generate corresponding control journal entries
- **Audit Trail**: All control journal entries are tracked and can be traced back to the originating RVPV document
- **Currency Handling**: Multi-currency environments require proper exchange rate configuration

</div>

