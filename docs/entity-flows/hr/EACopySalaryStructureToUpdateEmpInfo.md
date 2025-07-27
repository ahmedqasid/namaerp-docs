---
title: EACopySalaryStructureToUpdateEmpInfo
module: hr
---


<div class='entity-flows'>

# EACopySalaryStructureToUpdateEmpInfo

**This document was generated using Claude.ai**

## Overview

Copies salary structure element lines to employee update documents, adding only new component types that don't already exist in the target employee information. Automatically applies standard salary structure templates when updating employee compensation packages.

## When This Action Runs

Manual execution during employee information updates when applying new salary structure templates or when employee promotions/transfers require updated compensation components. Typically used to standardize employee salary structures.

## How It Works

1. **Validates salary structure** - Checks if the target employee info (toInfo) has an associated salary structure
2. **Identifies new components** - Finds salary structure elements not already present in the employee update document
3. **Manages editing state** - Starts editing mode if the update document isn't currently in draft
4. **Creates update elements** - Copies component types, values, formulas, and criteria from salary structure
5. **Transfers all properties** - Copies calculation formulas, values, criteria definitions, dates, calendars, and issuance settings
6. **Commits changes** - Saves the employee update document if editing was initiated by the action

## Parameters

**No Parameters** - This action does not require any input parameters

## Database Tables Affected

- **UpdateEmployeeInfo** - May transition to editing mode and gets committed after element addition
- **OfferElementUpdateLine** - New lines created with copied salary component data
- **SalaryStructure** - Source for element line data (read-only)
- **SalaryElementLine** - Source elements that get copied (read-only)

## Important Warnings

### ⚠️ Target Employee Info Dependency
- UpdateEmployeeInfo document must have target employee info (toInfo) configured
- Target employee info must have an associated salary structure
- No salary structure results in no operation being performed

### ⚠️ Duplicate Prevention Logic
- Only copies component types that don't already exist in the target employee info
- Existing components with the same type are preserved and not overwritten
- Component type matching is used to determine duplicates

### ⚠️ Editing State Management
- Automatically starts editing mode if update document is not in draft state
- Commits changes automatically if editing was initiated by the action
- May leave document in editing state if it was already being edited

### ⚠️ Employee Update Context
- Designed for employee information update workflows
- Target employee info represents the desired future state of employee compensation
- Changes affect employee salary structure when update document is processed

### ⚠️ Complete Data Transfer
- Copies all relevant properties including formulas, values, criteria, dates
- Uses the same copying logic as job offer salary structure copying
- Calculation formulas are transferred as-is from salary structure

### ⚠️ Component Properties Copied
- **Component Type** - The salary component category/code
- **Component Value** - Base monetary or percentage value
- **Calculation Formula** - Mathematical formulas for dynamic calculation
- **Criteria Definition** - Conditions that determine when component applies
- **Date Ranges** - From and to dates for component validity
- **HR Calendar** - Associated calendar for time-based calculations
- **Issuance Settings** - Configuration for how component is issued/applied

### ⚠️ Business Logic Impact
- Employee salary calculations will include all copied components when update is applied
- New components may affect total compensation calculations
- Consider impact on payroll processing and employee contracts

### ⚠️ Template Consistency
- Ensures employee updates follow standardized salary structure templates
- Helps maintain consistency across employee compensation packages
- Reduces manual data entry errors in employee information updates

### ⚠️ Incremental Addition
- Designed for incremental updates to existing employee information
- Won't replace existing salary components, only adds missing ones
- Useful for applying updated salary structure templates to employee updates

### ⚠️ Update Document Workflow
- Part of the employee information update process
- Changes are applied to future employee state, not current state
- Update document must be processed/approved to affect actual employee records

### ⚠️ Error Handling
- Returns accumulating result that captures any errors during processing
- Failed editing or commit operations are included in result
- Partial success is possible if some operations succeed

**Module:** hr

**Full Class Name:** `com.namasoft.modules.humanresource.utils.actions.EACopySalaryStructureToUpdateEmpInfo`

**Related Actions:**
- [EACopySalaryStructureToJobOffer](EACopySalaryStructureToJobOffer.md) - Similar functionality for job offers


</div>

