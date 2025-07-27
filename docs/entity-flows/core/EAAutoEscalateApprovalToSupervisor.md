---
title: EAAutoEscalateApprovalToSupervisor
module: core
---


<div class='entity-flows'>

# EAAutoEscalateApprovalToSupervisor

**This document was generated using Claude.ai**

## Overview

This entity flow automatically escalates overdue approval cases to the supervisor of the assigned employee when timeout periods are exceeded. It is a specialized version of the approval escalation system that specifically targets supervisor-based escalation rather than fallback employees.

## When This Action Runs

- **Trigger:** Automatic execution on scheduled intervals
- **Event Type:** Not tied to specific document events
- **Execution Context:** System-wide approval case processing
- **Frequency:** Based on system scheduling configuration

## How It Works

The action performs the following steps automatically:

### 1. Find Overdue Approvals
Searches for approval cases that meet all criteria:
- `nearestAutoEscalateDate` is in the past (≤ current time)
- Case state is "InProgress"
- Has active candidates waiting for approval

### 2. Validate Escalation Candidates
For each found approval case, checks if escalation is appropriate:
- Candidate has not already been escalated (`escalated = false`)
- Approval definition has `autoEscalateAfter` time period configured
- Time period since candidate request exceeds the configured threshold

### 3. Escalate to Supervisor
Creates a new approval step with:
- **Decision Type:** "EscalateToSupervisor"
- **Target:** The supervisor of the current candidate employee
- **Reason:** "Auto escalate" 
- **Audit Trail:** Full tracking of the escalation action

## Database Tables Affected

### Primary Tables
- **ApprovalCase:** Cases being monitored for escalation
  - `nearestAutoEscalateDate`: When escalation should occur
  - `state`: Must be "InProgress" to be eligible

- **ApprovalDefinition:** Configuration for escalation rules
  - `autoEscalateAfter`: Time period before escalation (value + unit)

- **ApprovalCaseStepCandidate:** Individual approval assignments
  - `escalated`: Whether this candidate has been escalated
  - `requestedOn`: When the approval was initially requested
  - `candidate_id`: Reference to the employee who should approve

## Key Differences from Fallback Escalation

Unlike `EAAutoEscalateApprovalToFallBackEmployee`:
- **Target:** Escalates to employee's direct supervisor (hierarchy-based)
- **Logic:** Uses system's organizational hierarchy to find supervisor
- **Configuration:** No specific fallback employee configuration needed

## SQL Query for Monitoring

To check which approval cases are eligible for supervisor escalation:

```sql
SELECT 
    ac.id AS ApprovalCaseId,
    ac.nearestAutoEscalateDate,
    ac.state,
    ad.autoEscalateAfter_value,
    ad.autoEscalateAfter_uom
FROM ApprovalCase ac
INNER JOIN ApprovalDefinition ad ON ac.approvalDefinition_id = ad.id
WHERE ac.nearestAutoEscalateDate <= GETDATE()
    AND ac.state = 'InProgress'
    AND ad.autoEscalateAfter_value > 0;
```

## Configuration Requirements

### Approval Definition Setup
- **autoEscalateAfter:** Must specify time period (value + unit)
  - Examples: "2 Days", "1 Week", "4 Hours"
  - Used to calculate when escalation should occur

### Employee Hierarchy
- **Supervisor Relationship:** Employees must have supervisor configured in HR module
- **Organizational Structure:** Clear reporting hierarchy must be established

## Important Warnings

### ⚠️ Supervisor Availability
- If employee has no supervisor configured, escalation may fail
- System should gracefully handle missing supervisor relationships

### ⚠️ Infinite Loop Prevention
- System tracks escalated status to prevent repeated escalations
- Each candidate can only be escalated once per approval step

### ⚠️ Audit Trail Impact
- All escalations create permanent audit records
- Decision history shows automatic escalation reasoning

### ⚠️ Performance Considerations
- Processes all overdue cases in single execution
- Large volumes of overdue approvals may impact processing time

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAAutoEscalateApprovalToSupervisor`

**Related Actions:**
- [EAAutoEscalateApprovalToFallBackEmployee](EAAutoEscalateApprovalToFallBackEmployee.md)


</div>

