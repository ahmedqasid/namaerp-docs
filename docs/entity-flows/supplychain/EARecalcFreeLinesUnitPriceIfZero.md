---
title: EARecalcFreeLinesUnitPriceIfZero
module: supplychain
---


<div class='entity-flows'>

# EARecalcFreeLinesUnitPriceIfZero

**This document was generated using Claude.ai**

## Overview

Recalculates unit prices for free lines in sales documents when their unit price is zero or empty. Identifies sales lines marked as free items with zero unit prices and triggers the document's standard price recalculation logic to update their pricing based on current item master data and pricing rules.

## When This Action Runs

Manual execution on sales documents where free lines have zero unit prices and need to be updated with current pricing information, typically after price list updates or when free item pricing needs to reflect actual item values for reporting purposes.

## How It Works

1. **Retrieves all sales lines** - Gets the complete list of document lines
2. **Filters for free lines** - Identifies lines where freeLine flag is true
3. **Checks for zero prices** - Further filters to lines with zero or empty unit prices
4. **Triggers recalculation** - If matching lines found, calls document's price recalculation method
5. **Updates pricing** - Applies current pricing rules to recalculate unit prices for filtered lines
6. **Preserves other data** - Only updates pricing while maintaining other line information

## Parameters

This action does not require any parameters - it automatically processes all qualifying free lines.

## Database Tables Affected

- **Sales Document Lines** - Updates unit prices on free lines with zero prices
- **Item Master Data** - Reads current pricing information (read-only)
- **Price Lists** - Uses current pricing rules for calculations (read-only)

## Important Warnings

### ⚠️ Free Line Identification
- Only processes lines explicitly marked as free (freeLine = true)
- Lines must have zero or empty unit prices to be processed
- Regular sales lines are not affected by this action
- Free line flag must be properly set for action to work

### ⚠️ Price Recalculation Scope
- Uses document's standard price recalculation logic
- Applies current pricing rules and price lists
- May update prices, discounts, and related calculations
- Recalculation parameters: recalculate prices=true, quantities=false, discounts=false

### ⚠️ Document Type Requirements
- Only works on SalesDocument types (sales orders, quotations, invoices)
- Other document types are not supported
- Document must have properly configured pricing logic
- Requires access to item master data and price lists

### ⚠️ Pricing Logic Dependencies
- Relies on document's built-in recalculatePricesAndDiscounts method
- Uses current item pricing and customer-specific rules
- May apply volume discounts, promotional pricing, or special rates
- Pricing results depend on current system configuration

### ⚠️ Business Impact Considerations
- Changes free line prices from zero to actual item values
- May affect document totals and tax calculations
- Could impact financial reporting for promotional items
- Consider business rules for free item pricing

### ⚠️ Processing Efficiency
- Skips processing if no qualifying lines are found
- Only recalculates lines that meet both criteria (free + zero price)
- Efficient filtering reduces unnecessary processing
- Always returns success regardless of lines processed

### ⚠️ Price List and Customer Context
- Uses document's customer context for pricing
- Applies customer-specific price lists and discounts
- May result in different prices for different customers
- Ensure pricing context is appropriate for free items

### ⚠️ Timing and Execution Context
- Best executed after price list updates
- Should run before document finalization
- Consider impact on document workflow and approvals
- May affect already-approved documents

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EARecalcFreeLinesUnitPriceIfZero`

**Document Type:** Sales Documents Only

**Processing Scope:** Free lines with zero unit prices only


</div>

