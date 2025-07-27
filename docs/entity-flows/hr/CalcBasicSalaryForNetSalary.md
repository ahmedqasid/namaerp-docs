---
title: CalcBasicSalaryForNetSalary
module: hr
---


<div class='entity-flows'>

# CalcBasicSalaryForNetSalary

**This document was generated using Claude.ai**

## Overview

Reverse-calculates the basic salary component needed to achieve a desired net salary amount. Uses iterative calculations to determine the basic salary that, after all deductions and additions, results in the target net salary.

## When This Action Runs

Manual execution when determining basic salary components to achieve specific net salary targets, typically used for contract negotiations or salary planning where the net amount is fixed.

## How It Works

1. **Validates target amount** - Checks that required net salary (N1) is specified and non-zero
2. **Adjusts for additional amount** - Subtracts N2 value from target net to get working target
3. **Initializes iteration** - Sets first salary line base value to the working target amount
4. **Iterative calculation** - Repeatedly calculates salary with current basic amount
5. **Adjusts basic salary** - Modifies basic component based on difference between actual and target net
6. **Convergence check** - Continues until difference is within acceptable threshold or max trials reached
7. **Sets result** - Stores final calculated basic salary plus N2 in N3 field

## Parameters

**Parameter 1:** Max Number of Trials (Optional) - Maximum iterations for convergence (default: 25)
**Parameter 2:** Minimum Accepted Difference (Optional) - Acceptable difference between target and actual net salary (default: 0.01)

## Field Usage

- **N1** - Target net salary amount (required input)
- **N2** - Additional amount to subtract from target before calculation
- **N3** - Final calculated total salary (output: basic salary + N2)

## Database Tables Affected

- **SalaryDocumentLine** - Updates base value and original value for the first salary line (basic component)
- **SalaryDocument** - Reads employee, period, and date information for salary calculations
- **Employee Attendance Data** - Accessed during salary calculation iterations

## Important Warnings

### ⚠️ Target Amount Requirements
- N1 field must contain the desired net salary amount
- Zero or empty N1 values cause action to exit without processing
- N2 value is subtracted from N1 to determine working target

### ⚠️ Iterative Convergence
- Uses trial-and-error approach to find appropriate basic salary
- May not converge within maximum trials for complex salary structures
- Default maximum of 25 trials may be insufficient for some configurations

### ⚠️ First Salary Line Dependency
- Assumes first salary line represents the basic salary component
- Modifies both base value and original value of the first line
- Salary document must have at least one salary line for processing

### ⚠️ Calculation Complexity
- Each iteration performs full salary calculation including taxes and deductions
- Attendance data is recalculated for each iteration
- Complex salary rules may cause convergence issues

### ⚠️ Precision Limitations
- Default accepted difference is 0.01 currency units
- Very precise net salary targets may not be achievable
- Rounding in tax calculations may prevent exact convergence

### ⚠️ Configuration Dependencies
- Relies on HR module configuration for attendance calculation settings
- Salary calculation rules must be properly configured
- Changes in tax rates or deduction rules affect convergence

### ⚠️ Performance Considerations
- Multiple iterations with full salary calculations can be time-consuming
- Large maximum trial values may cause performance issues
- Consider optimizing salary calculation complexity for better performance

### ⚠️ Business Logic Impact
- Modifies basic salary component which affects all subsequent calculations
- May produce unrealistic basic salary amounts for certain target nets
- Consider business constraints on minimum/maximum basic salary levels

**Module:** hr

**Full Class Name:** `com.namasoft.modules.humanresource.utils.CalcBasicSalaryForNetSalary`

**Reference:** Related to ticket ECDRQ00114 for specific implementation requirements


</div>

