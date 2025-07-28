---
title: EASalesRecalculateFreeAndRelatedItems
module: supplychain
---


<div class='entity-flows'>

# EASalesRecalculateFreeAndRelatedItems

**This document was generated using Claude.ai**

## Overview

Recalculates pricing information for sales documents including unit prices, discounts, free items, and related items. Triggers the built-in recalculation engine to refresh all sales line calculations based on current pricing rules, discount configurations, and promotional items setup.

## When This Action Runs

Manual execution when sales document pricing needs to be refreshed, typically after changes to pricing rules, discount structures, promotional campaigns, or when sales lines appear to have incorrect calculations that need to be rebuilt from current system configuration.

## How It Works

1. **Fetches sales lines** - Gets all sales lines from the sales document
2. **Applies recalculation** - Calls the document's recalculatePricesAndDiscounts method with specified options:
   - Unit price recalculation based on current price lists
   - Discount recalculation using current discount rules
   - Free and related items recalculation from promotional setup
3. **Updates document** - All calculations are applied directly to the sales lines
4. **Returns success** - Always returns successful result after processing

## Parameters

**Parameter 1:** Recalc Unit Price (Optional) - true/false to recalculate unit prices (default: true)

**Parameter 2:** Recalc Discounts (Optional) - true/false to recalculate discounts (default: true)

**Parameter 3:** Recalc Free and Related Items (Optional) - true/false to recalculate promotional items (default: true)

## Database Tables Affected

- **Sales Document Lines** - Updates pricing, discount, and promotional item information
- **Item Pricing Data** - Reads current price lists and pricing rules (read-only)
- **Discount Configuration** - Reads current discount rules and structures (read-only)
- **Promotional Setup** - Reads free item and related item configurations (read-only)

## Important Warnings

### ⚠️ Sales Document Type Requirements
- Only works on SalesDocument types (sales orders, invoices, quotes)
- Document must have valid sales lines for processing
- Requires access to current pricing and discount configuration
- Non-sales documents will not be processed correctly

### ⚠️ Pricing Recalculation Impact
- **Unit prices are completely recalculated** from current price lists
- Previous manual price adjustments may be overwritten
- Custom pricing entered by users will be lost
- Consider impact on negotiated prices and special agreements

### ⚠️ Discount Recalculation Effects
- All discount calculations are refreshed from current rules
- Manual discount adjustments may be overwritten
- Customer-specific discount agreements are reapplied
- Line-level and document-level discounts may change

### ⚠️ Free and Related Items Processing
- Free items are recalculated based on current promotional rules
- Related items (cross-sell, upsell) are processed according to current setup
- Previous promotional items may be removed if rules have changed
- New promotional items may be added based on current line items

### ⚠️ System Configuration Dependencies
- Requires valid price list configuration for all items
- Depends on current discount rule setup
- Uses current promotional item configuration
- May fail if pricing or promotional data is incomplete

### ⚠️ Document State Considerations
- Best used on draft or editable documents
- May not work correctly on approved or locked documents
- Document status and workflow state may affect recalculation
- Consider document approval requirements after changes

### ⚠️ Performance and Processing Time
- Processing time depends on number of sales lines
- Complex pricing rules may slow down calculations
- Large documents with many promotional items take longer
- Monitor system performance during bulk recalculations

### ⚠️ Customer and Business Impact
- Price changes may affect customer agreements and expectations
- Discount changes impact document totals and profitability
- Free item changes affect inventory allocation and availability
- Consider customer communication needs for significant changes

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EASalesRecalculateFreeAndRelatedItems`

**Document Type:** Sales Documents (Orders, Invoices, Quotes)

**Related Actions:**
- Pricing recalculation utilities in sales module
- Discount calculation engines
- Promotional item management actions


</div>

