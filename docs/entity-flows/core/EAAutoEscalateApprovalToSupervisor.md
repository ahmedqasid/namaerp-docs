---
title: EAAutoEscalateApprovalToSupervisor
module: core
---


<div class='entity-flows'>

# EAAutoEscalateApprovalToSupervisor

**This document was generated using AI Tools**

## Purpose
This action automatically escalates approval requests to the candidate's direct supervisor when the original approver has not responded within the specified time period. It follows the organizational hierarchy to move approvals up the chain of command.

## When to Use This Action
- **Hierarchical Escalation**: When you want approvals to follow the organizational structure
- **Supervisor-Based Workflow**: When escalations should go to the candidate's direct supervisor
- **Scheduled Escalation**: As part of scheduled tasks to check and escalate overdue approvals

## How It Works
1. **Finds Overdue Approvals**: Searches for approval cases that have passed their escalation deadline
2. **Follows Hierarchy**: Uses the system's built-in supervisor hierarchy to determine escalation target
3. **Creates Escalation Step**: Adds an escalation step to move approval to the candidate's supervisor
4. **Updates Approval Status**: Marks the original candidate as escalated and assigns to supervisor

## Key Differences from Fallback Escalation

### Supervisor Escalation (This Action)
- **Target**: The candidate's direct supervisor in the organizational hierarchy
- **Logic**: Uses system's built-in supervisor relationships
- **Configuration**: Requires proper supervisor setup in employee records

### Fallback Escalation (EAAutoEscalateApprovalToFallBackEmployee)
- **Target**: Designated fallback employee in the approval definition
- **Logic**: Uses specific fallback employee configuration
- **Configuration**: Requires fallback employee setup in approval definitions

## Process Flow

### Step 1: Find Eligible Approvals
- Searches for approval cases with `nearestAutoEscalateDate` <= current date/time
- Only processes approvals in "InProgress" state
- Filters for approval steps that haven't been escalated yet

### Step 2: Time Period Validation
- Checks if auto-escalation is configured for the approval definition
- Calculates if enough time has passed since the approval was requested
- Only proceeds if the escalation time threshold has been exceeded

### Step 3: Supervisor Resolution
- System automatically determines the supervisor for each candidate
- Uses employee hierarchy and supervisor relationships
- Skips escalation if no supervisor is found or if supervisor is the same as candidate

### Step 4: Escalation Recording
- Adds an approval step with decision "EscalateToSupervisor"
- Records "Auto escalate" as the reason
- Marks the original candidate as escalated
- Assigns the approval to the candidate's supervisor

## Parameters
This action requires **no parameters** - it automatically processes all eligible approval cases system-wide using organizational hierarchy.

## Important Notes

⚠️ **KEY POINTS:**

1. **System-Wide Processing**: Processes ALL overdue approvals in the system, not just specific ones
2. **Requires Supervisor Setup**: Only works if employees have supervisors defined in their records
3. **Hierarchical Logic**: Uses organizational structure rather than specific fallback assignments
4. **Time-Based Trigger**: Only escalates approvals that have exceeded their configured time limits
5. **One-Time Escalation**: Each approval step is only escalated once (prevents infinite escalation loops)

## Configuration Requirements

### Employee Hierarchy Setup
- **Supervisor Relationships**: Each employee must have their supervisor properly defined
- **Organizational Structure**: Clear hierarchy must be established in employee records
- **Supervisor Permissions**: Supervisors must have appropriate approval permissions

### Approval Definition Setup
- **Auto Escalate After**: Must be configured with a valid time period
- **Escalation Rules**: Should be properly defined in the approval workflow
- **Hierarchy Integration**: Approval workflow should align with organizational structure

### Scheduled Execution
- This action should be run as a scheduled task (e.g., every hour or daily)
- More frequent execution ensures faster escalation response times
- Consider business hours when scheduling escalation checks

## Monitoring and Troubleshooting

### Success Indicators
- **Escalation Steps Created**: Check for new approval steps with "EscalateToSupervisor" decision
- **Supervisor Assignment**: Verify approvals are assigned to correct supervisors
- **Hierarchy Following**: Ensure escalations follow the organizational structure

### Common Issues

**"No escalations happening"**
- Check if employees have supervisors defined in their records
- Verify auto-escalation time periods are set in approval definitions
- Ensure approvals have actually exceeded their escalation deadlines

**"Escalating to wrong supervisor"**
- Verify supervisor relationships in employee records
- Check for outdated or incorrect hierarchy setup
- Review organizational structure and reporting relationships

**"Escalations stop at certain levels"**
- Check if top-level supervisors are properly configured
- Verify approval permissions for senior management
- Review escalation rules for management hierarchy

**"Circular escalation"**
- Check for circular supervisor relationships in employee records
- Ensure hierarchy has proper top-level termination
- Review organizational structure for logical issues

### Log Monitoring
Monitor approval case status changes and supervisor escalation patterns in system logs.

## SQL to Check Results

```sql
-- Check recent supervisor escalation steps
SELECT ac.code, acs.stepNumber, acs.candidate_id, acs.decision, acs.creationDate
FROM ApprovalCase ac
JOIN ApprovalCaseStep acs ON ac.id = acs.approvalCase_id
WHERE acs.decision = 'EscalateToSupervisor'
  AND acs.creationDate > DATEADD(day, -1, GETDATE())
ORDER BY acs.creationDate DESC

-- Check supervisor relationships for approval candidates
SELECT e.code, e.name1, s.code as supervisor_code, s.name1 as supervisor_name
FROM Employee e
LEFT JOIN Employee s ON e.supervisor_id = s.id
WHERE e.id IN (
  SELECT DISTINCT acsc.candidate_id 
  FROM ApprovalCaseStepCandidate acsc
  WHERE acsc.escalated = 0
)
```

## Related Actions
- **EAAutoEscalateApprovalToFallBackEmployee**: Escalates to fallback employee instead of supervisor
- **Manual Approval Actions**: For handling approvals that require manual intervention
- **Employee Hierarchy Management**: Setting up and maintaining supervisor relationships

## Best Practices

### Organizational Setup
- Maintain accurate supervisor relationships in employee records
- Regularly review and update organizational hierarchy
- Ensure supervisor changes are reflected in the system promptly

### Escalation Strategy
- Combine with fallback escalation for comprehensive coverage
- Set reasonable escalation time periods (not too short, not too long)
- Consider business hours and working days in escalation timing

---

**Module:** core  
**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAAutoEscalateApprovalToSupervisor`

</div>