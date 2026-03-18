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

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EARecalculateAdditionalCost`

**Document Type:** Assembly Documents Only

**Related Utilities:** AssemblyDocumentUtilities for expense calculations


</div>

