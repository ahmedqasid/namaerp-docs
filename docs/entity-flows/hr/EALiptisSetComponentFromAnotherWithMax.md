---
title: EALiptisSetComponentFromAnotherWithMax
module: hr
---


<div class='entity-flows'>

# EALiptisSetComponentFromAnotherWithMax

**This document was generated using Claude.ai**

## Overview

Sets a target salary component value based on the total of other components, with a maximum limit from the component's original value. Calculates the sum of specified salary components and applies it to the target component, ensuring it doesn't exceed the original configured amount.

## When This Action Runs

Manual execution during salary processing when you need to set a component value based on other components' totals. Typically used for calculating allowances, bonuses, or deductions that depend on other salary elements but have maximum limits.

## How It Works

1. **Validates parameters** - Ensures both required parameters are provided
2. **Parses component list** - Converts CSV parameter into list of component codes to sum
3. **Calculates total** - Sums additions minus deductions for all specified components
4. **Finds target component** - Locates the salary line with the target component code
5. **Applies maximum limit** - Sets value to the lesser of calculated total or original value
6. **Handles zero totals** - Uses original value if calculated total is zero
7. **Updates calculations** - Recalculates addition/deduction amounts and salary totals

## Parameters

**Parameter 1:** Target Component Type (Required) - Code of the salary component to update
**Parameter 2:** Components To Normalize (Required) - Comma-separated list of component codes to sum (e.g., "basic,insurance")

## Database Tables Affected

- **SalaryDocumentLine** - Updates base value for the target component
- **SalaryDocument** - Updates total calculations after component modification

## Important Warnings

### ⚠️ Maximum Value Limitation
- Target component value is capped at its original configured value
- Calculated total cannot exceed the component's original amount
- Ensures compliance with predefined salary component limits

### ⚠️ Required Parameters
- Both parameters are mandatory for action execution
- Missing parameters cause action failure
- Validate parameter values before running

### ⚠️ Component Code Matching
- Component codes must match exactly (case-sensitive)
- Invalid component codes are ignored in calculations
- Target component must exist in salary document

### ⚠️ Calculation Logic
- Sums (addition - deduction) for each specified component
- Only includes components with valid component types
- Missing or null components are treated as zero value

### ⚠️ Absolute Value Usage
- Uses absolute value of calculated total before comparison
- Negative totals are converted to positive values
- Ensures proper handling of deduction-heavy calculations

### ⚠️ Zero Total Handling
- If calculated total is zero, uses component's original value
- Prevents component from being zeroed out unintentionally
- Maintains minimum component values when no source components exist

### ⚠️ CSV Format Requirements
- Component list must be properly formatted CSV
- No spaces around commas unless intended as part of code
- Empty strings in CSV are ignored

### ⚠️ Component Type Dependencies
- Requires components to have associated component types
- Components without types are excluded from calculations
- Verify component type configuration before use

### ⚠️ Business Logic Impact
- Changes affect total salary calculations
- May impact tax calculations and net salary
- Consider downstream effects on payroll processing

### ⚠️ Original Value Preservation
- Original component values are not modified
- Only base value is updated, preserving configuration
- Allows for recalculation with different parameters

### ⚠️ Update Sequence
- Component update triggers full salary recalculation
- Addition/deduction amounts are recalculated
- Total updates occur after component modification

**Module:** hr

**Full Class Name:** `com.namasoft.modules.humanresource.utils.clientscripts.EALiptisSetComponentFromAnotherWithMax`


</div>

