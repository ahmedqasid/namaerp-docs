---
title: EACollectLot
module: supplychain
---


<div class='entity-flows'>

# EACollectLot

**This document was generated using Claude.ai**

## Overview

Automatically fills empty dimension fields (lot ID, box, size, color, revision, etc.) in document lines by collecting from available inventory quantities. Splits lines based on available quantities with specific dimension values from the ItemDimensionsQty table.

## When This Action Runs

Manual execution when document lines need dimension values populated from available inventory, typically during order fulfillment or inventory allocation where specific lots, colors, sizes, or revisions are required.

## How It Works

1. **Updates base quantities** - Recalculates base unit quantities for all lines
2. **Clears existing dimensions** - Optionally removes existing dimension values first
3. **Searches available inventory** - Queries ItemDimensionsQty for items with positive quantities and specific dimensions
4. **Splits lines by availability** - Creates multiple lines when quantities are available in different lots/dimensions
5. **Fills dimension values** - Populates lot ID, color, size, box, revision, warehouse, locator from inventory records
6. **Respects minimum quantities** - Skips quantities below the specified threshold

## Parameters

**Parameter 1:** Property Name (Optional) - Dimension to collect by
- Options: `lotId`, `box`, `size`, `color`, `revisionId`, `warehouse`, `locator`
- Default: `lotId`

**Parameter 2:** Clear Existing Data (Optional) - true/false to clear dimension values first
- Default: false

**Parameter 3:** Minimum Quantity (Optional) - Skip lines with quantity below this value
- Example: `10` to ignore lines with less than 10 units

## Database Tables Affected

- **ItemDimensionsQty** - Reads available inventory with dimension details
- **Document Lines** - Creates new split lines with assigned dimensions
- **ItemLot** - Reads lot-specific dates (production, expiry, retest)
- **Item Configuration** - Checks dimension tracking settings

## Important Warnings

### ⚠️ Line Splitting Behavior
- Original lines may be split into multiple lines with different dimensions
- Line count will increase after processing
- Each split line gets specific dimension values from available inventory

### ⚠️ Inventory Availability
- Only processes items with positive quantities in ItemDimensionsQty
- Respects warehouse and locator constraints from document header
- Considers expiry dates, production dates, and retest dates

### ⚠️ Dimension Assignment
- Automatically assigns lot ID, box, size, color, revision from available stock
- May assign different dimensions than expected based on availability
- Clears existing dimension values if requested

### ⚠️ Quantity Allocation
- Splits quantities based on available inventory with specific dimensions
- May create unsatisfied lines if insufficient inventory available
- Minimum quantity threshold prevents allocation of small amounts

### ⚠️ Performance Impact
- Searches ItemDimensionsQty table extensively for each line
- Large inventories with many dimension combinations may be slow
- Processes 50 records per page for performance optimization

### ⚠️ FIFO/LIFO Control
- Uses system configuration to determine allocation order
- May allocate oldest or newest stock first based on settings
- Consider impact on inventory rotation and expiry management

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EACollectLot`


</div>

