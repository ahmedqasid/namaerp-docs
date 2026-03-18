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

**Module:** hr

**Full Class Name:** `com.namasoft.modules.humanresource.utils.actions.EASalaryCostCalculator`


</div>