---
title: EACollectAlItem
module: supplychain
---


<div class='entity-flows'>

# EACollectAlItem

**This document was generated using Claude.ai**

## Overview

Automatically substitutes items in document lines with alternative items from the same category, class, section, or brand when the original item has insufficient stock. Splits lines to use multiple alternative items if needed to fulfill the full quantity requirement.

## When This Action Runs

Manual execution when documents need automatic item substitution to fulfill quantities from available alternatives, typically for sales orders or stock issues when primary items are out of stock.

## How It Works

1. **Waits for quantity processing** - Optionally waits for pending inventory transactions to complete
2. **Checks available quantity** - Calculates available stock for each line item at document date
3. **Searches for alternatives** - Finds items matching specified fields (category, class, etc.)
4. **Splits lines if needed** - Creates multiple lines using different items to fulfill total quantity
5. **Validates fulfillment** - Ensures full quantity can be satisfied or reports shortage

## Parameters

**Parameter 1:** Field IDs (Required) - CSV list of item fields to match for alternatives
Example: `itemClass1,itemClass4,category1,brand`

**Parameter 2:** Order By Field (Optional) - Sort alternatives by this field (e.g., `n1` for priority)

**Parameter 3:** Excluded Origin IDs Query (Optional) - SQL to exclude specific documents

```sql
select id from StockIssue where fromDoc_id = {id} 
union all select {id}
```

**Parameter 4:** Wait For Qty Processing (Optional) - true/false to wait for pending transactions (default: true)

## Database Tables Affected

- **InvItem** - Searches for alternative items based on matching fields
- **InvTransReq** - Checks pending transactions if wait enabled
- **Document Lines** - Modifies existing lines and creates new ones
- **Inventory Tables** - Calculates available quantities at date

## Important Warnings

### ⚠️ Field Validation
- Only specific item fields allowed: categories 1-5, classes 1-10, section, brand
- Invalid field IDs cause validation errors
- Field matching is exact - partial matches not supported

### ⚠️ Quantity Fulfillment
- If alternatives cannot fulfill total quantity, original line remains with error
- Removes lines with zero quantity after processing
- Uses item's primary UOM for availability calculations

### ⚠️ Alternative Selection
- Searches alternatives in order specified by priority field
- Stops searching once quantity fulfilled
- Each alternative checked for available stock before use

### ⚠️ Performance Impact
- Waiting for transactions adds 1.5 second delays in loop
- Large documents with many substitutions may be slow
- Multiple database queries per line item

### ⚠️ Inventory Calculations
- Considers both current stock and stock at document date
- Accounts for pending transactions from same origin
- UOM conversions applied when line UOM differs from primary

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EACollectAlItem`


</div>

