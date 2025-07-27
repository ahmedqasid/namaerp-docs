---
title: EACopySalaryStructureToJobOffer
module: hr
---


<div class='entity-flows'>

# EACopySalaryStructureToJobOffer

**This document was generated using Claude.ai**

## Overview

Copies salary structure element lines to job offers, adding only new component types that don't already exist in the job offer. Automatically populates job offer salary components based on predefined salary structure templates.

## When This Action Runs

Manual execution during job offer creation or modification when you need to apply a standard salary structure template to the offer. Typically used to streamline job offer preparation by applying consistent salary component definitions.

## How It Works

1. **Validates salary structure** - Checks if the job offer has an associated salary structure
2. **Identifies new components** - Finds salary structure elements not already present in the job offer
3. **Manages editing state** - Starts editing mode if the job offer isn't currently in draft
4. **Creates offer elements** - Copies component type, values, formulas, and criteria from salary structure
5. **Transfers all properties** - Copies calculation formulas, values, criteria definitions, dates, calendars, and issuance settings
6. **Commits changes** - Saves the job offer if editing was initiated by the action

## Parameters

**No Parameters** - This action does not require any input parameters

## Database Tables Affected

- **JobOffer** - May transition to editing mode and gets committed after element addition
- **OfferElementLine** - New lines created with copied salary component data
- **SalaryStructure** - Source for element line data (read-only)
- **SalaryElementLine** - Source elements that get copied (read-only)

## Important Warnings

### ⚠️ Salary Structure Dependency
- Job offer must have an associated salary structure for action to work
- No salary structure results in no operation being performed
- Salary structure must contain element lines to copy

### ⚠️ Duplicate Prevention Logic
- Only copies component types that don't already exist in the job offer
- Existing components with the same type are preserved and not overwritten
- Component type matching is used to determine duplicates

### ⚠️ Editing State Management
- Automatically starts editing mode if job offer is not in draft state
- Commits changes automatically if editing was initiated by the action
- May leave job offer in editing state if it was already being edited

### ⚠️ Complete Data Transfer
- Copies all relevant properties including formulas, values, criteria, dates
- Calculation formulas are transferred as-is from salary structure
- Date ranges and calendar settings are preserved from source

### ⚠️ Component Properties Copied
- **Component Type** - The salary component category/code
- **Component Value** - Base monetary or percentage value
- **Calculation Formula** - Mathematical formulas for dynamic calculation
- **Criteria Definition** - Conditions that determine when component applies
- **Date Ranges** - From and to dates for component validity
- **HR Calendar** - Associated calendar for time-based calculations
- **Issuance Settings** - Configuration for how component is issued/applied

### ⚠️ Business Logic Impact
- Job offer salary calculations will include all copied components
- New components may affect total compensation calculations
- Consider impact on job offer approval workflows

### ⚠️ Template Consistency
- Ensures job offers follow standardized salary structure templates
- Helps maintain consistency across similar job offers
- Reduces manual data entry errors in job offer creation

### ⚠️ Incremental Addition
- Designed for incremental updates to existing job offers
- Won't replace existing salary components, only adds missing ones
- Useful for applying updated salary structure templates to existing offers

### ⚠️ Error Handling
- Returns accumulating result that captures any errors during processing
- Failed editing or commit operations are included in result
- Partial success is possible if some operations succeed

**Module:** hr

**Full Class Name:** `com.namasoft.modules.humanresource.utils.actions.EACopySalaryStructureToJobOffer`


</div>

