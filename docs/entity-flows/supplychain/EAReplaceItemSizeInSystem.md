---
title: EAReplaceItemSizeInSystem
module: supplychain
---


<div class='entity-flows'>

# EAReplaceItemSizeInSystem

**This document was generated using Claude.ai**

## Overview

Performs system-wide replacement of item size values across all supply chain document tables. Updates size specifications for specific items from old values to new values throughout the entire database, ensuring consistency of size tracking across all historical and current transactions.

## When This Action Runs

Manual execution when item size specifications need to be corrected or updated system-wide. Typically used when size codes are found to be incorrect, when item size standards change, or during data cleanup operations to standardize size values across all documents.

## How It Works

1. **Extracts field values** - Reads item, old size, and new size values from document lines
2. **Validates data consistency** - Ensures equal number of items, old values, and new values
3. **Filters changes** - Skips lines where old and new values are the same or where handling flags prevent processing
4. **Updates all tables** - Executes update queries across all supply chain document line tables
5. **Handles current document** - Optionally updates the current document based on parameter setting
6. **Regenerates inventory effects** - Updates inventory transaction requests affected by the changes
7. **Provides progress tracking** - Shows progress through context updates during processing

## Parameters

**Parameter 1:** Item Field (Optional) - Field path to item reference (default: details.item.item)

**Parameter 2:** Old Value Field (Optional) - Field path to current size value (default: details.specificDimensions.size)

**Parameter 3:** New Value Field (Optional) - Field path to new size value (default: details.text1)

**Parameter 4:** Change Current Document Lines (Optional) - true/false to update current document

**Parameter 5:** Handle Lines Where Old Property Is Empty (Optional) - true/false to process empty old values

**Parameter 6:** Handle Lines Where NEW Property Is Empty (Optional) - true/false to process empty new values

**Parameter 7:** Do Not Regen Inventory Requests After Update (Optional) - true/false to skip inventory effect regeneration

## Database Tables Affected

- **All Supply Chain Document Line Tables** - Updates size values across all document types
- **EndStockTakingLine** - Updates size values in stock taking records
- **QtyTransLine** - References for inventory effect regeneration (read-only)
- **ItemLot** - Updates size values in lot tracking (uses different field mapping)

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.plugnplay.EAReplaceItemSizeInSystem`

**Related Actions:**
- [EAReplaceItemBoxInSystem](EAReplaceItemBoxInSystem.md)
- [EAReplaceItemColorInSystem](EAReplaceItemColorInSystem.md)


</div>