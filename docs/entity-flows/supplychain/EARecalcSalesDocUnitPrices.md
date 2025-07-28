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

## Important Warnings

### ⚠️ Document Type Requirements
- Only works on SalesDocument types (sales orders, quotations, invoices)
- Other document types are not supported
- Document must have valid customer and line item relationships
- Requires access to current pricing data and customer information

### ⚠️ Discount Preservation
- Existing discount amounts and percentages remain unchanged
- Focus is exclusively on unit price calculations
- Discount-related fields are not modified
- Maintains original discount structure while updating prices

### ⚠️ Pricing Rule Dependencies
- Uses current active price lists and structures
- Applies customer-specific pricing agreements
- May include volume pricing, promotional rates, or special pricing
- Price results depend on current system configuration

### ⚠️ Customer Context Requirements
- Document must have valid customer relationship
- Uses customer-specific price lists and agreements
- May apply customer group pricing or special rates
- Ensure customer pricing data is current and accessible

### ⚠️ Line-Level Impact
- Recalculates unit prices for all lines in the sales document
- Updates unit prices and extended amounts based on quantities
- May affect line totals and document grand total
- Changes impact revenue recognition and margin calculations

### ⚠️ Price List and Currency Context
- Uses document's currency for pricing calculations
- Applies exchange rates if multi-currency pricing is involved
- May result in different prices based on effective dates
- Ensure price lists are current and currency rates are accurate

### ⚠️ Promotional and Special Pricing
- Active promotional pricing is applied based on current date
- Special customer rates override standard price lists
- Time-sensitive pricing uses current date for validation
- Consider promotional calendar and special agreements

### ⚠️ Business Process Impact
- May change document totals and profitability margins
- Could affect approved sales order pricing
- Consider impact on customer expectations and agreements
- Document changes for audit and approval purposes

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EARecalcSalesDocUnitPrices`

**Document Type:** Sales Documents Only

**Calculation Scope:** Unit prices only (discounts unchanged)


</div>

