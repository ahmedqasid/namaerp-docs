---
title: EAAutoGroupCloneItemFromPO
module: supplychain
---


<div class='entity-flows'>

# EAAutoGroupCloneItemFromPO

**This document was generated using Claude.ai**

## Overview

Converts multi-quantity document lines into individual single-quantity lines by creating separate line entries and unique item codes for each quantity unit. For each line with quantity greater than 1, creates multiple individual lines each with quantity 1, and generates new unique item codes for the cloned items.

## When This Action Runs

Manual execution when purchase orders or other supply chain documents need to be converted from grouped quantities to individual item tracking. Typically used when items require individual serial numbers, unique identification, or separate processing for each unit.

## How It Works

1. **Processes lines in reverse order** - Iterates through document lines from bottom to top
2. **Identifies multi-quantity lines** - Finds lines with quantity greater than 1
3. **Reduces original quantity** - Sets original line quantity to 1
4. **Creates individual lines** - Clones the original line for each additional quantity unit
5. **Generates unique items** - Creates new item master records for each cloned line
6. **Assigns unique codes** - Generates new item codes using "ABCEDFG" prefix + item ID
7. **Updates document calculations** - Recalculates totals and fields after line modifications

## Parameters

This action does not require parameters - it works automatically based on document line quantities.

## Database Tables Affected

- **Document Lines** - Creates multiple new lines from single multi-quantity lines
- **InvItem** - Creates new item master records for each cloned line
- **Document Header** - Updates calculated fields and totals

## Important Warnings

### ⚠️ Item Master Creation
- Creates new item master records for every cloned line
- New items use generated codes with "ABCEDFG" prefix
- May create large numbers of new items quickly

### ⚠️ Item Code Generation
- Uses hardcoded "ABCEDFG" prefix for all new item codes
- Item codes are not business-meaningful or searchable
- Generated codes: "ABCEDFG" + hexadecimal item ID

### ⚠️ Inventory Management Impact
- Each cloned line becomes separate inventory item
- Affects inventory counting and stock management
- May complicate inventory reconciliation

### ⚠️ Document Line Explosion
- Single line with quantity 10 becomes 10 separate lines
- Document may become very long with many lines
- Performance impact on document processing

### ⚠️ Alternative Item Code Clearing
- Clears alternative item codes (altCode) on new items
- May break existing item cross-references
- Consider impact on barcode scanning and lookups

### ⚠️ Item Name Clearing
- Clears item names (ItemName1, ItemName2) on cloned lines
- New items will have empty descriptions
- May affect reporting and identification

### ⚠️ Database Performance
- Creates and commits new item records during processing
- Uses database flush operations between item creation
- Large quantities may impact database performance

### ⚠️ Transaction Processing
- Uses accumulating result pattern for error collection
- Item creation failures may prevent line cloning
- Document calculation updates may fail if line cloning succeeds

### ⚠️ Reverse Processing Order
- Processes lines from end to beginning of document
- Line insertion order may affect document appearance
- Original line order is not preserved

### ⚠️ Quantity Validation
- Only processes lines with integer quantities greater than 1
- Fractional quantities are ignored
- Zero or negative quantities are skipped

### ⚠️ Item Cloning Deep Copy
- Uses XML serialization for line cloning
- Creates complete copies of all line data
- May copy unwanted calculated fields or references

### ⚠️ Unique ID Assignment
- Assigns random unique IDs to cloned lines
- Ensures database integrity but breaks line relationships
- Original line references are lost

### ⚠️ Document Calculation Updates
- Triggers document-wide field recalculation after cloning
- May cause unexpected changes to totals and calculated fields
- Business rules may be re-evaluated

### ⚠️ Manufacturing Impact
- Separate lines may affect production planning
- Bill of materials calculations may be impacted
- Consider impact on assembly and kitting operations

### ⚠️ Purchasing Workflow
- Changes purchase order structure significantly
- May affect vendor relationships and pricing
- Consider impact on receiving and matching processes

### ⚠️ Reporting Implications
- Line-based reports will show individual entries
- Quantity-based reports may need adjustment
- Consider impact on business intelligence and analytics

### ⚠️ Item Master Maintenance
- Creates many similar items that require ongoing maintenance
- Item updates must be applied to all cloned items
- Consider long-term item master management

### ⚠️ Cost Tracking
- Each cloned item may have different cost tracking
- Unit costs are preserved but total costs multiply
- May affect costing and profitability analysis

### ⚠️ Serial Number Implications
- Enables individual serial number tracking per line
- May be required for regulated or high-value items
- Consider impact on warranty and traceability

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EAAutoGroupCloneItemFromPO`


</div>

