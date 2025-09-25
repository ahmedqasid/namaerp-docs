---
title: EAGenSalarySheet
module: hr
---

<div class='entity-flows'>

# EAGenSalarySheet

**This document was generated using Claude.ai**

## Overview

**Description:** This entity flow generates salary sheet lines for employees based on specified criteria. It processes employee records to create detailed salary calculations including additions, deductions, and net salary amounts. This is typically used for monthly payroll processing or salary sheet regeneration.

**Module:** hr

**Full Class Name:** `com.namasoft.modules.humanresource.contracts.impl.actions.EAGenSalarySheet`

## Parameters

The entity flow requires three parameters to control which salary lines to generate:

1. **Lines to Generate**: Controls which employee lines to include in the salary sheet
2. **ReGenerate Lines With Salaries**: Whether to regenerate lines that already have salary calculations
3. **Generate Lines Without Salaries**: Whether to generate lines for employees without existing salaries

### Parameter Details

| Parameter | Type | Description | Options |
|-----------|------|-------------|---------|
| **Lines to Generate** | Text | Specifies which employee lines to process | `GenerateSelectedLinesOnly`, `GenerateAllLinesExceptSelected`, `GenerateAllLines` |
| **ReGenerate Lines With Salaries** | Boolean | Regenerate existing salary calculations | `true`, `false` |
| **Generate Lines Without Salaries** | Boolean | Create lines for employees without salaries | `true`, `false` (default: `true`) |

## How It Works

::: info Salary Sheet Structure
A salary sheet is a payroll document that contains:
- **Header**: Period, year, calendar, currency, and totals
- **Lines**: Individual employee salary calculations with additions, deductions, and net amounts
- **Components**: Up to 10 configurable salary components per employee
- **Totals**: Aggregated amounts for the entire payroll period
:::

### Processing Flow

1. **Parameter Validation**: System validates the generation criteria and options
2. **Employee Selection**: Based on the "Lines to Generate" parameter:
   - **GenerateAllLines**: Process all eligible employees
   - **GenerateSelectedLinesOnly**: Process only selected employees (must be selected in the UI first)
   - **GenerateAllLinesExceptSelected**: Process all employees except the selected ones
3. **Salary Calculation**: For each employee:
   - Calculate basic salary and allowances (additions)
   - Calculate deductions (taxes, insurance, loans)
   - Calculate other components (bonuses, overtime)
   - Compute net salary amount
4. **Line Creation/Update**: Create or update salary sheet lines with calculated amounts
5. **Totals Update**: Update salary sheet header totals

::: warning Important Processing Notes
- **Transaction Safety**: Each salary calculation is processed in its own database transaction
- **Existing Lines**: Lines with salaries are only regenerated if "ReGenerate Lines With Salaries" is true
- **Missing Employees**: Employees without salaries get lines only if "Generate Lines Without Salaries" is true
- **Background Processing**: Large salary sheets may be processed in the background
:::

## Parameter Options Explained

### Lines to Generate Options

**GenerateAllLines** (Default)
- Processes all eligible employees in the payroll
- Includes both active and inactive employees (based on payroll settings)
- Most commonly used option for regular payroll processing

**GenerateSelectedLinesOnly**
- Processes only employees that were manually selected in the salary sheet UI
- Useful for processing specific employees or corrections
- Requires prior selection of employees in the interface

**GenerateAllLinesExceptSelected**
- Processes all employees except those manually selected
- Useful when you want to exclude certain employees from processing
- Opposite of GenerateSelectedLinesOnly

### Boolean Parameter Examples

**ReGenerate Lines With Salaries = true**
- Recalculates salary amounts for employees who already have salary lines
- Use when salary rules have changed or corrections are needed
- Overwrites existing calculations

**ReGenerate Lines With Salaries = false**
- Skips employees who already have salary calculations
- Faster processing when only adding new employees
- Preserves existing calculations

**Generate Lines Without Salaries = true** (Default)
- Creates salary lines for employees without existing salary calculations
- Standard behavior for initial payroll processing
- Includes all eligible employees

**Generate Lines Without Salaries = false**
- Skips employees who don't have salary calculations
- Used for regeneration scenarios only
- Only processes existing salary lines

## Salary Sheet Components

### What Gets Generated

For each employee, the system calculates and populates:

**Basic Information**
- Employee reference and details
- Working days for the period
- Employment status and department

**Salary Components (10 configurable components)**
- `scomponentValue1` through `scomponentValue10`
- Examples: Basic salary, housing allowance, transportation, overtime, etc.

**Calculated Totals**
- `totalAdditions`: Sum of all positive salary components
- `totalDeduction`: Sum of all deductions (taxes, insurance, loans)
- `totalOther`: Sum of other miscellaneous amounts
- `netSalary`: Final amount payable to employee

</div>