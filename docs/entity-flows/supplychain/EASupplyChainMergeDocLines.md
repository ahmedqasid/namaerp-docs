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

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EASupplyChainMergeDocLines`

**Document Type:** Supply Chain Documents with Multiple Item Lines

**Related Actions:**
- Document line management entity flows
- Item consolidation utilities
- Inventory dimension processing actions


</div>

