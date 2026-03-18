---
title: EACollectByItemDimension
module: supplychain
---


<div class='entity-flows'>

# EACollectByItemDimension

**This document was generated using Claude.ai**

## Overview

Automatically fills empty dimension fields (lot ID, box, or revision ID) in document lines by collecting from available inventory quantities in the ItemDimensionsQty table. Splits lines when partial quantities are available from different dimension values.

## When This Action Runs

Manual execution when document lines need automatic assignment of tracking dimensions from available inventory, typically during order fulfillment or inventory allocation processes.

## How It Works

1. **Identifies empty dimensions** - Finds lines missing the specified dimension value
2. **Searches available inventory** - Queries ItemDimensionsQty for matching items with positive quantities
3. **Assigns dimensions** - Fills empty dimension fields from available inventory records
4. **Splits lines if needed** - When available quantity is less than line quantity, splits the line
5. **Processes in order** - Uses specified ordering to prioritize dimension assignment (e.g., FIFO)

## Parameters

**Parameter 1:** Property Name (Required) - Dimension to collect: `lotId`, `box`, or `revisionId`

**Parameter 2:** Order By Field (Optional) - Sort available quantities by this field (defaults to Parameter 1)

## Database Tables Affected

- **ItemDimensionsQty** - Reads available inventory quantities by dimension
- **Document Lines** - Updates dimension values and may create new split lines
- **Item Configuration** - Checks tracking requirements for dimensions

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EACollectByItemDimension`


</div>

