---
title: EARecalculateAdditionalCost
module: supplychain
---


<div class='entity-flows'>

# EARecalculateAdditionalCost

**This document was generated using Claude.ai**

## Overview

Recalculates additional costs and expense item lines for assembly documents by triggering the standard expense calculation logic. Updates cost allocations, overhead distributions, and expense line amounts based on current assembly configuration and cost calculation rules.

## When This Action Runs

Manual execution on assembly documents when additional costs need to be recalculated, typically after changes to assembly configuration, cost structures, expense rates, or when expense calculations appear incorrect.

## How It Works

1. **Invokes expense calculation** - Calls AssemblyDocumentUtilities.calcExpenseItemLines() method
2. **Processes assembly structure** - Analyzes current assembly document configuration
3. **Calculates expense allocations** - Distributes additional costs across assembly components
4. **Updates expense lines** - Refreshes expense item lines with calculated amounts
5. **Applies cost rules** - Uses current cost calculation and overhead distribution rules
6. **Returns success** - Always completes successfully after calculation

## Parameters

This action does not require any parameters - it automatically recalculates all additional costs in the assembly document.

## Database Tables Affected

- **Assembly Document Lines** - Updates expense item lines and cost allocations
- **Assembly Configuration** - Reads current assembly structure (read-only)
- **Cost Center Data** - Uses overhead and expense rate information (read-only)
- **Expense Item Masters** - References expense item definitions (read-only)

## Important Warnings

### ⚠️ Document Type Requirements
- Only works on AssemblyDocument types
- Other document types are not supported
- Document must have valid assembly configuration
- Requires proper expense item setup and cost center configuration

### ⚠️ Assembly Structure Dependencies
- Uses current assembly document structure for calculations
- Requires valid assembly configuration with components
- Assembly must have proper cost allocation setup
- Changes to assembly structure affect expense calculations

### ⚠️ Expense Calculation Logic
- Uses AssemblyDocumentUtilities for standard expense calculations
- Applies current cost center rates and overhead allocations
- May distribute costs across multiple assembly components
- Calculation results depend on current system configuration

### ⚠️ Cost Center and Rate Dependencies
- Requires valid cost center configuration
- Uses current expense rates and overhead percentages
- May apply different rates based on assembly type or configuration
- Ensure cost center data is current and accurate

### ⚠️ Expense Item Line Impact
- Recalculates all expense item lines in the assembly
- Updates expense amounts and cost allocations
- May affect assembly total costs and pricing
- Changes impact cost accounting and financial reporting

### ⚠️ Assembly Costing Accuracy
- Expense calculations affect total assembly costs
- May impact standard cost updates and variance analysis
- Changes affect inventory valuation for assembled items
- Consider impact on product costing and pricing

### ⚠️ Business Process Considerations
- May change assembly costs affecting pricing decisions
- Could impact approved assembly orders and cost estimates
- Consider impact on manufacturing cost analysis
- Document changes for cost accounting and audit purposes

### ⚠️ System Configuration Dependencies
- Relies on proper expense item and cost center setup
- Uses system-wide cost calculation rules and formulas
- May require configuration of overhead allocation methods
- Ensure expense calculation parameters are properly configured

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EARecalculateAdditionalCost`

**Document Type:** Assembly Documents Only

**Related Utilities:** AssemblyDocumentUtilities for expense calculations


</div>

