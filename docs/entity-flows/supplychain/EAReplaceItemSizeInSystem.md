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

## Important Warnings

### ⚠️ System-Wide Impact
- Updates ALL supply chain document tables simultaneously
- Changes affect historical data and audit trails
- Cannot be easily reversed once executed

### ⚠️ Size Standardization Impact
- Ensures consistent size tracking across all document types
- Changes affect inventory categorization and customer fulfillment
- Verify size codes match business standards before mass updates

### ⚠️ Data Validation Requirements
- Item, old value, and new value arrays must have equal sizes
- Mismatched array sizes cause processing failure with detailed error message
- All three field paths must return consistent data structures

### ⚠️ Transaction Processing
- Each table updated in separate transactions
- Individual table failures don't affect other updates
- Partial success possible if some tables fail

### ⚠️ Progress Tracking and Cancellation
- Provides progress updates through NaMaContext
- Can be cancelled during processing via task kill mechanism
- Cancellation throws exception and stops processing

### ⚠️ Inventory Effect Regeneration
- Automatically regenerates inventory transaction requests by default
- Uses web service calls to update inventory effects
- Can be disabled via parameter 7 for performance reasons

### ⚠️ Current Document Handling
- May skip updating current document to avoid database locks
- Parameter 4 controls whether current document is updated
- Locking conflicts possible if current document is included

### ⚠️ Empty Value Processing
- Separate parameters control handling of empty old and new values
- Default behavior skips empty values to prevent unintended changes
- Consider business impact of processing empty values

### ⚠️ Field Path Dependencies
- Uses reflection to extract values from document structure
- Invalid field paths cause processing failures
- Field paths must exist on all document lines

### ⚠️ Apparel and Fashion Industry Impact
- Critical for clothing, footwear, and fashion industries
- Size changes may affect customer orders and inventory matching
- Verify size standards (S/M/L, numeric, etc.) before executing updates

### ⚠️ Database Performance Impact
- Updates potentially large numbers of records across multiple tables
- Each item/value combination triggers multiple update queries
- Consider database performance during large-scale updates

### ⚠️ ItemLot Special Handling
- Uses different field mapping (invItem_id instead of item_id)
- Lot tracking records handled separately from document lines
- Ensure lot data consistency with document updates

### ⚠️ Duplicate Prevention
- Automatically removes duplicate item/value combinations
- Reduces unnecessary database operations
- May mask data consistency issues in source document

### ⚠️ Entity Class Filtering
- Only processes classes annotated with @Entity
- Abstract classes automatically excluded from processing
- Missing entity annotations may cause incomplete updates

### ⚠️ Query Construction
- Dynamically builds update and select queries for each table
- Query structure depends on table class characteristics
- Complex table structures may require manual verification

### ⚠️ Web Service Dependencies
- Inventory effect regeneration depends on utility web service availability
- Service failures may leave inventory effects inconsistent
- Monitor service availability during processing

### ⚠️ Manufacturing and Production Impact
- Size changes may affect production planning and material requirements
- Consider impact on work orders and assembly processes
- Coordinate with manufacturing teams before updates

### ⚠️ Customer Order Fulfillment
- Size changes may affect pending customer orders
- Critical for proper order fulfillment and customer satisfaction
- Review outstanding orders before executing updates

### ⚠️ Inventory Allocation
- Size changes affect inventory availability calculations
- May impact stock allocation and reservation systems
- Consider impact on warehouse operations and picking

### ⚠️ Size Chart Consistency
- Ensure size updates align with published size charts
- Changes may affect customer sizing expectations
- Coordinate with marketing and customer service teams

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.plugnplay.EAReplaceItemSizeInSystem`

**Related Actions:**
- [EAReplaceItemBoxInSystem](EAReplaceItemBoxInSystem.md)
- [EAReplaceItemColorInSystem](EAReplaceItemColorInSystem.md)


</div>