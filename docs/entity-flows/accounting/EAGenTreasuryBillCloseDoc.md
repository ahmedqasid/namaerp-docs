---
title: EAGenTreasuryBillCloseDoc
module: accounting
---

<div class='entity-flows'>

# EAGenTreasuryBillCloseDoc

**This document was generated using Claude.ai**

## Overview

Automatically generates Treasury Bill Close Documents for treasury bills that have reached their due date and are still in "Running" status. Processes expired bills in batches to create proper closing documentation.

## When This Action Runs

- **Trigger:** Manual execution or scheduled batch processing
- **Target:** TreasuryBill entities with due date <= today
- **Purpose:** Create close documents for expired treasury bills
- **Timing:** Daily processing for bills reaching due dates

## How It Works

### Bill Selection Criteria
- **Due Date:** Due date <= today's date
- **Status:** "Running" status only (not "Closed")
- **State:** Previously committed entities only
- **Limit:** Maximum 500 bills per execution

### Document Generation Process
- **Creates:** New TreasuryBillCloseDoc records
- **Links:** References to original treasury bills
- **Copies:** Key financial data (bank account, ROI rate, current value)
- **Dimensions:** Transfers all dimension fields automatically

## SQL Queries for Troubleshooting

### Find Bills Ready for Closing
```sql
SELECT tb.id, tb.code, tb.dueDate, tb.status, tb.currentValue
FROM TreasuryBill tb
WHERE tb.dueDate <= GETDATE()
    AND tb.status != 'Closed'
    AND tb.commitedBefore = 1
ORDER BY tb.dueDate ASC;
```

### Check Recent Close Documents
```sql
SELECT tbc.id, tbc.code, tb.code AS originalBill
FROM TreasuryBillCloseDoc tbc
    INNER JOIN TreasuryBill tb ON tbc.treasuryBill_id = tb.id
WHERE tbc.creationDate >= DATEADD(day, -1, GETDATE());
```

### Find Overdue Bills Not Closed
```sql
SELECT tb.id, tb.code, DATEDIFF(day, tb.dueDate, GETDATE()) AS daysOverdue
FROM TreasuryBill tb
WHERE tb.dueDate < GETDATE()
    AND tb.status = 'Running'
    AND NOT EXISTS (SELECT 1 FROM TreasuryBillCloseDoc tbc WHERE tbc.treasuryBill_id = tb.id);
```

## Important Warnings

### ⚠️ Processing Limitations
- **Batch Limit:** Maximum 500 records per execution
- **Date Dependency:** Uses current system date for due date comparison
- **Status Dependency:** Only processes "Running" status bills

### ⚠️ Data and Business Impact
- **Accounting Effects:** May generate accounting transactions
- **Data Integrity:** Errors in source bills copied to close documents
- **Batch Failure:** Individual failures may affect entire batch processing

**Module:** accounting

**Full Class Name:** `com.namasoft.modules.accounting.domain.utils.actions.EAGenTreasuryBillCloseDoc`

</div>

