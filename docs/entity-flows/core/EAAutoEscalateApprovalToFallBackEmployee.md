---
title: EAAutoEscalateApprovalToFallBackEmployee
module: core
---


<div class='entity-flows'>

# EAAutoEscalateApprovalToFallBackEmployee

**This document was generated using Claude.ai**

**Description:** Automatically escalates approval cases to the fallback employee when the approval timeout period has been exceeded

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAAutoEscalateApprovalToFallBackEmployee`

## Overview

This entity action automatically escalates approval cases that have exceeded their auto-escalation timeout period to the fallback employee defined in the approval definition. It runs as a scheduled task to check for overdue approvals and redirects them to ensure approvals don't get stuck with unavailable employees.

## How It Works

The system performs the following steps:

1. **Finds Overdue Approvals**: Searches for approval cases where:
   - The `nearestAutoEscalateDate` has passed (is less than or equal to current date/time)
   - The approval case state is "InProgress"

2. **Validates Escalation Candidates**: For each overdue approval case, checks:
   - The candidate hasn't already been escalated (`escalated` field is not true)
   - Auto-escalation is configured in the approval definition (`autoEscalateAfter` has a valid time period)
   - The escalation timeout has actually been reached

3. **Escalates to Fallback Employee**: Redirects the approval to the fallback employee specified in the approval definition's `fallBack` field

## Key Database Tables and Fields

### ApprovalCase Table
- **nearestAutoEscalateDate** (DateAndTime): When the approval should be auto-escalated
- **state** (Enum): Current state - must be "InProgress" for escalation
  - Possible values: Approved, Rejected, Returned, Revoked, InProgress

### ApprovalDefinition Table  
- **fallBack** (Reference to Employee): The employee to escalate approvals to when timeout occurs
- **autoEscalateAfter.value** (Decimal): Number of time units before escalation
- **autoEscalateAfter.uom** (Enum): Time unit (days, hours, minutes, etc.)

### ApprovalCaseStepCandidate Table
- **escalated** (Boolean): Tracks if this candidate has already been escalated
- **requestedOn** (Date): When the approval request was made to this candidate

## Sample SQL Query to Find Affected Records

```sql
SELECT 
    ac.id AS ApprovalCaseId,
    ac.nearestAutoEscalateDate,
    ac.state,
    ad.code AS ApprovalDefinitionCode,
    fb.name1 AS FallbackEmployeeName,
    ad.autoEscalateAfter_value,
    ad.autoEscalateAfter_uom
FROM ApprovalCase ac
INNER JOIN ApprovalDefinition ad ON ac.approvalDefinition_id = ad.id
LEFT JOIN Employee fb ON ad.fallBack_id = fb.id
WHERE ac.nearestAutoEscalateDate <= GETDATE()
    AND ac.state = 'InProgress'
    AND ad.fallBack_id IS NOT NULL
ORDER BY ac.nearestAutoEscalateDate;
```

## Configuration Requirements

For this action to work properly:

1. **Approval Definition Setup**:
   - Must have a `fallBack` employee specified
   - Must have `autoEscalateAfter` configured with valid time period (value > 0 and uom specified)

2. **Approval Case Requirements**:
   - Must be in "InProgress" state
   - Must have `nearestAutoEscalateDate` set and exceeded
   - Must have active candidates that haven't been escalated yet

## Parameters

This action takes no parameters - it processes all eligible approval cases automatically.

## Important Notes

- **Prevents Infinite Loops**: The system checks if the fallback employee is the same as the current candidate to avoid escalating to the same person
- **Bulk Processing**: Processes all overdue approval cases in a single execution
- **Audit Trail**: Creates approval step records showing "Auto escalate" as the reason
- **Time-Based**: Only processes cases where the actual timeout period has been reached, not just the scheduled escalation date

## Related Actions

- [EAAutoEscalateApprovalToSupervisor](EAAutoEscalateApprovalToSupervisor.md) - Escalates to the employee's supervisor instead of fallback employee

## Field Reference for System UI

Use ALT+CTRL+I in the system to view field information, or check https://dm.namasoft.com for complete entity documentation.

**Warning**: This action modifies approval workflows automatically. Ensure fallback employees are properly configured and available to handle escalated approvals to prevent approval bottlenecks.


</div>

