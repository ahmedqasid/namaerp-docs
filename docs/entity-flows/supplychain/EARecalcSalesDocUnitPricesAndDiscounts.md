---
title: EARecalcSalesDocUnitPricesAndDiscounts
module: supplychain
---


<div class='entity-flows'>

# EARecalcSalesDocUnitPricesAndDiscounts

**This document was generated using Claude.ai**

## Overview

Performs complete recalculation of both unit prices and discount calculations for all lines in sales documents. Triggers the document's comprehensive pricing logic to update unit prices, discount amounts, percentages, and all related calculations based on current price lists, customer agreements, discount rules, and promotional offers.

## When This Action Runs

Manual execution on sales documents when both pricing and discount information need to be completely refreshed, typically after major price list updates, customer agreement changes, discount rule modifications, or when comprehensive pricing corrections are needed.

## How It Works

1. **Triggers complete recalculation** - Calls document's recalculatePricesAndDiscounts method
2. **Updates unit prices** - Refreshes all price-related fields using current pricing rules (recalcPrices=true)
3. **Updates discounts** - Recalculates all discount amounts and percentages (recalcDiscounts=true)
4. **Applies current rules** - Uses current price lists, customer agreements, discount structures, and promotions
5. **Maintains consistency** - Ensures all pricing and discount calculations are accurate and synchronized
6. **Returns success** - Always completes successfully regardless of changes made

## Parameters

This action does not require any parameters - it automatically recalculates all prices and discounts in the document.

## Database Tables Affected

- **Sales Document Lines** - Updates unit prices, discount amounts, percentages, and extended amounts
- **Customer Price Lists** - Reads current pricing information (read-only)
- **Customer Discount Rules** - Reads current discount structures (read-only)
- **Item Master Data** - Uses standard sales prices (read-only)
- **Promotional Discounts** - Applies active promotions and special offers (read-only)
- **Volume Discount Breaks** - Uses quantity-based discount tiers (read-only)

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EARecalcSalesDocUnitPricesAndDiscounts`

**Document Type:** Sales Documents Only

**Calculation Scope:** Complete pricing and discount recalculation


</div>

