---
title: EAChangeEmployeeStateHandler
module: hr
---


<div class='entity-flows'>

# EAChangeEmployeeStateHandler

**This document was generated using Claude.ai**

## Overview

Updates employee states based on vacation documents that specify state changes. Executes a SQL query to find vacation documents, then applies the vacation type's designated employee state change to the associated employees.

## When This Action Runs

Manual execution or scheduled tasks for automated employee state management based on approved vacation documents. Typically used to change employee status when vacation periods begin or when specific vacation types require state changes.

## How It Works

1. **Executes SQL query** - Runs the provided query to find vacation document IDs
2. **Retrieves vacation documents** - Loads each vacation document by ID from query results
3. **Validates state change** - Checks if vacation document has a defined state change target
4. **Updates employee state** - Changes the associated employee's state to the vacation type's specified state
5. **Commits changes** - Saves employee state changes without triggering replication
6. **Processes all results** - Iterates through all vacation documents returned by the query

## Parameters

**Parameter 1:** Query (Required) - SQL query returning vacation document IDs that require employee state changes

## Example SQL Query

```sql
select d.id 
from VacationDocument d 
left join Employee e on e.id = d.employee_id 
left join VacationType t on t.id = d.vacationType_id
where d.commitedBefore = 1 
  and d.startDate >= cast(getdate() as date) 
  and t.changeEmployeeStateTo <> e.employeeState
```

## Database Tables Affected

- **VacationDocument** - Reads vacation documents to determine required state changes
- **Employee** - Updates employee state field based on vacation type configuration
- **VacationType** - References vacation type configuration for target employee states

## Important Warnings

### ⚠️ Query Requirements
- Query must return vacation document IDs (first column)
- Query should filter for committed vacation documents only
- Include proper date filtering to avoid processing past vacations
- Ensure vacation types have valid changeEmployeeStateTo values

### ⚠️ Employee State Changes
- Employee state changes are permanent and affect employee status
- Changes may impact payroll calculations, access rights, and reporting
- No automatic reversal when vacation periods end
- Consider implementing reverse processes for vacation completion

### ⚠️ Vacation Document Dependencies
- Only processes vacation documents with defined state change targets
- Vacation documents must be properly linked to employees
- Missing or invalid vacation type configurations are skipped
- Vacation types must have changeEmployeeStateTo field populated

### ⚠️ Replication Behavior
- Employee changes are committed without triggering replication
- Changes may not propagate to other systems immediately
- Consider manual replication if cross-system synchronization is required

### ⚠️ Date and Time Considerations
- Query should include appropriate date filtering for timing
- Consider time zones when filtering by dates
- Future-dated vacations may be processed before actual start dates
- Past vacations may be processed if not properly filtered

### ⚠️ Business Logic Impact
- State changes may trigger other business rules and validations
- Employee access permissions may change based on new state
- Payroll and attendance calculations may be affected
- Integration with other modules may be impacted

### ⚠️ Error Handling
- Failed employee updates are logged but don't stop processing
- Invalid vacation document IDs are skipped silently
- Large result sets may cause performance issues
- Consider batching for high-volume operations

### ⚠️ Audit and Tracking
- Employee state changes may not be automatically audited
- Consider logging state changes for compliance purposes
- Track which vacation documents triggered state changes
- Monitor for unexpected or incorrect state changes

**Module:** hr

**Full Class Name:** `com.namasoft.modules.humanresource.utils.actions.EAChangeEmployeeStateHandler`


</div>

