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

## Database Tables Affected

- **Sales Document Lines** - Updates pricing, discounts, and quantities
- **Free Item Lines** - Adds, removes, or updates promotional items
- **Document Totals** - Recalculates header totals and taxes
- **Pricing Rules** - References current pricing and discount rules (read-only)

## Important Warnings

### ⚠️ Inheritance Structure
- This class is a wrapper around the core supply chain functionality
- All actual logic resides in the parent class
- Magento-specific behavior can be added by overriding parent methods

### ⚠️ Core Functionality Reference
- For detailed functionality, refer to the parent class documentation
- Parameter behavior and processing logic inherited from supply chain module
- Business rules and calculations follow supply chain standards

### ⚠️ Recalculation Impact
- May significantly change document totals and line amounts
- Free items may be added, removed, or quantity adjusted
- Consider impact on committed or processed orders

### ⚠️ Parameter Defaults
- All parameters default to true if not specified
- Empty or null parameters trigger full recalculation
- Use false values to skip specific recalculation types

### ⚠️ E-commerce Context
- Designed for use within Magento module workflows
- May interact with e-commerce specific pricing rules
- Consider impact on order synchronization with Magento

### ⚠️ Promotional Logic
- Free and related items depend on configured promotion rules
- Rules may have date ranges, quantity thresholds, or customer restrictions
- Invalid or expired promotions may cause items to be removed

### ⚠️ Pricing Dependencies
- Unit price recalculation depends on active price lists
- Customer-specific pricing rules may apply
- Missing price data may cause calculation failures

### ⚠️ Document State
- Works on sales documents in various states
- May not be appropriate for locked or finalized documents
- Consider document workflow restrictions

### ⚠️ Performance Considerations
- Recalculation can be intensive for large documents
- Multiple rule evaluations per line item
- Consider impact on system performance for bulk operations

### ⚠️ Business Rule Consistency
- Ensures pricing and promotions align with current business rules
- May override manually entered pricing or discounts
- Consider implications for special pricing arrangements

**Module:** magento

**Full Class Name:** `com.namasoft.modules.magento.utils.EASalesRecalculateFreeAndRelatedItems`

**Parent Class:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EASalesRecalculateFreeAndRelatedItems`


</div>

