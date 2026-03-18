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

**Module:** hr

**Full Class Name:** `com.namasoft.modules.humanresource.utils.actions.EACalComponentFromLoan`


</div>