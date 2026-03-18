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

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EARecalcFreeLinesUnitPriceIfZero`

**Document Type:** Sales Documents Only

**Processing Scope:** Free lines with zero unit prices only


</div>

