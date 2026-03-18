---
title: EASalaryNormalizeDeductions
module: hr
---


<div class='entity-flows'>

# EASalaryNormalizeDeductions

**This document was generated using Claude.ai**

## Overview

Adjusts salary components when total additions exceed deductions, ensuring balanced salary calculations. Modifies the target component's base value when there is a positive surplus in the salary calculation.

## When This Action Runs

Manual execution during salary processing when additions outweigh deductions, typically used to normalize salary components and maintain calculated balance by adjusting elements like overtime or bonus components.

## How It Works

1. **Calculates net total** - Computes the sum of (additions - deductions) for specified component types
2. **Checks for positive balance** - Determines if additions exceed deductions (positive total)
3. **Finds target component** - Locates the salary line with the specified target component type
4. **Adjusts base value** - Sets the target component's base value to the minimum of the surplus amount and original value
5. **Updates calculations** - Recalculates addition/deduction amounts and salary totals
6. **Refreshes totals** - Updates overall salary document totals after normalization

## Parameters

**Parameter 1:** Target Component Type (Required) - Code of the salary component to adjust (e.g., "overtime", "bonus")

**Parameter 2:** Components To Normalize (Required) - Comma-separated list of component type codes to include in balance calculation

## Database Tables Affected

- **SalaryDocumentLine** - Updates base value and recalculates addition/deduction amounts for target component
- **SalaryDocument** - Updates total amounts after component normalization

**Module:** hr

**Full Class Name:** `com.namasoft.modules.humanresource.utils.clientscripts.EASalaryNormalizeDeductions`

**Related Actions:**
- [EASalaryNormalizeAdditions](EASalaryNormalizeAdditions.md) - Normalizes salary components for negative balance situations


</div>