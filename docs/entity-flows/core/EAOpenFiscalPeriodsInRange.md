---
title: EAOpenFiscalPeriodsInRange
module: core
---


<div class='entity-flows'>

# EAOpenFiscalPeriodsInRange

**This document was generated using Claude.ai**

## Overview

This entity flow opens fiscal periods that overlap with a specified target date. It changes the status of eligible fiscal periods from any non-open status (Closed, Locked, etc.) to "Opened" status, allowing transaction entry and modifications within those periods.

## When This Action Runs

- **Trigger:** Manual execution or scheduled automation
- **Target:** System-wide fiscal period management
- **Scope:** Opens periods that contain or overlap with the target date
- **Safety:** Only affects periods that are not already open

## How It Works

### 1. Date Calculation
- **Base Date:** Today's date
- **Parameter:** Days offset (can be positive or negative)
- **Target Date:** Today + parameter days
- **Range:** Opens periods where `startDate ≤ target date ≤ endDate`

### 2. Period Selection Criteria
The action finds fiscal periods where:
- `startDate` is less than or equal to the calculated target date
- `endDate` is greater than or equal to the calculated target date  
- `periodStatus` is NOT "Opened" (affects Closed, Locked, or other statuses)

### 3. Batch Processing
- **Groups by Fiscal Year:** Processes periods by their parent fiscal year
- **Transactional:** Updates are committed per fiscal year for data integrity
- **Status Update:** Changes period status to "Opened" in fiscal year details

## Key Difference from Close Action

Unlike `EACloseFiscalPeriodsInRange`:
- **Date Logic:** Uses overlapping date range (startDate ≤ target ≤ endDate) instead of end date comparison
- **Purpose:** Opens periods for transaction entry instead of closing them
- **Target Status:** Sets status to "Opened" instead of "Closed"

## Parameters

### Parameter 1: Days From Today
- **Type:** Integer
- **Required:** No (defaults to 0 if empty)
- **Format:** Whole number (positive, negative, or zero)

**Examples:**
- `0` - Open periods that contain today's date
- `-7` - Open periods that contained the date 7 days ago
- `30` - Open periods that will contain the date 30 days from now
- `-30` - Open periods that contained the date 30 days ago

## Database Tables Affected

### Primary Tables
- **FiscalPeriod:** Individual period records
  - `startDate` and `endDate`: Define the period date range
  - `periodStatus`: Must not be "Opened" to be eligible

- **FiscalYear:** Parent year containers
  - Contains collection of fiscal year periods
  - Updated transactionally to maintain data integrity

- **FiscalYearPeriod:** Detail lines within fiscal years
  - `periodStatus`: Updated to "Opened"
  - Links to generated fiscal period entities

## SQL Query for Monitoring

To see which fiscal periods would be affected:

```sql
SELECT 
    fp.id,
    fp.code,
    fp.startDate,
    fp.endDate,
    fp.periodStatus,
    fy.code AS FiscalYearCode
FROM FiscalPeriod fp
INNER JOIN FiscalYear fy ON fp.year_id = fy.id
WHERE fp.startDate <= DATEADD(day, 0, GETDATE())
    AND fp.endDate >= DATEADD(day, 0, GETDATE())
    AND fp.periodStatus != 'Opened';
```

## Business Impact

### Financial Operations
- **Transaction Entry:** Enables posting transactions to previously closed periods
- **Period Corrections:** Allows adjustments and corrections in historical periods
- **Audit Flexibility:** Provides ability to reopen periods for compliance adjustments

### Operational Effects
- **Data Modification:** Permits changes to transactions in reopened periods
- **Report Updates:** May affect historical financial reports
- **Control Relaxation:** Temporarily removes period-end restrictions

## Important Warnings

### ⚠️ Audit Trail Considerations
- Opening closed periods may have audit implications
- Document business justification for reopening periods
- Consider approval workflows before execution

### ⚠️ Data Integrity Impact
- Reopened periods allow modifications to historical data
- May affect previously finalized financial reports
- Consider backup procedures before opening critical periods

### ⚠️ Access Control
- Ensure only authorized personnel can reopen periods
- Monitor transactions posted to reopened periods
- Consider time limits for how long periods remain open

### ⚠️ Regulatory Compliance
- Check local accounting regulations before reopening periods
- Some jurisdictions have restrictions on historical modifications
- Document compliance requirements and approvals

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAOpenFiscalPeriodsInRange`

**Related Actions:**
- [EACloseFiscalPeriodsInRange](EACloseFiscalPeriodsInRange.md)


</div>

