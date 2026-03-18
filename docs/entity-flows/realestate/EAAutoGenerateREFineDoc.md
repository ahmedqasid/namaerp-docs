---
title: EAAutoGenerateREFineDoc
module: realestate
---


<div class='entity-flows'>

# EAAutoGenerateREFineDoc

**This document was generated using Claude.ai**

## Overview

Automatically generates fine documents for overdue real estate payments. Finds committed contracts with unpaid installments past their due dates (considering grace periods) and creates or updates fine documents with calculated penalties based on late days and configured fine rates.

## When This Action Runs

Manual execution or scheduled batch processing for penalty calculation. Typically used monthly to generate fines for overdue rental payments, sales installments, and other real estate payment obligations that have exceeded their grace periods.

## How It Works

1. **Parses fine parameters** - Extracts fine calculation settings from parameters
2. **Identifies contract types** - Determines which contract types to process (default: all real estate contracts)
3. **Finds overdue payments** - Queries for committed contracts with unpaid amounts past due date minus grace period
4. **Fetches existing fines** - Retrieves previously generated fines for the current month to update or replace
5. **Processes each contract** - Creates or updates fine documents in separate transactions
6. **Calculates penalties** - Computes fine amounts based on late days, rates, and outstanding amounts
7. **Commits fine documents** - Saves new fine documents with proper references and dimensions
8. **Cleans up old fines** - Deletes previously generated fines that are no longer needed

## Parameters

**Parameter 1:** Fields Map (Required) - Field mapping for fine document creation (e.g., book="RF1", term="RFINE")

**Parameter 2:** Grace Period (Optional) - Number of days after due date before fines apply (default: 0)

**Parameter 3:** Add Grace Period To Fine (Optional) - true/false to include grace period in late days calculation (default: false)

**Parameter 4:** Fine Is Value Not Percent (Optional) - true for fixed amount, false for percentage (default: false)

**Parameter 5:** Fine Per (Required) - Time unit for fine calculation: "year", "month", or "day"

**Parameter 6:** Fine Percent/Value (Required) - Fine rate as percentage or fixed amount

**Parameter 7:** Fine Calculation Query (Optional) - Custom SQL query for complex fine calculations

**Parameter 8:** Contracts To Search In CSV (Optional) - Comma-separated contract types to process

## Default Contract Types

- **RESalesDoc** - Real estate sales documents
- **REOpeningSales** - Opening sales documents  
- **RERentContract** - Rental contracts
- **REOpeningRentContract** - Opening rental contracts

## Fine Calculation Logic

Fine = Base Amount × Rate × Time Factor

Where:
- **Base Amount**: Outstanding payment amount (or fixed value if configured)
- **Rate**: Fine percentage or fixed amount from parameter 6
- **Time Factor**: Late days adjusted by fine period (day=1, month=days/30, year=days/360)

## Custom Query Variables

Custom fine calculation queries can use these variables:
- `{finePercent}` - Fine percentage rate
- `{lateDays}` - Number of days payment is overdue
- `{contract.fieldName}` - Any field from the contract entity

## Database Tables Affected

- **REFineDoc** - Creates or updates fine documents
- **FineInstallmentLine** - Creates detail lines for each overdue installment
- **Contract Tables** - Reads payment details from various contract types (read-only)
- **Payment Lines** - References overdue installments (read-only)

**Module:** realestate

**Full Class Name:** `com.namasoft.modules.realstate.domain.utils.plugnplay.EAAutoGenerateREFineDoc`


</div>