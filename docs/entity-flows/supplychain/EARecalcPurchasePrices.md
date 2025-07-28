---
title: EARecalcPurchasePrices
module: supplychain
---


<div class='entity-flows'>

# EARecalcPurchasePrices

**This document was generated using Claude.ai**

## Overview

Recalculates purchase prices for all lines in purchase documents by temporarily enabling price updates and triggering the standard purchase price recalculation logic. Updates unit prices, discounts, and related calculations based on current supplier pricing, purchase agreements, and system pricing rules.

## When This Action Runs

Manual execution on purchase documents when prices need to be refreshed with current supplier pricing information, typically after price list updates, supplier negotiations, or when purchase prices appear outdated.

## How It Works

1. **Initializes update scope** - Creates DiscountUpdateScope if not already present
2. **Saves current price update setting** - Preserves original updatePrice flag value
3. **Enables price updates** - Temporarily sets updatePrice to true to allow recalculation
4. **Triggers price recalculation** - Calls PurchasePriceUtils.updatePurchaseDocument() to recalculate all pricing
5. **Restores original setting** - Returns updatePrice flag to its previous state
6. **Maintains document consistency** - Ensures pricing updates don't affect other update behaviors

## Parameters

This action does not require any parameters - it automatically recalculates all purchase prices in the document.

## Database Tables Affected

- **Purchase Document Lines** - Updates unit prices, line totals, and discount calculations
- **Supplier Price Lists** - Reads current pricing information (read-only)
- **Purchase Agreements** - Uses contract pricing when applicable (read-only)
- **Item Master Data** - Reads standard purchase prices (read-only)

## Important Warnings

### ⚠️ Document Type Requirements
- Only works on PurchaseDocument types (purchase orders, receipts, invoices)
- Other document types are not supported
- Document must have proper supplier and line item relationships
- Requires access to current supplier pricing data

### ⚠️ Price Update Scope Management
- Temporarily modifies document's updatePrice setting
- Preserves original update scope configuration
- Changes are isolated to price recalculation only
- Other update flags (discounts, quantities) remain unchanged

### ⚠️ Pricing Logic Dependencies
- Uses PurchasePriceUtils for standard purchase price calculations
- Applies supplier-specific pricing and agreements
- May include volume discounts, contract prices, or promotional rates
- Pricing results depend on current supplier and system configuration

### ⚠️ Supplier Context Requirements
- Document must have valid supplier relationship
- Uses supplier-specific price lists and agreements
- May apply supplier payment terms and discount structures
- Ensure supplier pricing data is current and accessible

### ⚠️ Line-Level Impact
- Recalculates all lines in the purchase document
- Updates unit prices, extended amounts, and discount calculations
- May affect tax calculations and document totals
- Changes impact cost accounting and inventory valuation

### ⚠️ Business Process Considerations
- May change approved purchase order pricing
- Could affect budget compliance and approval workflows
- Consider impact on supplier relationships and agreements
- Document changes for audit and approval purposes

### ⚠️ Timing and Execution Context
- Best executed before document finalization
- Should run after supplier price updates
- Consider impact on pending approvals and workflows
- May require re-approval if document values change significantly

### ⚠️ Error Handling Pattern
- Uses accumulating result pattern for comprehensive error reporting
- Price calculation errors are collected and reported
- Transactional behavior ensures consistent document state
- Review all messages for complete issue resolution

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EARecalcPurchasePrices`

**Document Type:** Purchase Documents Only

**Related Utilities:** PurchasePriceUtils for price calculations


</div>

