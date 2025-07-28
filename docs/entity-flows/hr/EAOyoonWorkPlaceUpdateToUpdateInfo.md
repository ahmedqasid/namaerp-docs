---
title: EAOyoonWorkPlaceUpdateToUpdateInfo
module: hr
---


<div class='entity-flows'>

# EAOyoonWorkPlaceUpdateToUpdateInfo

**This document was generated using Claude.ai**

## Overview

Automatically generates or updates employee information update documents when workplace changes are committed or deleted. Creates one UpdateEmployeeInfo document for each workplace update line, maintaining employee workplace history through the standard employee update process.

## When This Action Runs

**Automatic execution** on:
- Post-commit of WorkPlaceUpdate documents
- Post-delete of WorkPlaceUpdate documents

This action runs automatically and cannot be disabled.

## How It Works

1. **Processes each workplace update line** - Iterates through all detail lines in the workplace update document
2. **Finds or creates UpdateEmployeeInfo** - Searches for existing update document or creates new one
3. **Copies field values** - Transfers data from workplace update using field mapping in Parameter 1
4. **Sets employee information** - Links to employee and sets effective date from line
5. **Retrieves current employee info** - Gets employee's information as of day before change date
6. **Updates workplace** - Sets new workplace in the target employee information
7. **Applies field mappings** - Uses Parameter 2 to map additional fields
8. **Commits update documents** - Saves all generated UpdateEmployeeInfo documents
9. **Cleans up orphaned documents** - Deletes any UpdateEmployeeInfo documents no longer needed

## Parameters

**Parameter 1:** Fields Initializer - Field assignments for the generated document
Example:
```
book="UPDT"
term="UPDTERM"
```

**Parameter 2:** UpdateEmployeeInfo fields Map - Additional field mappings
Example:
```
branch=toInfo.empWorkPlace.branch
```

## Database Tables Affected

- **UpdateEmployeeInfo** - Creates/updates/deletes employee update documents
- **WorkPlaceUpdateLine** - Reads workplace change details (read-only)
- **EmployeeHRInfo** - Retrieves current employee HR information
- **HRPeriod** - Determines appropriate HR period for the update

## Important Warnings

### ⚠️ Automatic Execution
- **This action runs automatically and cannot be disabled**
- Executes on every commit and delete of WorkPlaceUpdate documents
- No manual intervention required or possible

### ⚠️ Document Generation Rules
- Creates one UpdateEmployeeInfo document per workplace update line
- Each line generates a separate employee update document
- Multiple employees in one workplace update create multiple documents

### ⚠️ Update Document Tracking
- Uses Description5 field to store workplace update line ID
- This linkage maintains relationship between documents
- Do not modify Description5 field in generated documents

### ⚠️ Employee History Management
- Retrieves employee information from day before change date
- Copies all current information to the update document
- Only workplace field is changed, preserving other data

### ⚠️ HR Period Determination
- Automatically determines appropriate HR period based on date
- Uses employee's HR information to find correct period
- Missing HR periods may cause generation failures

### ⚠️ Field Mapping Syntax
- Parameter 1: Simple field assignments (field="value")
- Parameter 2: Complex mappings using dot notation
- Invalid field names or syntax cause mapping failures

### ⚠️ Cleanup Process
- Deletes UpdateEmployeeInfo documents when source is deleted
- Removes orphaned documents not matching current lines
- Ensures synchronization between workplace updates and employee updates

### ⚠️ Data Consistency
- Generated documents maintain audit trail through fromDoc field
- Links back to original WorkPlaceUpdate document
- Preserves document relationships for tracking

### ⚠️ Error Handling
- Failures accumulate in result but don't stop processing
- Each line processed independently
- Review error messages for individual line failures

### ⚠️ Performance Considerations
- Processes all lines sequentially
- Large workplace updates may take time
- Each line requires database queries and commits

### ⚠️ Business Impact
- Generated UpdateEmployeeInfo documents affect employee records
- Changes become effective on specified dates
- May trigger additional HR workflows and approvals

**Module:** hr

**Full Class Name:** `com.namasoft.modules.humanresource.utils.actions.EAOyoonWorkPlaceUpdateToUpdateInfo`


</div>

