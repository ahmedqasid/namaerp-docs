---
title: EACloseFiscalPeriodsInRange
module: core
---


<div class='entity-flows'>

# EACloseFiscalPeriodsInRange

**This document was generated using Claude.ai**

## Overview

This entity flow automatically closes fiscal periods that have passed their end dates. It changes the status of eligible fiscal periods from any non-closed status (Open, Locked, etc.) to "Closed" status based on a date range calculation.

## When This Action Runs

- **Trigger:** Manual execution or scheduled automation
- **Target:** System-wide fiscal period management
- **Scope:** Processes multiple fiscal periods and years in a single operation
- **Safety:** Only affects periods that are not already closed

## How It Works

### 1. Date Calculation
- **Base Date:** Today's date
- **Parameter:** Days offset (can be positive or negative)
- **Target Date:** Today + parameter days
- **Range:** Closes all periods with `endDate ≤ target date`

### 2. Period Selection Criteria
The action finds fiscal periods where:
- `endDate` is less than or equal to the calculated target date
- `periodStatus` is NOT "Closed" (affects Open, Locked, or other statuses)

### 3. Batch Processing
- **Groups by Fiscal Year:** Processes periods by their parent fiscal year
- **Transactional:** Updates are committed per fiscal year for data integrity
- **Status Update:** Changes period status to "Closed" in fiscal year details

## Parameters

### Parameter 1: Days From Today
- **Type:** Integer
- **Required:** No (defaults to 0 if empty)
- **Format:** Whole number (positive, negative, or zero)

**Examples:**
- `0` - Close periods ending today or earlier
- `-30` - Close periods ending 30 days ago or earlier  
- `7` - Close periods ending up to 7 days in the future
- `-90` - Close periods ending 90 days ago or earlier

## Database Tables Affected

### Primary Tables
- **FiscalPeriod:** Individual period records
  - `endDate`: Compared against target date
  - `periodStatus`: Must not be "Closed" to be eligible

- **FiscalYear:** Parent year containers
  - Contains collection of fiscal year periods
  - Updated transactionally to maintain data integrity

- **FiscalYearPeriod:** Detail lines within fiscal years
  - `periodStatus`: Updated to "Closed"
  - Links to generated fiscal period entities

## SQL Query for Monitoring

To see which fiscal periods would be affected:

```sql
SELECT 
    fp.id,
    fp.code,
    fp.endDate,
    fp.periodStatus,
    fy.code AS FiscalYearCode
FROM FiscalPeriod fp
INNER JOIN FiscalYear fy ON fp.year_id = fy.id
WHERE fp.endDate <= DATEADD(day, 0, GETDATE())
    AND fp.periodStatus != 'Closed';
```

## Business Impact

### Financial Controls
- **Period Locking:** Prevents further transactions in closed periods
- **Audit Compliance:** Maintains proper period-end controls
- **Data Integrity:** Ensures historical periods remain unchanged

### Operational Effects
- **Transaction Restrictions:** No new entries allowed in closed periods
- **Reporting Accuracy:** Finalizes period-end financial reports
- **Year-End Processing:** Enables fiscal year closure procedures

## Important Warnings

### ⚠️ Irreversible Action
- Closing periods is typically irreversible in most accounting systems
- Requires careful consideration before execution
- May require special procedures to reopen if needed

### ⚠️ Transaction Impact
- All pending transactions in affected periods may be rejected
- Users working on period-end entries should be notified
- Consider timing execution during off-hours

### ⚠️ Batch Processing
- Processes multiple years and periods in single execution
- Large date ranges may affect many periods simultaneously
- Monitor system performance during execution

### ⚠️ Data Validation
- Verify fiscal year setup is complete before closing
- Ensure all required period-end procedures are completed
- Confirm all transactions are properly posted

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EACloseFiscalPeriodsInRange`

**Related Actions:**
- [EAOpenFiscalPeriodsInRange](EAOpenFiscalPeriodsInRange.md)


</div>

