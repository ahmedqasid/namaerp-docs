---
title: EAReplaceItemBoxInSystem
module: supplychain
---


<div class='entity-flows'>

# EAReplaceItemBoxInSystem

**This document was generated using Claude.ai**

## Overview

Performs system-wide replacement of item box values across all supply chain document tables. Updates box dimensions for specific items from old values to new values throughout the entire database, ensuring consistency of box tracking across all historical and current transactions.

## When This Action Runs

Manual execution when item box specifications need to be corrected or updated system-wide. Typically used when box dimensions are found to be incorrect, when item packaging changes, or during data cleanup operations to standardize box values across all documents.

## How It Works

1. **Extracts field values** - Reads item, old box, and new box values from document lines
2. **Validates data consistency** - Ensures equal number of items, old values, and new values
3. **Filters changes** - Skips lines where old and new values are the same or where handling flags prevent processing
4. **Updates all tables** - Executes update queries across all supply chain document line tables
5. **Handles current document** - Optionally updates the current document based on parameter setting
6. **Regenerates inventory effects** - Updates inventory transaction requests affected by the changes
7. **Provides progress tracking** - Shows progress through context updates during processing

## Parameters

**Parameter 1:** Item Field (Optional) - Field path to item reference (default: details.item.item)

**Parameter 2:** Old Value Field (Optional) - Field path to current box value (default: details.specificDimensions.box)

**Parameter 3:** New Value Field (Optional) - Field path to new box value (default: details.text1)

**Parameter 4:** Change Current Document Lines (Optional) - true/false to update current document

**Parameter 5:** Handle Lines Where Old Property Is Empty (Optional) - true/false to process empty old values

**Parameter 6:** Handle Lines Where NEW Property Is Empty (Optional) - true/false to process empty new values

**Parameter 7:** Do Not Regen Inventory Requests After Update (Optional) - true/false to skip inventory effect regeneration

## Database Tables Affected

- **All Supply Chain Document Line Tables** - Updates box values across all document types
- **EndStockTakingLine** - Updates box values in stock taking records
- **QtyTransLine** - References for inventory effect regeneration (read-only)
- **ItemLot** - Updates box values in lot tracking (uses different field mapping)

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.plugnplay.EAReplaceItemBoxInSystem`

**Related Actions:**
- [EAReplaceItemSizeInSystem](EAReplaceItemSizeInSystem.md)
- [EAReplaceItemColorInSystem](EAReplaceItemColorInSystem.md)


</div>