---
title: EARecalcSalesDocUnitPrices
module: supplychain
---


<div class='entity-flows'>

# EARecalcSalesDocUnitPrices

**This document was generated using Claude.ai**

## Overview

Recalculates unit prices for all lines in sales documents without changing discount calculations. Triggers the document's standard price recalculation logic to update unit prices based on current price lists, customer agreements, and system pricing rules while preserving existing discount amounts and percentages.

## When This Action Runs

Manual execution on sales documents when unit prices need to be refreshed with current pricing information, typically after price list updates, customer agreement changes, or when sales prices appear outdated but discounts should remain unchanged.

## How It Works

1. **Triggers price recalculation** - Calls document's recalculatePricesAndDiscounts method
2. **Updates unit prices** - Refreshes all price-related fields (recalcPrices=true)
3. **Preserves discounts** - Recalculation parameters ensure discounts remain unchanged (recalcDiscounts=false)
4. **Applies current pricing** - Uses current price lists, customer agreements, and promotional pricing
5. **Maintains consistency** - Ensures all price calculations are accurate and synchronized
6. **Returns success** - Always completes successfully regardless of price changes

## Parameters

This action does not require any parameters - it automatically recalculates all unit prices in the document.

## Database Tables Affected

- **Sales Document Lines** - Updates unit prices and extended amounts
- **Customer Price Lists** - Reads current pricing information (read-only) 
- **Item Master Data** - Uses standard sales prices (read-only)
- **Customer Agreements** - Applies contract pricing when applicable (read-only)

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EARecalcSalesDocUnitPrices`

**Document Type:** Sales Documents Only

**Calculation Scope:** Unit prices only (discounts unchanged)


</div>

