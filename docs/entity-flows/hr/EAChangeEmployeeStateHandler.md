---
title: EAChangeEmployeeStateHandler
module: hr
---


<div class='entity-flows'>

# EAChangeEmployeeStateHandler

**This document was generated using Claude.ai**

## Overview

This entity flow automatically updates employee states based on vacation documents. When employees go on specific types of vacation (like unpaid leave or maternity leave), their employee state needs to change in the system. This handler processes vacation documents and applies the required state changes to the associated employees.

## What This Action Does

The handler takes a SQL query that finds vacation documents requiring employee state changes, then automatically updates each employee's state based on their vacation type configuration. This is essential for maintaining accurate employee statuses for payroll, attendance, and reporting purposes.

## When This Action Runs

This action typically runs in the following scenarios:
- **Scheduled Tasks**: Daily automated processes to update employee states for vacations starting today
- **Manual Execution**: Support staff can run this to correct employee states or process specific vacation batches
- **Integration Points**: May be triggered by other HR processes when vacation documents are approved

## Step-by-Step Process

1. **Query Execution**
   - The system runs your provided SQL query against the database
   - The query must return vacation document IDs in the first column
   - Each ID represents a vacation document that needs processing

2. **Document Loading**
   - For each ID returned by the query, the system loads the full VacationDocument record
   - If a document ID is invalid or deleted, it's skipped without error

3. **State Change Validation**
   - The system checks if the vacation document has a valid `changeEmployeeStateTo` value
   - This value comes from the VacationType configuration
   - Documents without this value are skipped

4. **Employee State Update**
   - The system calls `changeEmployeeStateIfNeeded` method on the vacation document
   - This updates the employee's state to match the vacation type's requirement
   - Changes are saved immediately to the database

5. **Result Accumulation**
   - All processing results are collected and returned
   - Errors for individual documents don't stop the overall process

## Required Parameter

**Query Parameter (Required)**
The SQL query that identifies vacation documents needing state changes. The query must:
- Return vacation document IDs as the first (or only) column
- Use proper table names (case-insensitive in SQL Server)
- Include appropriate filtering conditions

### Standard Query Template

```sql
select d.id 
from VacationDocument d 
left join Employee e on e.id = d.employee_id 
left join VacationType t on t.id = d.vacationType_id
where d.commitedBefore = 1 
  and d.startDate >= cast(getdate() as date) 
  and t.changeEmployeeStateTo <> ''
  and t.changeEmployeeStateTo <> e.employeeState
```

### Query Breakdown Explanation

- `d.commitedBefore = 1` - Only process approved/committed vacation documents
- `d.startDate >= cast(getdate() as date)` - Process vacations starting today or in the future
- `t.changeEmployeeStateTo <> ''` - Only vacation types that require state changes
- `t.changeEmployeeStateTo <> e.employeeState` - Only if employee isn't already in the target state

## Database Tables and Fields

### Primary Tables
- **VacationDocument** - Stores all vacation requests and approvals
- **Employee** - Contains employee master data including current state
- **VacationType** - Defines vacation types and their associated state changes

### Key Fields Used

**VacationDocument Table:**
- `id` - Unique identifier for the vacation document
- `employee_id` - Links to the Employee record
- `vacationType_id` - Links to the VacationType configuration
- `startDate` - When the vacation begins
- `endDate` - When the vacation ends
- `commitedBefore` - Flag indicating if vacation is approved (1 = approved)

**Employee Table:**
- `id` - Unique employee identifier
- `employeeState` - Current state/status of the employee

**VacationType Table:**
- `id` - Unique vacation type identifier
- `changeEmployeeStateTo` - Target employee state when this vacation type is active


## Technical Details

**Module:** hr  

**Full Class Name:** `com.namasoft.modules.humanresource.utils.actions.EAChangeEmployeeStateHandler`

</div>