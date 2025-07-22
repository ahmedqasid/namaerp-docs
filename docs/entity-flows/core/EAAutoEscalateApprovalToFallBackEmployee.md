---
title: EAAutoEscalateApprovalToFallBackEmployee
module: core
---


<div class='entity-flows'>

# EAAutoEscalateApprovalToFallBackEmployee

**This document was generated using AI Tools**

## Purpose
This action automatically escalates approval requests to the designated fallback employee when the original approver has not responded within the specified time period. It's part of the automated approval escalation system to prevent approvals from getting stuck.

## When to Use This Action
- **Approval Workflow Management**: When you need to ensure approvals don't get stuck due to unavailable approvers
- **Scheduled Escalation**: As part of scheduled tasks to check and escalate overdue approvals
- **Backup Approval Process**: When primary approvers are unavailable and fallback employees need to take over

## How It Works
1. **Finds Overdue Approvals**: Searches for approval cases that have passed their escalation deadline
2. **Identifies Fallback Employee**: Gets the designated fallback employee from the approval definition
3. **Creates Escalation Step**: Adds an escalation step to move approval to the fallback employee
4. **Updates Approval Status**: Marks the original candidate as escalated and assigns to fallback

## Key Concepts

### Fallback Employee
- Each approval definition can have a designated **fallback employee**
- This is the person who will receive escalated approvals when primary approvers don't respond
- Fallback employees are configured in the approval definition settings

### Auto-Escalation Timeline
- Approval definitions specify an "auto escalate after" time period
- When this time expires without approval action, escalation is triggered
- Time periods can be in hours, days, weeks, etc.

### Escalation vs. Supervision
- **EAAutoEscalateApprovalToFallBackEmployee**: Escalates to designated fallback employee
- **EAAutoEscalateApprovalToSupervisor**: Escalates to the candidate's direct supervisor

## Process Flow

### Step 1: Find Eligible Approvals
- Searches for approval cases with `nearestAutoEscalateDate` <= current date/time
- Only processes approvals in "InProgress" state
- Filters for approval steps that haven't been escalated yet

### Step 2: Time Period Validation
- Checks if auto-escalation is configured for the approval definition
- Calculates if enough time has passed since the approval was requested
- Only proceeds if the escalation time threshold has been exceeded

### Step 3: Fallback Assignment
- Retrieves the fallback employee from the approval definition
- Skips escalation if the fallback employee is the same as the current candidate
- Creates an escalation approval step assigning to the fallback employee

### Step 4: Escalation Recording
- Adds an approval step with decision "EscalateToSupervisor" (note: uses supervisor decision type)
- Records "Auto escalate" as the reason
- Marks the original candidate as escalated
- Links the escalation to the fallback employee

## Parameters
This action requires **no parameters** - it automatically processes all eligible approval cases system-wide.

## Important Notes

⚠️ **KEY POINTS:**

1. **System-Wide Processing**: Processes ALL overdue approvals in the system, not just specific ones
2. **Requires Fallback Configuration**: Only works if approval definitions have fallback employees configured
3. **Time-Based Trigger**: Only escalates approvals that have exceeded their configured time limits
4. **One-Time Escalation**: Each approval step is only escalated once (prevents infinite escalation loops)
5. **Fallback Employee Must Exist**: Escalation fails if the fallback employee is not configured or invalid

## Configuration Requirements

### Approval Definition Setup
- **Auto Escalate After**: Must be configured with a valid time period
- **Fallback Employee**: Must be assigned to a valid, active employee
- **Escalation Rules**: Should be properly defined in the approval workflow

### Scheduled Execution
- This action should be run as a scheduled task (e.g., every hour or daily)
- More frequent execution ensures faster escalation response times
- Consider business hours when scheduling escalation checks

## Monitoring and Troubleshooting

### Success Indicators
- **Escalation Steps Created**: Check for new approval steps with "EscalateToSupervisor" decision
- **Fallback Assignment**: Verify approvals are assigned to correct fallback employees
- **Approval Progress**: Monitor that escalated approvals continue to move forward

### Common Issues

**"No escalations happening"**
- Check if approval definitions have fallback employees configured
- Verify auto-escalation time periods are set correctly
- Ensure approvals have actually exceeded their escalation deadlines

**"Escalating to wrong person"**
- Verify fallback employee configuration in approval definitions
- Check that fallback employees are active and have proper permissions
- Review approval definition hierarchy and settings

**"Infinite escalation loops"**
- System prevents this by marking steps as escalated
- Check for circular fallback assignments in approval configurations
- Verify escalation logic doesn't create approval cycles

### Log Monitoring
Monitor approval case status changes and escalation step creation in system logs.

## SQL to Check Results

```sql
-- Check recent escalation steps
SELECT ac.code, acs.stepNumber, acs.candidate_id, acs.decision, acs.creationDate
FROM ApprovalCase ac
JOIN ApprovalCaseStep acs ON ac.id = acs.approvalCase_id
WHERE acs.decision = 'EscalateToSupervisor'
  AND acs.creationDate > DATEADD(day, -1, GETDATE())
ORDER BY acs.creationDate DESC

-- Check candidates marked as escalated
SELECT ac.code, acsc.candidate_id, acsc.escalated, acsc.requestedOn
FROM ApprovalCase ac
JOIN ApprovalCaseStepCandidate acsc ON ac.id = acsc.approvalCase_id
WHERE acsc.escalated = 1
```

## Related Actions
- **EAAutoEscalateApprovalToSupervisor**: Escalates to supervisor instead of fallback employee
- **Manual Approval Actions**: For handling approvals that require manual intervention
- **Approval Definition Configuration**: Setting up escalation rules and fallback assignments

---

**Module:** core  
**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAAutoEscalateApprovalToFallBackEmployee`

</div>