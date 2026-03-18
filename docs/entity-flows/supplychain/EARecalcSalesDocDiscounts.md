---
title: EARecalcSalesDocDiscounts
module: supplychain
---


<div class='entity-flows'>

# EARecalcSalesDocDiscounts

**This document was generated using Claude.ai**

## Overview

Recalculates discount amounts and percentages for all lines in sales documents without changing unit prices. Triggers the document's standard discount recalculation logic to update line discounts, volume discounts, promotional discounts, and document-level discount calculations based on current discount rules and customer agreements.

## When This Action Runs

Manual execution on sales documents when discount calculations need to be refreshed, typically after discount rule changes, promotional updates, customer agreement modifications, or when discount amounts appear incorrect.

## How It Works

1. **Triggers discount recalculation** - Calls document's recalculatePricesAndDiscounts method
2. **Preserves unit prices** - Recalculation parameters ensure prices remain unchanged (recalcPrices=false)
3. **Updates discount calculations** - Refreshes all discount-related fields (recalcDiscounts=true)
4. **Applies current rules** - Uses current discount structures, volume breaks, and promotional offers
5. **Maintains consistency** - Ensures all discount calculations are accurate and synchronized
6. **Returns success** - Always completes successfully regardless of discount changes

## Parameters

This action does not require any parameters - it automatically recalculates all discounts in the document.

## Database Tables Affected

- **Sales Document Lines** - Updates discount amounts, percentages, and net amounts
- **Customer Discount Rules** - Reads current discount structures (read-only)
- **Promotional Discounts** - Applies active promotions and special offers (read-only)
- **Volume Discount Breaks** - Uses quantity-based discount tiers (read-only)

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EARecalcSalesDocDiscounts`

**Document Type:** Sales Documents Only

**Calculation Scope:** Discounts only (prices unchanged)


</div>

