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

## Important Warnings

### ⚠️ Document Type Requirements
- Only works on SalesDocument types (sales orders, quotations, invoices)
- Other document types are not supported
- Document must have valid customer and line item relationships
- Requires access to current discount rules and customer data

### ⚠️ Price Preservation
- Unit prices remain unchanged during recalculation
- Focus is exclusively on discount calculations
- Price-related fields are not modified
- Maintains original pricing while updating discounts

### ⚠️ Discount Rule Dependencies
- Uses current active discount rules and structures
- Applies customer-specific discount agreements
- May include volume breaks, promotional rates, or special pricing
- Discount results depend on current system configuration

### ⚠️ Customer Context Requirements
- Document must have valid customer relationship
- Uses customer-specific discount structures and agreements
- May apply customer group discounts or special rates
- Ensure customer discount data is current and accessible

### ⚠️ Line-Level Impact
- Recalculates discounts for all lines in the sales document
- Updates discount amounts, percentages, and extended amounts
- May affect line totals and document grand total
- Changes impact revenue recognition and profit calculations

### ⚠️ Volume and Quantity Considerations
- Volume discounts are recalculated based on current quantities
- Quantity breaks and tier pricing are re-evaluated
- Mixed item discounts may be adjusted
- Ensure quantities are accurate before discount recalculation

### ⚠️ Promotional Discount Application
- Active promotions and special offers are applied
- Time-sensitive discounts use current date for validation
- Promotional rules may override standard discount structures
- Consider promotional calendar when executing

### ⚠️ Business Process Impact
- May change document totals and profitability
- Could affect approved sales order pricing
- Consider impact on customer expectations and agreements
- Document changes for audit and approval purposes

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EARecalcSalesDocDiscounts`

**Document Type:** Sales Documents Only

**Calculation Scope:** Discounts only (prices unchanged)


</div>

