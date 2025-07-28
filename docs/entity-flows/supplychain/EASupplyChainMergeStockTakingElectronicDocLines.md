---
title: EASupplyChainMergeStockTakingElectronicDocLines
module: supplychain
---


<div class='entity-flows'>

# EASupplyChainMergeStockTakingElectronicDocLines

**This document was generated using Claude.ai**

## Overview

Consolidates duplicate lines in electronic stock taking documents by merging lines with identical properties (item code, date, lot, serial numbers, etc.) and combining their quantities. Eliminates redundant entries that have the same tracking attributes, creating a cleaner and more accurate stock taking document.

## When This Action Runs

Manual execution on electronic stock taking documents when duplicate or similar lines need to be consolidated, typically used after importing data from multiple sources, combining partial counts, or cleaning up stock taking documents before final processing.

## How It Works

1. **Scans document lines** - Iterates through all stock taking electronic lines in the document
2. **Compares line properties** - For each line, checks all subsequent lines for identical properties
3. **Identifies matches** - Lines are considered identical if their propertiesAsText() values match exactly
4. **Merges quantities** - Adds the quantity from duplicate lines to the first matching line
5. **Removes duplicates** - Deletes the duplicate lines after merging their quantities
6. **Continues processing** - Repeats for all lines until no duplicates remain
7. **Returns success** - Processing completes successfully with consolidated lines

## Parameters

This action does not require any parameters.

## Database Tables Affected

- **StockTakingElectronicLine** - Consolidates duplicate lines and updates quantities
- **Stock Taking Data** - Modifies line structure by removing duplicates and merging quantities

## Important Warnings

### ⚠️ Electronic Stock Taking Document Type
- Only works on StockTakingElectronic document types
- Specifically designed for electronic stock taking processes
- Manual stock taking documents may require different consolidation approaches
- Ensure document type compatibility before processing

### ⚠️ Property Matching Logic
- **Lines are merged based on exact property text matches**
- All tracking attributes must match exactly for consolidation
- Includes item code, date, lot ID, serial numbers, and other dimensions
- Minor differences in properties prevent consolidation

### ⚠️ Quantity Aggregation
- Quantities from duplicate lines are summed together
- Zero or null quantities are handled gracefully during addition
- Large quantity consolidations may affect stock taking accuracy
- Review consolidated quantities for reasonableness

### ⚠️ Line Removal Impact
- **Duplicate lines are permanently removed from the document**
- Only the first occurrence of matching lines is retained
- Line order affects which line survives the consolidation
- Original line sequence and numbering may be altered

### ⚠️ Property Text Comparison
- Uses propertiesAsText() method for exact string comparison
- All relevant line properties are included in the comparison
- Property formatting and precision affect matching
- Ensure consistent data formats for proper consolidation

### ⚠️ Stock Taking Accuracy
- Consolidation affects final stock count accuracy
- Multiple counts of the same item/lot are combined
- May mask discrepancies between different counting sessions
- Consider whether consolidation aligns with stock taking procedures

### ⚠️ Audit Trail Implications
- Removes duplicate lines that may represent separate counting events
- Original counting source information may be lost
- Consolidation may affect stock taking audit requirements
- Consider audit trail needs before processing

### ⚠️ Document State Changes
- Modifies document structure by removing lines
- Changes may affect document approval and validation processes
- Document line counts will be reduced after processing
- Ensure document state allows for structural modifications

### ⚠️ Serial Number and Lot Consolidation
- Lines with identical serial numbers and lots are merged
- May combine counts from different counting sessions or locations
- Serial number tracking accuracy depends on proper line matching
- Review serial and lot data integrity after consolidation

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EASupplyChainMergeStockTakingElectronicDocLines`

**Document Type:** Electronic Stock Taking Documents

**Related Actions:**
- Stock taking processing entity flows
- Document line consolidation utilities
- Inventory counting management actions


</div>

