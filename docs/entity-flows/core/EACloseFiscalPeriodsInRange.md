---
title: EACloseFiscalPeriodsInRange
module: core
---

<div class='entity-flows'>

# EACloseFiscalPeriodsInRange

**This document was generated using Claude.ai**

## Overview

Automatically closes fiscal periods that have passed their end dates. Changes status from Open/Locked to "Closed" based on date range calculation.

## When This Action Runs

- **Trigger:** Manual execution or scheduled automation
- **Target:** System-wide fiscal period management  
- **Purpose:** Close periods past their end dates
- **Timing:** On-demand or scheduled for period-end processing

## How It Works

1. **Calculates target date** using today's date + parameter days offset
2. **Finds eligible periods** where `endDate ≤ target date` and status is NOT "Closed"
3. **Groups by fiscal year** for transactional processing
4. **Updates period status** to "Closed" in fiscal year details

## Parameters

### Parameter 1: Days From Today
- **Type:** Integer (defaults to 0 if empty)
- **Examples:**
  - `0` - Close periods ending today or earlier
  - `-30` - Close periods ending 30 days ago or earlier
  - `7` - Close periods ending up to 7 days in the future

## Database Tables Affected

### FiscalPeriod
- **endDate** - Compared against target date
- **periodStatus** - Must not be "Closed" to be eligible

### FiscalYear
- Contains collection of fiscal year periods
- Updated transactionally for data integrity

### FiscalYearPeriod
- **periodStatus** - Updated to "Closed"

## SQL Query Example

```sql
SELECT fp.id, fp.code, fp.endDate, fp.periodStatus, fy.code AS FiscalYear
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

## Important Warnings

### ⚠️ Critical Impact
- **Irreversible Action:** Closing periods typically cannot be undone
- **Transaction Restrictions:** All pending transactions in affected periods may be rejected
- **User Notification:** Users working on period-end entries should be notified

### ⚠️ Processing Considerations
- **Batch Processing:** Processes multiple years and periods in single execution
- **Data Validation:** Verify fiscal year setup is complete before closing
- **Timing:** Consider execution during off-hours to minimize user impact

## Related Actions

- **EAOpenFiscalPeriodsInRange** - Opens fiscal periods in specified date range

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EACloseFiscalPeriodsInRange`

</div>

