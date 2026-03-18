---
title: EASalesRecalculateFreeAndRelatedItems
module: magento
---


<div class='entity-flows'>

# EASalesRecalculateFreeAndRelatedItems

**This document was generated using Claude.ai**

## Overview

Recalculates sales documents by updating unit prices, discounts, and free/related item promotions. This is a Magento-specific wrapper around the core supply chain recalculation functionality, providing the same capabilities within the e-commerce context.

## When This Action Runs

Manual execution on sales documents when pricing, discounts, or promotional items need to be recalculated. Typically used after changes to pricing rules, promotional campaigns, or when synchronizing e-commerce orders with updated business rules.

## How It Works

This class extends the core supply chain recalculation functionality:
- Inherits all behavior from `com.namasoft.modules.supplychain.domain.utils.plugnplay.EASalesRecalculateFreeAndRelatedItems`
- Provides the same recalculation logic within the Magento module context
- Enables e-commerce specific customizations if needed in the future

The underlying functionality:
1. **Recalculates unit prices** - Updates item prices based on current price lists and rules
2. **Recalculates discounts** - Applies current discount rules and promotional pricing
3. **Processes free items** - Handles promotional free items and related item offers
4. **Updates totals** - Recalculates document totals after all changes

## Parameters

**Parameter 1:** Recalc Unit Price (Optional) - true/false to recalculate unit prices (default: true)

**Parameter 2:** Recalc Discounts (Optional) - true/false to recalculate discounts (default: true)

**Parameter 3:** Recalc Free and Related Items (Optional) - true/false to recalculate promotional items (default: true)

**Module:** magento

**Full Class Name:** `com.namasoft.modules.magento.utils.EASalesRecalculateFreeAndRelatedItems`

**Parent Class:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EASalesRecalculateFreeAndRelatedItems`


</div>