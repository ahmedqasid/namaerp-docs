---
title: EAAutoEscalateApprovalToSupervisor
module: core
---

<div class='entity-flows'>

# EAAutoEscalateApprovalToSupervisor

**This document was generated using Claude.ai**

## Overview

Automatically escalates overdue approval cases to the supervisor of the assigned employee when timeout periods are exceeded. Uses organizational hierarchy instead of fallback employees.

## When This Action Runs

- **Trigger:** Scheduled task execution
- **Target:** Approval cases exceeding auto-escalation timeout
- **Purpose:** Escalate to supervisor based on organizational hierarchy
- **Timing:** Runs on system schedule to check for overdue approvals

## How It Works

1. **Finds overdue approvals** where `nearestAutoEscalateDate` has passed and state is "InProgress"
2. **Validates escalation candidates** haven't already been escalated
3. **Checks timeout configuration** in approval definition
4. **Escalates to supervisor** of current candidate employee using organizational hierarchy

## Database Tables Affected

### ApprovalCase
- **nearestAutoEscalateDate** - When escalation should occur
- **state** - Must be "InProgress" for escalation

### ApprovalDefinition
- **autoEscalateAfter** - Time period before escalation (value + unit)

### ApprovalCaseStepCandidate
- **escalated** - Whether candidate has been escalated
- **requestedOn** - When approval was initially requested
- **candidate_id** - Employee who should approve

## Key Differences from Fallback Escalation

- **Target:** Escalates to employee's direct supervisor (hierarchy-based)
- **Logic:** Uses organizational hierarchy to find supervisor
- **Configuration:** No specific fallback employee configuration needed

## Configuration Requirements

### Approval Definition Setup
- **autoEscalateAfter:** Must specify time period (value + unit)
- **Examples:** "2 Days", "1 Week", "4 Hours"

### Employee Hierarchy
- **Supervisor Relationship:** Employees must have supervisor configured in HR module
- **Organizational Structure:** Clear reporting hierarchy must be established

## SQL Query Example

```sql
SELECT ac.id, ac.nearestAutoEscalateDate, ac.state, 
       ad.autoEscalateAfter_value, ad.autoEscalateAfter_uom
FROM ApprovalCase ac
INNER JOIN ApprovalDefinition ad ON ac.approvalDefinition_id = ad.id
WHERE ac.nearestAutoEscalateDate <= GETDATE()
    AND ac.state = 'InProgress'
    AND ad.autoEscalateAfter_value > 0;
```

## Important Warnings

### ⚠️ Configuration Requirements
- **Supervisor Relationship Required:** Employees must have supervisor configured
- **Timeout Configuration:** Must have valid autoEscalateAfter time period
- **Infinite Loop Prevention:** System tracks escalated status to prevent repeated escalations

### ⚠️ Operational Impact
- **Missing Supervisor:** Escalation may fail if employee has no supervisor configured
- **Audit Trail:** All escalations create permanent audit records
- **Performance:** Large volumes of overdue approvals may impact processing time

## Related Actions

- **EAAutoEscalateApprovalToFallBackEmployee** - Escalates to specific fallback employee instead of supervisor

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAAutoEscalateApprovalToSupervisor`

</div>

