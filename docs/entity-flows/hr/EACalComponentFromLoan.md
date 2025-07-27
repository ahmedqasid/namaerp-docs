---
title: EACalComponentFromLoan
module: hr
---


<div class='entity-flows'>

# EACalComponentFromLoan

**This document was generated using Claude.ai**

## Overview

Calculates salary component values based on loan installment payments. Applies percentage calculations to paid loan installments and updates the specified salary component with the calculated amount.

## When This Action Runs

Manual execution during salary processing to calculate loan-related salary components such as loan administration fees, processing charges, or commission-based components derived from employee loan payments.

## How It Works

1. **Retrieves loan installments** - Gets all paid installment lines from the salary document
2. **Finds target component** - Locates the salary line with the specified component code
3. **Filters by loan types** - Optionally filters installments by specified loan type codes
4. **Calculates percentage** - Applies percentage to each paid installment amount
5. **Determines percentage source** - Uses fixed percentage value or reads percentage from loan document field
6. **Updates component values** - Sets base value, original value, and resets indicator value
7. **Recalculates totals** - Updates salary totals after component modification

## Parameters

**Parameter 1:** Component Code (Required) - Code of the salary component to update with calculated value
**Parameter 2:** Loan Type Code (Optional) - Comma-separated list of loan type codes to include in calculation (empty = all types)
**Parameter 3:** Percentage (Required) - Fixed percentage value or field ID in loan document containing percentage

## Database Tables Affected

- **SalaryDocumentLine** - Updates base value, original value, and indicator value for target component
- **PaidInstallmentLine** - Reads paid loan installment amounts for calculation
- **SalaryDocument** - Updates salary totals after component calculation

## Important Warnings

### ⚠️ Component Existence Requirements
- Target salary component must exist in the salary document lines
- Component code must match exactly (case-sensitive)
- Missing components cause action to exit without processing

### ⚠️ Loan Type Filtering
- Empty loan type parameter includes all loan types in calculation
- Loan type codes must match exactly for filtering
- Invalid loan type codes are ignored in filtering

### ⚠️ Percentage Calculation Logic
- Parameter 3 can be either a fixed percentage value or a field ID
- Fixed percentage values are parsed as decimal numbers
- Field IDs reference fields in the loan document containing percentage values
- Invalid field references may cause calculation errors

### ⚠️ Paid Installment Dependencies
- Only processes paid installments linked to the salary document
- Installments must have valid loan document references for type filtering
- Missing loan document data may exclude installments from calculation

### ⚠️ Component Value Updates
- Completely replaces existing component values with calculated amounts
- Sets indicator value to zero, potentially affecting other calculations
- Original component configuration may be lost

### ⚠️ Calculation Accuracy
- Percentage calculations are applied to each installment individually
- Totalization occurs after individual percentage calculations
- Rounding may occur during percentage calculations

### ⚠️ Business Logic Impact
- Component updates trigger full salary recalculation
- Changes affect addition/deduction calculations and salary totals
- May impact tax calculations and other dependent components

### ⚠️ Field Reference Format
- Field IDs must use proper format (e.g., "fieldName" or "collection.fieldName")
- Field references are case-sensitive
- Invalid field references cause runtime errors

**Module:** hr

**Full Class Name:** `com.namasoft.modules.humanresource.utils.actions.EACalComponentFromLoan`


</div>

