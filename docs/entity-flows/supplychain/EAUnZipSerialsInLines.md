---
title: EAUnZipSerialsInLines
module: supplychain
---


<div class='entity-flows'>

# EAUnZipSerialsInLines

**This document was generated using Claude.ai**

## Overview

Expands document lines containing multiple serial numbers into individual lines with one serial number each. Takes lines with quantity greater than 1 and multiple serial numbers, then creates separate document lines for each serial number with quantity 1, enabling individual tracking and processing of serialized items.

## When This Action Runs

Manual execution on supply chain documents containing serialized items with multiple serial numbers per line, typically used when individual serial number tracking is required for processing, shipping, or inventory management purposes.

## How It Works

1. **Scans document lines** - Iterates through all document lines in reverse order (to handle insertions)
2. **Identifies serialized items** - Finds lines with:
   - Valid items that have serial number tracking enabled (hasSerial = true)
   - Quantity greater than 1
   - Serial numbers that can be "unzipped" into individual serials
3. **Validates serial counts** - Ensures the number of serial numbers matches the line quantity
4. **Processes second serials** - Handles secondary serial numbers if present and validates count consistency
5. **Creates individual lines** - For each serial number:
   - Clones the original line
   - Sets quantity to 1
   - Assigns individual serial number
   - Assigns secondary serial number if applicable
   - Generates new unique line ID
6. **Inserts new lines** - Adds the individual serial lines to the document
7. **Updates original line** - Modifies the first line to have quantity 1 with the first serial number

## Parameters

This action does not require any parameters.

## Database Tables Affected

- **BasicSCDocumentLine** - Creates multiple new lines and modifies original line quantities
- **Serial Number Data** - Assigns individual serial numbers to separate lines
- **Item Dimensions** - Updates serial number dimensions for each line

## Important Warnings

### ⚠️ Serialized Item Requirements
- **Only processes items with hasSerial = true**
- Items must have valid serial number tracking configuration
- Non-serialized items are not affected by this action
- Ensure items are properly configured for serial tracking

### ⚠️ Quantity and Serial Validation
- Line quantity must exactly match the number of serial numbers
- Processing skips lines where serial count doesn't match quantity
- Lines with quantity 1 or less are not processed
- Ensure accurate serial number entry before processing

### ⚠️ Document Line Expansion
- **Creates multiple new lines from single lines with multiple serials**
- Document line count increases significantly
- Line numbering and sequence are affected
- Large quantities may create many new lines

### ⚠️ Serial Number Unzipping Logic
- Uses unZipSerials() method to extract individual serial numbers
- Serial numbers must be in a format that can be "unzipped" or parsed
- Invalid serial number formats prevent line processing
- Ensure consistent serial number formatting

### ⚠️ Secondary Serial Number Handling
- Processes secondary serial numbers when present
- Secondary serial count must match primary serial count
- Missing or mismatched secondary serials prevent processing
- Ensure consistent secondary serial number management

### ⚠️ Line Cloning and ID Management
- **Creates exact clones of original lines** with modified serials and quantities
- Each new line receives a unique ID
- All other line properties (pricing, dimensions, etc.) are preserved
- Cloning preserves all line-level data and relationships

### ⚠️ Processing Order Impact
- Processes lines in reverse order to handle line insertions properly
- Line insertion affects document structure during processing
- New lines are inserted immediately after the original line
- Final line order may differ from original sequence

### ⚠️ Inventory Tracking Implications
- Individual serial lines enable precise inventory tracking
- Each serial number can be tracked separately through the supply chain
- Inventory effects are distributed across individual serial lines
- Consider impact on inventory allocation and availability

### ⚠️ Document Performance
- Large numbers of serialized items may significantly increase document size
- Processing time increases with the number of serials to unzip
- System performance may be affected by expanded document structure
- Monitor performance with high-volume serialized transactions

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EAUnZipSerialsInLines`

**Document Type:** Supply Chain Documents with Serialized Items

**Related Actions:**
- Serial number management entity flows
- Item tracking utilities
- Document line processing actions


</div>

