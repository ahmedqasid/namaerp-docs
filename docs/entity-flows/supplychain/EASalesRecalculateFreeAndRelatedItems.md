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

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EASalesRecalculateFreeAndRelatedItems`

**Document Type:** Sales Documents (Orders, Invoices, Quotes)



</div>

