---
title: EASalaryCostCalculator
module: hr
---


<div class='entity-flows'>

# EASalaryCostCalculator

**This document was generated using Claude.ai**

## Overview

Calculates the gross salary required to achieve a specific net salary amount, considering taxes and insurance deductions. Uses iterative calculations to determine the exact gross amount that, after all deductions, results in the desired net salary.

## When This Action Runs

Manual execution for salary planning and budgeting purposes. Typically used when hiring employees with agreed net salaries, or when calculating total employment costs for budgeting.

## How It Works

1. **Reads insurance settings** - Retrieves current insurance rates and limits based on Description1 field
2. **Sets insurance values** - Applies appropriate insurance amounts (maximum, minimum, or zero)
3. **Initializes calculations** - Sets up tax formula, insurance calculators, and starting values
4. **Iterative calculation loop** - Repeatedly calculates gross to net until target is reached:
   - Adds current tax and insurance to get new gross estimate
   - Calculates taxable amount (gross - exemptions - insurance)
   - Computes tax on taxable amount
   - Calculates resulting net (gross - tax - insurance)
5. **Checks convergence** - Continues until difference is within allowed tolerance or max trials reached
6. **Stores results** - Saves calculated gross salary and component breakdowns

## Parameters

**Parameter 1:** Tax Formula Code (Required) - Code of the tax calculation formula to use

**Parameter 2:** Max Trials Count (Optional) - Maximum iterations before stopping (default: 150)

**Parameter 3:** Allowed Diff (Optional) - Acceptable difference from target net salary (default: 0.00001)

## Field Usage

- **N1** - Target net salary (input)
- **N2** - Fixed insurance amount (input/calculated)
- **N3** - Variable insurance amount (input/calculated)
- **N4** - Tax exempted amount (input)
- **N5** - Calculated gross salary (output)
- **Description1** - Insurance type selector ("2" for max, "3" for min, "4" for zero)
- **Description2** - Employee insurance amount (output)
- **Description3** - Company insurance amount (output)
- **Description4** - Tax amount (output)

## Database Tables Affected

- **ComponentCalcFormula** - Reads tax calculation formula (read-only)
- **EmpInsuranceInfo** - Retrieves insurance configuration limits
- **BaseEntity** - Updates calculation results in numeric and text fields

## Important Warnings

### ⚠️ Insurance Type Selection
- Description1 starting with "2" uses maximum insurance limits
- Description1 starting with "3" uses minimum insurance limits
- Description1 starting with "4" sets insurance to zero
- Invalid Description1 values may cause incorrect calculations

### ⚠️ Iterative Convergence
- Uses trial-and-error approach to find correct gross salary
- May not converge within maximum trials for complex scenarios
- Increase max trials parameter if convergence fails

### ⚠️ Precision Settings
- All calculations rounded to 2 decimal places
- Very small allowed differences may never converge due to rounding
- Default allowed difference (0.00001) is very precise

### ⚠️ Required Input Fields
- N1 (target net salary) must be populated
- N4 (tax exemptions) should be set appropriately
- Missing required fields cause calculation errors

### ⚠️ Tax Formula Dependency
- Tax formula code must exist in the system
- Invalid formula codes cause calculation failures
- Formula changes affect all calculations

### ⚠️ Insurance Calculation Rules
- Employee insurance calculated based on N2 and N3 values
- Company insurance calculated separately
- Both insurance types included in cost calculations

### ⚠️ Performance Considerations
- Each iteration performs full tax and insurance calculations
- Complex tax formulas increase calculation time
- Large max trials values may cause delays

### ⚠️ Result Interpretation
- N5 contains the gross salary needed
- Description fields contain component breakdowns
- Total cost = N5 + company insurance (Description3)

### ⚠️ Business Use Cases
- Budget planning for new hires
- Converting net salary agreements to gross
- Calculating total employment costs
- Comparing costs across different insurance scenarios

### ⚠️ Calculation Assumptions
- Uses current date for insurance rate lookups
- Assumes single employee calculation (no family)
- Tax exemptions must be provided separately

### ⚠️ Egypt Tax Specific
- Uses Egyptian tax calculation rules
- Designed for Egyptian insurance system
- May not be applicable for other countries

**Module:** hr

**Full Class Name:** `com.namasoft.modules.humanresource.utils.actions.EASalaryCostCalculator`


</div>