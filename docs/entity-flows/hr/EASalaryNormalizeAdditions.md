---
title: EASalaryNormalizeAdditions
module: hr
---


<div class='entity-flows'>

# EASalaryNormalizeAdditions

**This document was generated using Claude.ai**

## Overview

Adjusts salary components when total deductions exceed additions, preventing negative net salary situations. Modifies the target component's base value to balance the salary calculation and ensure non-negative results.

## When This Action Runs

Manual execution during salary processing when deductions outweigh additions, typically used to prevent negative salary situations by adjusting components like basic salary or allowances.

## How It Works

1. **Calculates net total** - Computes the sum of (additions - deductions) for specified component types
2. **Checks for negative balance** - Determines if deductions exceed additions (negative total)
3. **Finds target component** - Locates the salary line with the specified target component type
4. **Adjusts base value** - Sets the target component's base value to the minimum of the deficit absolute value and original value
5. **Updates calculations** - Recalculates addition/deduction amounts and salary totals
6. **Refreshes totals** - Updates overall salary document totals after normalization

## Parameters

**Parameter 1:** Target Component Type (Required) - Code of the salary component to adjust (e.g., "basic", "allowance")

**Parameter 2:** Components To Normalize (Required) - Comma-separated list of component type codes to include in balance calculation

## Database Tables Affected

- **SalaryDocumentLine** - Updates base value and recalculates addition/deduction amounts for target component
- **SalaryDocument** - Updates total amounts after component normalization

**Module:** hr

**Full Class Name:** `com.namasoft.modules.humanresource.utils.clientscripts.EASalaryNormalizeAdditions`

**Related Actions:**
- [EASalaryNormalizeDeductions](EASalaryNormalizeDeductions.md) - Normalizes salary components for positive balance situations


</div>