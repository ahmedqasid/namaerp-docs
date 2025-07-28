---
title: EAHealthInsuranceOfferReqAction
module: hr
---


<div class='entity-flows'>

# EAHealthInsuranceOfferReqAction

**This document was generated using Claude.ai**

## Overview

Automatically generates health insurance request lines for employees and their eligible dependents. Creates detailed insurance coverage entries based on employee data and dependent information, including age calculations and relationship details.

## When This Action Runs

Executes before committing a health insurance offer request document. Typically triggered during the save process to automatically populate insurance coverage lines for employees and their family members marked for medical insurance.

## How It Works

1. **Checks commit status** - Exits if document is already in the process of committing
2. **Processes employee lines** - Iterates through existing request lines for employees
3. **Creates employee entry** - Generates primary insurance line with employee details including age, gender, nationality
4. **Identifies eligible dependents** - Finds attendants marked for medical insurance coverage
5. **Creates dependent entries** - Generates insurance lines for each eligible family member
6. **Calculates ages** - Computes age in years for all covered individuals
7. **Determines gender** - Infers gender based on relationship type for dependents
8. **Links records** - Associates dependent entries with employee entries using master row ID
9. **Replaces original lines** - Clears and replaces document lines with expanded entries

## Parameters

**No Parameters** - This action does not require any input parameters

## Database Tables Affected

- **HealthInsuranceOfferRequest** - Updates detail lines collection and commit status flag
- **HealthInsOffReqLine** - Creates new lines for employees and dependents
- **Employee** - Reads employee personal data and attendants (read-only)
- **AttendantLine** - References dependent information for insurance eligibility

## Important Warnings

### ⚠️ Data Replacement Warning
- **Completely replaces existing detail lines** with newly generated entries
- Original manual entries are cleared and cannot be recovered
- Only preserves lines with master row ID on committed documents

### ⚠️ Dependent Eligibility
- Only includes attendants where `IsMedEnsuranceApplyTo` is set to true
- Dependents not marked for medical insurance are excluded
- Review attendant records before running to ensure correct coverage

### ⚠️ Age Calculation Logic
- Ages calculated as complete years from birth date to current date
- Missing birth dates result in null age values
- Age accuracy depends on correct birth date information

### ⚠️ Gender Determination
- Gender inferred from relationship type for dependents:
  - Female: Mother, Daughter, Sister, Wife
  - Male: All other relationship types
- May not be accurate for all relationship types

### ⚠️ Required Employee Data
- Employee must have complete personal information:
  - Birth date for age calculation
  - Gender information
  - Nationality details
  - Residency information (if applicable)
- Missing data results in incomplete insurance lines

### ⚠️ Commit Flag Management
- Sets `systemIsCommiting` flag to prevent recursive execution
- Flag prevents action from running multiple times
- Ensures action only executes once per commit cycle

### ⚠️ Residency ID Handling
- Uses employee residency number for labor ID field
- Attendants get residency ID from their own records
- Missing residency information may affect insurance processing

### ⚠️ Master-Detail Relationship
- Employee lines have null master row ID
- Dependent lines reference employee line ID as master
- Maintains hierarchical relationship for insurance grouping

### ⚠️ Insurance Category Inheritance
- All generated lines inherit insurance category from original request line
- Same category applied to employee and all dependents
- Cannot have different categories for family members

### ⚠️ Performance Considerations
- Processes all employees and dependents in single execution
- Large employee counts with many dependents may impact performance
- No batching or pagination implemented

### ⚠️ Data Validation
- No validation of generated data completeness
- Missing required fields may cause issues during insurance processing
- Review generated lines before final submission

**Module:** hr

**Full Class Name:** `com.namasoft.modules.humanresource.utils.actions.EAHealthInsuranceOfferReqAction`


</div>

