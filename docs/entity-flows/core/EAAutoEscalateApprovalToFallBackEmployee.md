---
title: EAAutoEscalateApprovalToFallBackEmployee
module: core
---

<div class='entity-flows'>

# EAAutoEscalateApprovalToFallBackEmployee

**This document was generated using Claude.ai**

## Overview

Automatically escalates overdue approval cases to the fallback employee defined in the approval definition. Ensures approvals don't get stuck with unavailable employees.

## When This Action Runs

- **Trigger:** Scheduled task execution
- **Target:** Approval cases exceeding auto-escalation timeout
- **Purpose:** Prevent approval bottlenecks with unavailable employees
- **Timing:** Runs on system schedule to check for overdue approvals

## How It Works

1. **Finds overdue approvals** where `nearestAutoEscalateDate` has passed and state is "InProgress"
2. **Validates escalation candidates** haven't already been escalated
3. **Checks timeout configuration** in approval definition
4. **Escalates to fallback employee** specified in approval definition

## Database Tables Affected

### ApprovalCase
- **nearestAutoEscalateDate** - When approval should be auto-escalated
- **state** - Must be "InProgress" for escalation (values: Approved, Rejected, Returned, Revoked, InProgress)

### ApprovalDefinition
- **fallBack** - Employee to escalate to when timeout occurs
- **autoEscalateAfter.value/uom** - Time period before escalation

### ApprovalCaseStepCandidate
- **escalated** - Tracks if candidate already escalated
- **requestedOn** - When approval request was made

## Configuration Requirements

### Approval Definition Setup
- **fallBack employee** must be specified
- **autoEscalateAfter** must have valid time period (value > 0 and uom)

### Approval Case Requirements
- Must be in "InProgress" state
- Must have `nearestAutoEscalateDate` set and exceeded
- Must have active candidates not yet escalated

## SQL Query Example

```sql
SELECT ac.id, ac.nearestAutoEscalateDate, ac.state, 
       ad.code, fb.name1 AS FallbackEmployee
FROM ApprovalCase ac
INNER JOIN ApprovalDefinition ad ON ac.approvalDefinition_id = ad.id
LEFT JOIN Employee fb ON ad.fallBack_id = fb.id
WHERE ac.nearestAutoEscalateDate <= GETDATE()
    AND ac.state = 'InProgress'
    AND ad.fallBack_id IS NOT NULL
ORDER BY ac.nearestAutoEscalateDate;
```

## Important Warnings

### ⚠️ Configuration Requirements
- **Fallback Employee Required:** Approval definition must have fallback employee configured
- **Timeout Configuration:** Must have valid autoEscalateAfter time period
- **Infinite Loop Prevention:** System checks fallback isn't same as current candidate

### ⚠️ Operational Impact
- **Automatic Processing:** Processes all eligible approval cases without user intervention
- **Audit Trail:** Creates approval step records showing "Auto escalate" reason
- **Workflow Modification:** Changes approval routing automatically

## Related Actions

- **EAAutoEscalateApprovalToSupervisor** - Escalates to employee's supervisor instead of fallback

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAAutoEscalateApprovalToFallBackEmployee`

</div>

