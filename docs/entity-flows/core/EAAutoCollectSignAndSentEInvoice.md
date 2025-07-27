---
title: EAAutoCollectSignAndSentEInvoice
module: core
---

<div class='entity-flows'>

# EAAutoCollectSignAndSentEInvoice

**This document was generated using Claude.ai**

## Overview

Automates the complete Saudi ZATCA e-Invoice submission process by collecting eligible invoices, creating submission documents, digitally signing them, and sending them to the tax authority. Handles high-volume electronic invoice submissions with proper batching.

## When This Action Runs

Scheduled task execution for automated e-Invoice processing on TaskSchedule entities configured for ZATCA compliance.

## How It Works

1. **Collects invoices** of specified entity type using query filtering
2. **Creates submission documents** (TaxAuthoritySubmissionDoc) for each batch
3. **Digitally signs** documents using taxpayer certificates
4. **Submits to ZATCA** and processes responses
5. **Handles asynchronously** with transaction isolation and error recovery

## Key Parameters

- **Parameter 1:** Submission Document Book (Required) - Document book code (e.g., `EINV_SUB`)
- **Parameter 2:** Tax Payer Configuration (Required) - TaxPayerConfiguration code (e.g., `MAIN_TAXPAYER`)
- **Parameter 3:** Entity Type (Required) - Type of documents to process (e.g., `SalesInvoice`)
- **Parameter 4:** Max Lines Per Submission Document (Optional) - Batch size (default: 500)
- **Parameter 5:** Collect When Query Matched (Optional) - SQL filter expression
- **Parameter 6:** Created Submission Extra Fields Map (Optional) - Additional field mappings

### SQL Filter Examples:
```sql
-- Amount threshold
SELECT CASE WHEN {money.total} > 1000 THEN 1 ELSE 0 END

-- Customer filter
SELECT CASE WHEN {customer.code} LIKE 'VIP%' THEN 1 ELSE 0 END
```

## Database Tables Affected

- **TaxAuthoritySubmissionDoc** - Created submission documents with batch references
- **TaxAuthoritySubmissionLine** - Links invoices to submission documents
- **TaskSchedule** - Source entity triggering the process
- **Invoice Entities** - Updated with submission status

## Important Warnings

### ⚠️ ZATCA Requirements
- Valid digital certificates required
- Stable internet connection to ZATCA systems
- Invoices must meet ZATCA format requirements

### ⚠️ Performance Impact
- High-volume processing affects system performance
- Large batches consume significant memory
- Multiple simultaneous executions may cause conflicts

### ⚠️ Configuration Dependencies
- TaxPayerConfiguration must be properly configured
- Submission document book must exist
- Collector queries must be syntactically correct

## Related Actions

- [EAAutoSendEInvoice](EAAutoSendEInvoice.md)
- [EAGenerateEntityFromEntityAction](EAGenerateEntityFromEntityAction.md)

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAAutoCollectSignAndSentEInvoice`

</div>

