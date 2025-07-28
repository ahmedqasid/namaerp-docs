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

## Important Warnings

### ⚠️ Document Type Requirements
- Only works on SalesDocument types (sales orders, quotations, invoices)
- Other document types are not supported
- Document must have valid customer and line item relationships
- Requires access to current pricing and discount data

### ⚠️ Complete Pricing Overhaul
- Both unit prices and discounts are completely recalculated
- All existing pricing and discount values may change
- Most comprehensive pricing update available
- Consider impact on approved documents and customer expectations

### ⚠️ Pricing and Discount Rule Dependencies
- Uses current active price lists and discount structures
- Applies customer-specific pricing and discount agreements
- May include volume pricing, promotional rates, and special pricing
- Results depend on current system configuration and rules

### ⚠️ Customer Context Requirements
- Document must have valid customer relationship
- Uses customer-specific price lists, discount agreements, and group settings
- May apply customer group pricing and discount structures
- Ensure all customer data is current and accessible

### ⚠️ Line-Level Impact
- Recalculates prices and discounts for all lines in the sales document
- Updates unit prices, discount amounts, percentages, and extended amounts
- May significantly affect line totals and document grand total
- Changes impact revenue recognition, profit margins, and financial reporting

### ⚠️ Volume and Quantity Considerations
- Volume discounts are recalculated based on current quantities
- Quantity breaks and tier pricing are re-evaluated for both prices and discounts
- Mixed item pricing and discount rules may be applied
- Ensure quantities are accurate before comprehensive recalculation

### ⚠️ Promotional and Special Pricing
- Active promotions and special offers are applied
- Time-sensitive pricing and discounts use current date for validation
- Promotional rules may override standard pricing and discount structures
- Consider promotional calendar and special agreements

### ⚠️ Business Process Impact
- May significantly change document totals and profitability
- Could affect approved sales orders and customer agreements
- May require re-approval if document values change substantially
- Consider impact on customer relationships and expectations
- Document all changes for audit and approval purposes

### ⚠️ Timing and Execution Context
- Best executed during off-peak hours due to comprehensive calculations
- Should run after both price and discount rule updates
- Consider impact on concurrent document operations
- May require coordination with sales and customer service teams

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EARecalcSalesDocUnitPricesAndDiscounts`

**Document Type:** Sales Documents Only

**Calculation Scope:** Complete pricing and discount recalculation


</div>

