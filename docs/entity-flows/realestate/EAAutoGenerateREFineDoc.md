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

## Important Warnings

### ⚠️ Grace Period Logic
- Grace period subtracts days from due date comparison
- Add grace period to fine determines if grace days count toward penalty calculation
- May cause confusion if both settings don't align with business rules

### ⚠️ Fine Calculation Complexity
- Different calculation methods: percentage vs. fixed amount
- Time factor adjustments based on period (day/month/year)
- Custom queries can override standard calculation logic

### ⚠️ Transaction Processing
- Each contract processed in separate transaction
- Failed transactions don't affect other contracts
- Exception handling may leave some fines unprocessed

### ⚠️ Existing Fine Handling
- Finds and updates existing fines for current month
- Old fine documents are deleted after new ones are created
- Timing issues may cause temporary duplicate fines

### ⚠️ Contract Type Flexibility
- Default processes all major real estate contract types
- Custom contract type lists must use exact entity type names
- Invalid contract types cause processing failures

### ⚠️ Field Mapping Requirements
- Parameter 1 must contain valid field mappings
- Book and term fields typically required for fine documents
- Invalid field references cause document creation failures

### ⚠️ Date Range Processing
- Only processes fines within current month date range
- Existing fines outside current month remain unchanged
- Monthly processing assumptions may not fit all business needs

### ⚠️ Outstanding Amount Dependencies
- Relies on accurate remaining payment calculations
- Zero remaining amounts skip fine generation
- Payment system integration affects fine accuracy

### ⚠️ Custom Query Risks
- Custom calculation queries can override all standard logic
- SQL injection risks if query templates not properly validated
- Complex queries may impact performance significantly

### ⚠️ Dimension and Reference Copying
- Copies dimensions from source contracts to fine documents
- References buyer, owner, and estate information from original contracts
- Missing reference data may cause incomplete fine documents

### ⚠️ Code Generation Dependencies
- Fine documents require proper book configuration for code generation
- Entity mediator handles code assignment based on book settings
- Code conflicts may prevent fine document creation

### ⚠️ Business Rule Validation
- No validation that fines comply with legal or contract limits
- May generate fines for contracts with special payment arrangements
- Consider business rule engine integration for complex scenarios

### ⚠️ Performance Considerations
- Queries multiple contract types for overdue payments
- Processes contracts sequentially, not in parallel
- Large numbers of overdue contracts may cause timeout issues

### ⚠️ Error Accumulation
- Uses accumulating result pattern for error collection
- Multiple validation and processing errors collected together
- Failed fine generation doesn't stop processing of other contracts

### ⚠️ System-Generated Flag
- All generated fines marked with generatedFromSystem flag
- Distinguishes automated fines from manually created ones
- May affect reporting and business process workflows

**Module:** realestate

**Full Class Name:** `com.namasoft.modules.realstate.domain.utils.plugnplay.EAAutoGenerateREFineDoc`


</div>