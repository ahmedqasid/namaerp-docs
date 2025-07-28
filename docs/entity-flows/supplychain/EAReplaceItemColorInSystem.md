---
title: EAReplaceItemColorInSystem
module: supplychain
---


<div class='entity-flows'>

# EAReplaceItemColorInSystem

**This document was generated using Claude.ai**

## Overview

Performs system-wide replacement of item color values across all supply chain document tables. Updates color specifications for specific items from old values to new values throughout the entire database, ensuring consistency of color tracking across all historical and current transactions.

## When This Action Runs

Manual execution when item color specifications need to be corrected or updated system-wide. Typically used when color codes are found to be incorrect, when item color standards change, or during data cleanup operations to standardize color values across all documents.

## How It Works

1. **Extracts field values** - Reads item, old color, and new color values from document lines
2. **Validates data consistency** - Ensures equal number of items, old values, and new values
3. **Filters changes** - Skips lines where old and new values are the same or where handling flags prevent processing
4. **Updates all tables** - Executes update queries across all supply chain document line tables
5. **Handles current document** - Optionally updates the current document based on parameter setting
6. **Regenerates inventory effects** - Updates inventory transaction requests affected by the changes
7. **Provides progress tracking** - Shows progress through context updates during processing

## Parameters

**Parameter 1:** Item Field (Optional) - Field path to item reference (default: details.item.item)
**Parameter 2:** Old Value Field (Optional) - Field path to current color value (default: details.specificDimensions.color)
**Parameter 3:** New Value Field (Optional) - Field path to new color value (default: details.text1)
**Parameter 4:** Change Current Document Lines (Optional) - true/false to update current document
**Parameter 5:** Handle Lines Where Old Property Is Empty (Optional) - true/false to process empty old values
**Parameter 6:** Handle Lines Where NEW Property Is Empty (Optional) - true/false to process empty new values
**Parameter 7:** Do Not Regen Inventory Requests After Update (Optional) - true/false to skip inventory effect regeneration

## Database Tables Affected

- **All Supply Chain Document Line Tables** - Updates color values across all document types
- **EndStockTakingLine** - Updates color values in stock taking records
- **QtyTransLine** - References for inventory effect regeneration (read-only)
- **ItemLot** - Updates color values in lot tracking (uses different field mapping)

## Important Warnings

### ⚠️ System-Wide Impact
- Updates ALL supply chain document tables simultaneously
- Changes affect historical data and audit trails
- Cannot be easily reversed once executed

### ⚠️ Color Standardization Impact
- Ensures consistent color tracking across all document types
- Changes affect inventory categorization and reporting
- Verify color codes match business standards before mass updates

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

### ⚠️ Color Code Consistency
- Critical for fashion, textile, and manufacturing industries
- Color changes may affect customer orders and inventory matching
- Verify color standards before executing mass updates

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

### ⚠️ Manufacturing Integration
- Color changes may affect production planning and material requirements
- Consider impact on work orders and assembly processes
- Coordinate with manufacturing teams before updates

### ⚠️ Customer Order Impact
- Color changes may affect pending customer orders
- Consider impact on order fulfillment and customer commitments
- Review outstanding orders before executing updates

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.plugnplay.EAReplaceItemColorInSystem`

**Related Actions:**
- [EAReplaceItemSizeInSystem](EAReplaceItemSizeInSystem.md)
- [EAReplaceItemBoxInSystem](EAReplaceItemBoxInSystem.md)


</div>

