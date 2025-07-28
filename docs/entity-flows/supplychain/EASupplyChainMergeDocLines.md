---
title: EASupplyChainMergeDocLines
module: supplychain
---


<div class='entity-flows'>

# EASupplyChainMergeDocLines

**This document was generated using Claude.ai**

## Overview

Consolidates multiple document lines containing the same item into single lines by merging quantities and combining similar items. Uses configurable dimension criteria to determine which lines should be merged, allowing for flexible consolidation based on inventory dimensions like size, color, lot, warehouse, and other tracking attributes.

## When This Action Runs

Manual execution on supply chain documents when line consolidation is needed, typically used to simplify documents with multiple lines of the same item, reduce document complexity, or prepare documents for processing systems that prefer consolidated line items.

## How It Works

1. **Creates merge options** - Builds StockDockInInvoiceCollectionOptions from parameters
2. **Copies document lines** - Creates a working copy of all document lines
3. **Applies merge logic** - Uses SCDocFromDocCopier.mergeLines() to consolidate similar lines
4. **Determines similarity** - Lines are considered mergeable if they have:
   - Same item
   - Matching dimensions (based on parameter settings)
   - Compatible attributes for consolidation
5. **Combines quantities** - Merges quantities from multiple lines into single consolidated lines
6. **Replaces document lines** - Clears original lines and replaces with merged results
7. **Returns success** - Processing always succeeds unless system errors occur

## Parameters

**Parameter 1:** doNotConsiderSize (Optional) - true/false to ignore size when merging (default: false)

**Parameter 2:** doNotConsiderColor (Optional) - true/false to ignore color when merging (default: false)

**Parameter 3:** doNotConsiderRevisionId (Optional) - true/false to ignore revision when merging (default: false)

**Parameter 4:** doNotConsiderBox (Optional) - true/false to ignore box when merging (default: false)

**Parameter 5:** doNotConsiderLotId (Optional) - true/false to ignore lot ID when merging (default: false)

**Parameter 6:** doNotConsiderWarehouse (Optional) - true/false to ignore warehouse when merging (default: false)

**Parameter 7:** doNotConsiderMeasures (Optional) - true/false to ignore measurements when merging (default: false)

**Parameter 8:** doNotConsiderSerial (Optional) - true/false to ignore serial numbers when merging (default: false)

**Parameter 9:** doNotConsiderLocator (Optional) - true/false to ignore locator when merging (default: false)

## Database Tables Affected

- **BasicSCDocumentLine** - Replaces existing lines with merged consolidations
- **Item Dimensions** - Merges dimension data according to parameter settings
- **Inventory Tracking** - Consolidates tracking information based on merge criteria

## Important Warnings

### ⚠️ Document Line Replacement
- **All existing document lines are replaced** with merged results
- Original line structure and numbering are lost
- Line-specific data may be consolidated or lost during merging
- Consider backing up document before processing

### ⚠️ Dimension Consolidation Logic
- Merge criteria are based on selected dimension parameters
- Setting dimension parameters to "true" ignores those dimensions during merging
- Different dimension combinations produce different merge results
- Carefully select dimensions to avoid unintended consolidations

### ⚠️ Quantity Aggregation Impact
- Multiple line quantities are summed into consolidated lines
- Quantity precision and units of measure must be compatible
- Large quantity consolidations may exceed system limits
- Review consolidated quantities for accuracy

### ⚠️ Serial Number Considerations
- **Serial numbers may be lost or consolidated during merging**
- Individual serial tracking is reduced when doNotConsiderSerial = true
- Serialized items may require special handling
- Consider traceability requirements before merging serial-tracked items

### ⚠️ Lot and Batch Tracking
- Lot ID consolidation affects batch tracking and traceability
- Different lots may be merged if doNotConsiderLotId = true
- Expiration dates and batch attributes may be impacted
- Review lot tracking requirements before processing

### ⚠️ Warehouse and Location Management
- Warehouse consolidation affects inventory location tracking
- Items from different warehouses may be merged
- Locator information may be lost during consolidation
- Consider inventory management requirements

### ⚠️ Pricing and Cost Implications
- Line-level pricing may be averaged or consolidated
- Different unit prices for the same item may be merged
- Discount and pricing details may be lost
- Review pricing accuracy after line consolidation

### ⚠️ Document Complexity Reduction
- Merging reduces document line count and complexity
- Some detailed tracking information may be sacrificed
- Simplified documents may not capture all business details
- Balance simplification needs with information requirements

### ⚠️ System Performance Considerations
- Large documents with many mergeable lines benefit from consolidation
- Processing time depends on document size and merge complexity
- Merged documents may process faster in downstream systems
- Consider performance vs. detail trade-offs

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EASupplyChainMergeDocLines`

**Document Type:** Supply Chain Documents with Multiple Item Lines

**Related Actions:**
- Document line management entity flows
- Item consolidation utilities
- Inventory dimension processing actions


</div>

