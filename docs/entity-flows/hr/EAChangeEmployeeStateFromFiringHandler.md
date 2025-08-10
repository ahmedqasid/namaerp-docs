---
title: EAChangeEmployeeStateFromFiringHandler
module: hr
---

<div class='entity-flows'>

# EAChangeEmployeeStateFromFiringHandler

**Module:** Human Resources (HR)

**Full Class Name:** `com.namasoft.modules.humanresource.utils.actions.EAChangeEmployeeStateFromFiringHandler`

## Purpose

This entity flow automatically updates employee status when their termination date arrives. It processes firing documents that have a delayed status update and applies the termination when the work end date is reached.

## When to Use

This flow should be configured as a **scheduled task** that runs periodically (typically daily) to process pending employee terminations. It's essential for organizations that create firing documents in advance but want the actual employee status change to occur automatically on the termination date.

## How It Works

### Process Overview

1. **Searches for Pending Documents**: The flow queries the database for firing documents that meet these criteria:
   - Document is committed (`commitedBefore = 1`)
   - Work end date has passed or is today (`workEndDate <= current date`)
   - Employee status update is marked as delayed (`empStatusUpdateDelayed = 1`)

2. **Processes Each Document**: For each qualifying document:
   - Creates a new transaction to ensure data consistency
   - Retrieves the full FiringDocument record
   - Verifies the document has a firing reason
   - Calls the `updateEmpState` method to change the employee's status
   - Tracks any failures for reporting

3. **Reports Results**: 
   - Returns success if all documents are processed successfully
   - Returns failure with details if any documents fail (shows up to 20 failed documents)

## Important Details

### Database Query Used

The system runs this SQL query to find documents to process:

```sql
select d.id from FiringDocument d
where d.commitedBefore = 1 
  and d.workEndDate <= cast(getdate() as date)
  and d.empStatusUpdateDelayed = 1
```

### Fields Involved

Key fields in the FiringDocument entity:
- **employee**: The employee being terminated (required field)
- **workEndDate**: The last working day for the employee (required field)
- **firingReason**: The reason for termination (required field)
- **empStatusUpdateDelayed**: System flag indicating the status update should happen later
- **commitedBefore**: Standard document commit flag

## Configuration Requirements

### Setting Up the Scheduled Task

1. Navigate to **System Settings > Scheduled Tasks**
2. Create a new scheduled task with:
   - **Entity Flow**: Select `EAChangeEmployeeStateFromFiringHandler`
   - **Schedule**: Typically set to run daily at a specific time (e.g., 12:01 AM)
   - **Active**: Set to Yes

### HR Configuration

Check the HR module configuration for the setting:
- **UpdateEmpStatusFromFiringDocInSameDate**: When enabled, if a firing document is created with a future work end date, the system will automatically set `empStatusUpdateDelayed = 1`

## Performance Considerations

- **Processing Time**: Each document is processed in a separate transaction, which may take time for large volumes
- **Database Load**: The initial query is lightweight, but processing many documents can impact database performance
- **Error Handling**: If one document fails, others will still be processed
- **Maximum Error Reporting**: Only the first 20 failed documents are reported to avoid overwhelming error messages

## Best Practices

1. **Schedule During Off-Hours**: Run this task during low-activity periods to minimize impact
2. **Monitor Regularly**: Check task execution logs weekly to catch any recurring failures
3. **Clean Up Old Documents**: Periodically review and clean up old firing documents that may have incorrect flags
4. **Test in Development**: Always test configuration changes in a development environment first

## Related Entities and Flows

- **FiringDocument**: The main document entity being processed
- **Employee**: The employee entity whose status is updated
- **EmployeeStateSysEntry**: System entries tracking employee state changes
- **VacationDocument**: Related vacation balance adjustments

</div>