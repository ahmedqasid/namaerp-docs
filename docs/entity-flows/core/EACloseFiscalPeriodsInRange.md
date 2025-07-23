---
title: EACloseFiscalPeriodsInRange
module: core
---


<div class='entity-flows'>

# EACloseFiscalPeriodsInRange

**This document was generated using AI Tools**

## Purpose
This action automatically closes fiscal periods that fall within a specified date range by changing their status from Open or any other status to Closed. It's used for end-of-period financial management and accounting period control.

## When to Use This Action
- **Period-End Closing**: Close multiple fiscal periods at once during month-end or year-end procedures
- **Batch Period Management**: When many periods need to be closed simultaneously
- **Automated Closing**: Scheduled closing of periods after specific timeframes
- **Compliance Requirements**: When regulations require periods to be closed after certain dates
- **Financial Control**: Prevent modifications to transactions in older periods

## How It Works
1. **Date Calculation**: Calculates target date based on "days from today" parameter
2. **Period Selection**: Finds all fiscal periods with end dates on or before the target date
3. **Status Filter**: Only processes periods that are NOT already Closed
4. **Status Update**: Changes period status to Closed for matching periods
5. **Year Processing**: Updates fiscal year data containing the modified periods
6. **Commit Changes**: Saves all changes to database with proper transaction handling

## Parameters Required

### Parameter 1: Days From Today (Optional)
- **What it is**: Number of days from today to calculate the closing date
- **Format**: Integer number (positive, negative, or zero)
- **Default**: If empty, uses today's date (0 days)
- **Purpose**: Determines which periods to close based on their end dates

### Parameter Value Examples
```
0 (or empty)    - Close periods ending today or earlier
-30             - Close periods ending 30 days ago or earlier  
-90             - Close periods ending 90 days ago or earlier
30              - Close periods ending 30 days from now or earlier
```

## How Period Selection Works

### Selection Criteria
The action finds fiscal periods where:
- **End Date**: Period end date ≤ (Today + Days Parameter)
- **Status**: Period status is NOT already "Closed"
- **All Periods**: Processes all matching periods regardless of year

### Date Logic Examples
If today is 2024-12-15:
- **Parameter = 0**: Closes periods ending on/before 2024-12-15
- **Parameter = -30**: Closes periods ending on/before 2024-11-15
- **Parameter = 30**: Closes periods ending on/before 2025-01-14

## Fiscal Period Status Changes

### Status Transition
- **From**: Any status (Open, Provisional, etc.) EXCEPT Closed
- **To**: Closed
- **Effect**: Prevents further posting to those periods
- **Scope**: All matching periods across all fiscal years

### What "Closed" Status Means
- **No New Transactions**: Cannot post new journal entries to closed periods
- **Data Protection**: Existing transactions are preserved but locked
- **Reporting Stability**: Financial reports for closed periods become final
- **Audit Compliance**: Meets requirements for period-end controls

## Important Notes

⚠️ **CRITICAL WARNINGS:**

1. **Irreversible Action**: Closing periods prevents future posting - requires separate action to reopen
2. **Cross-Year Impact**: Can close periods across multiple fiscal years simultaneously  
3. **Transaction Blocking**: All transaction posting to closed periods will be rejected
4. **Business Impact**: Users cannot modify any data in closed periods
5. **Year-End Effects**: Closing all periods in a year may affect year-end procedures

## Business Impact Assessment

### Before Running This Action
1. **Verify Period Readiness**: Ensure all necessary transactions are posted
2. **Check Adjustments**: Complete any pending adjusting entries
3. **Review Reports**: Generate and verify period-end reports
4. **User Notification**: Inform users about upcoming period closures
5. **Backup Recommended**: Consider database backup before bulk period closing

### After Running This Action
- **Posting Restrictions**: Users cannot post to closed periods
- **Error Messages**: System will reject attempts to post to closed periods
- **Period Reopening**: Requires separate action to reopen periods if needed
- **Audit Trail**: All closure activities are logged for audit purposes

## Monitoring and Troubleshooting

### Success Indicators
- **Periods Closed**: Target periods show "Closed" status
- **No Errors**: Action completes without validation or processing errors
- **Year Updates**: Associated fiscal years are properly updated
- **Transaction Safety**: All changes committed successfully

### Common Issues

**"No periods found to close"**
- All matching periods may already be closed
- Check date calculation - may be selecting wrong date range
- Verify fiscal periods exist for the calculated date range
- Confirm parameter value is correct

**"Periods not closing"**
- Check if periods have transactions that prevent closing
- Verify user has permissions to modify fiscal periods
- Ensure periods are in a status that allows closing
- Check for system locks on fiscal year data

**"Some periods failed to close"**
- Individual periods may have validation errors
- Check for pending transactions or unbalanced entries
- Verify period-end requirements are met
- Review system logs for specific error messages

**"Year-end processing errors"**
- Fiscal year may be locked or in use by other processes
- Check for year-end procedures that must complete first
- Verify fiscal year status allows period modifications
- Ensure proper user permissions for year modifications

## SQL Queries for Monitoring

```sql
-- Check fiscal periods and their statuses
SELECT fp.code, fp.name1, fp.startDate, fp.endDate, fp.periodStatus
FROM FiscalPeriod fp
WHERE fp.endDate <= DATEADD(day, [days_parameter], GETDATE())
ORDER BY fp.endDate

-- Find recently closed periods
SELECT fp.code, fp.name1, fp.endDate, fp.periodStatus, fp.lastUpdateDate
FROM FiscalPeriod fp  
WHERE fp.periodStatus = 'Closed'
  AND fp.lastUpdateDate > DATEADD(hour, -24, GETDATE())
ORDER BY fp.lastUpdateDate DESC

-- Check fiscal years with recently modified periods
SELECT fy.code, fy.name1, fy.startDate, fy.endDate, 
       COUNT(fp.id) as closed_periods_count
FROM FiscalYear fy
JOIN FiscalPeriod fp ON fp.year_id = fy.id
WHERE fp.periodStatus = 'Closed' 
  AND fp.lastUpdateDate > DATEADD(hour, -24, GETDATE())
GROUP BY fy.code, fy.name1, fy.startDate, fy.endDate
```

## Best Practices

### Timing Recommendations
- **Month-End**: Run 2-3 days after month end when all entries are complete
- **Quarter-End**: Allow extra time for quarter-end adjustments
- **Year-End**: Coordinate with year-end closing procedures
- **Scheduled Runs**: Consider automated scheduling for routine closures

### Parameter Guidelines
- **Conservative Approach**: Start with longer lookback periods (e.g., -45 days)
- **Gradual Implementation**: Close recent periods first, then historical ones
- **Testing**: Test with small date ranges before bulk operations
- **Documentation**: Document which periods are being closed and why

### Risk Mitigation
- **Backup First**: Always backup before bulk period operations
- **User Communication**: Notify users before closing periods
- **Verification**: Check results immediately after running
- **Rollback Plan**: Have procedure to reopen periods if needed

### Integration with Other Processes
- **Coordinate with Accounting Team**: Ensure month-end tasks are complete
- **Check Reporting Requirements**: Generate reports before closing
- **Review System Integrations**: Ensure external systems are updated
- **Audit Preparation**: Document closure decisions for auditors

## Related Actions
- **EAOpenFiscalPeriodsInRange**: For reopening closed periods if needed
- **Period Management Tools**: Other fiscal period maintenance actions
- **Year-End Processing**: Actions for fiscal year closing procedures
- **Transaction Posting Controls**: Actions that manage posting permissions

---

**Module:** core  
**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EACloseFiscalPeriodsInRange`

</div>