---
title: EAGenTreasuryBillCloseDoc
module: accounting
---

<div class='entity-flows'>

# EAGenTreasuryBillCloseDoc - Treasury Bill Auto-Close Process

**This document was generated using Claude.ai**

**Description:** Automatically generates Treasury Bill Close Documents for all treasury bills that have reached their due date and are still in "Running" status.

**Module:** accounting

**Full Class Name:** `com.namasoft.modules.accounting.domain.utils.actions.EAGenTreasuryBillCloseDoc`

## Overview

This entity action is designed to automatically close expired treasury bills by creating corresponding Treasury Bill Close Documents. It runs as a batch process to handle multiple treasury bills at once.

### What It Does

The system automatically:
1. **Finds expired treasury bills** - Searches for all treasury bills where the due date has passed
2. **Filters active bills** - Only processes bills that are still in "Running" status (not already closed)
3. **Creates close documents** - Generates a Treasury Bill Close Document for each eligible bill
4. **Copies data** - Transfers key information from the original treasury bill to the close document
5. **Commits changes** - Saves all the new close documents to the database

## Technical Details

### Processing Criteria

The system searches for treasury bills that meet ALL of these conditions:

- **Due Date**: The due date (`dueDate`) is less than or equal to today's date
- **Status**: The status field is NOT equal to "Closed" (only processes "Running" bills)
- **Committed**: Only processes bills that have been properly committed to the database

### Data Flow

#### Source Entity: Treasury Bill (إذن خزانة)
- **Table**: `TreasuryBill`
- **Type**: Master File
- **Key Fields Used**:
  - `dueDate` (Date) - Due Date (تاريخ الاستحقاق)
  - `status` (Enum) - Status (الحالة) - Values: "Running", "Closed"
  - `bankAccount` (Reference) - Bank Account (رقم حساب البنك)
  - `roiRate` (Decimal) - Return Of Investment Rate (معدل العائد)
  - `currentValue` (Decimal) - Current Value (القيمة الحالية)

#### Target Entity: Treasury Bill Close Document (إقفال إذن خزانة)
- **Table**: `TreasuryBillCloseDoc`
- **Type**: Document File
- **Key Fields Created**:
  - `treasuryBill` (Reference) - Links back to original Treasury Bill
  - `bankAccount` (Reference) - Copied from source
  - `roiRate` (Decimal) - Copied from source
  - `currentValue` (Decimal) - Copied from source
  - All dimension fields (analysis sets, branches, departments, etc.)

### Processing Limits

- **Batch Size**: Maximum 500 treasury bills processed per execution
- **Performance**: Uses optimized database queries to minimize system impact

## SQL Queries for Investigation

### Find Treasury Bills Ready for Closing
```sql
SELECT 
    tb.id,
    tb.code,
    tb.dueDate,
    tb.status,
    tb.currentValue,
    tb.roiRate,
    ba.name AS bankAccountName
FROM TreasuryBill tb
    LEFT JOIN BankAccount ba ON tb.bankAccount_id = ba.id
WHERE tb.dueDate <= GETDATE()
    AND tb.status != 'Closed'
    AND tb.commitedBefore = 1
ORDER BY tb.dueDate ASC;
```

### Check Recently Created Close Documents
```sql
SELECT 
    tbc.id,
    tbc.code,
    tbc.creationDate,
    tb.code AS originalTreasuryBillCode,
    tbc.currentValue,
    tbc.roiRate
FROM TreasuryBillCloseDoc tbc
    INNER JOIN TreasuryBill tb ON tbc.treasuryBill_id = tb.id
WHERE tbc.creationDate >= DATEADD(day, -1, GETDATE())
ORDER BY tbc.creationDate DESC;
```

### Find Treasury Bills That Should Be Closed But Haven't Been
```sql
SELECT 
    tb.id,
    tb.code,
    tb.dueDate,
    tb.status,
    DATEDIFF(day, tb.dueDate, GETDATE()) AS daysOverdue
FROM TreasuryBill tb
WHERE tb.dueDate < GETDATE()
    AND tb.status = 'Running'
    AND tb.commitedBefore = 1
    AND NOT EXISTS (
        SELECT 1 
        FROM TreasuryBillCloseDoc tbc 
        WHERE tbc.treasuryBill_id = tb.id
    )
ORDER BY tb.dueDate ASC;
```

## Troubleshooting Guide

### Common Issues

#### 1. Treasury Bills Not Being Closed Automatically

**Symptoms:**
- Treasury bills past due date still showing as "Running"
- No Treasury Bill Close Documents being created

**Possible Causes:**
- Entity action not scheduled to run
- Treasury bills not properly committed (`commitedBefore = 0`)
- System date issues
- Database permission problems

**Investigation Steps:**
1. Check if treasury bills meet the criteria using the SQL query above
2. Verify the entity action is scheduled and running
3. Check system logs for any error messages
4. Verify database permissions for creating TreasuryBillCloseDoc records

#### 2. Partial Processing

**Symptoms:**
- Some treasury bills closed but others missed
- Processing stops unexpectedly

**Possible Causes:**
- Batch size limit (500 records) exceeded
- Individual treasury bill data issues
- Transaction rollback due to validation errors

**Investigation Steps:**
1. Check if more than 500 treasury bills are due for closing
2. Review error logs for specific treasury bill processing failures
3. Manually verify data integrity of unprocessed bills

#### 3. Duplicate Close Documents

**Symptoms:**
- Multiple close documents for the same treasury bill
- Data inconsistency in reporting

**Possible Causes:**
- Entity action running multiple times
- Manual intervention during processing
- System timing issues

**Investigation Steps:**
1. Check for duplicate records using treasury bill ID
2. Review execution logs for multiple runs
3. Verify treasury bill status updates are working correctly

### Field Information Access

To get detailed information about any field in the Treasury Bill or Treasury Bill Close Document:

1. **In the System UI**: Use `ALT+CTRL+I` while focused on any field to show field information
2. **Online Documentation**: Visit https://dm.namasoft.com for comprehensive entity documentation
3. **SQL Investigation**: Use the field information queries provided above

## Best Practices for Support Staff

### Monitoring
- Run the investigation queries daily to ensure proper processing
- Monitor for treasury bills that remain overdue
- Check for any error patterns in the system logs

### Manual Intervention
- If automatic processing fails, treasury bills can be manually closed
- Always verify the data before manual processing
- Ensure proper dimensions and accounting implications are considered

### Data Validation
- Verify bank account references are valid
- Check that ROI rates and current values are reasonable
- Ensure all required dimension fields are populated

## Warning Notes

⚠️ **Important Considerations:**

1. **Accounting Impact**: Creating Treasury Bill Close Documents may generate accounting transactions. Verify with accounting team before manual intervention.

2. **Batch Processing**: The 500-record limit means very large volumes may require multiple processing cycles.

3. **Data Integrity**: Always verify that the original treasury bill data is correct before processing, as errors will be copied to the close document.

4. **Timing Sensitivity**: Due date checking uses the current system date. Ensure server time is accurate.

5. **Rollback Risk**: If any individual treasury bill fails processing, it may affect the entire batch depending on transaction settings.

</div>

