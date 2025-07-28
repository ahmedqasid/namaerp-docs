---
title: EAImportItemsFromLongTextField
module: supplychain
---


<div class='entity-flows'>

# EAImportItemsFromLongTextField

**This document was generated using Claude.ai**

## Overview

Imports items into a supply chain document by parsing item codes from a long text field. Reads item codes separated by line breaks, looks up the corresponding items, and creates document lines with quantity 1 for each item. If an item already exists in the document, increments its quantity instead.

## When This Action Runs

Manual execution when bulk item entry is needed from a text list, typically for quick document creation from barcode scans, item lists, or when importing items from external sources that provide code lists.

## How It Works

1. **Reads source field** - Extracts text from specified field (defaults to remarks field)
2. **Parses item codes** - Splits text by line breaks to get individual item codes
3. **Clears existing lines** - Removes current document lines (reuses existing line objects)
4. **Processes each code** - Trims whitespace and skips empty lines
5. **Looks up items** - Finds InvItem records using business codes
6. **Creates/updates lines** - Adds new lines or increments quantity for existing items
7. **Sets default values** - Assigns quantity 1 and primary unit of measure

## Parameters

**Parameter 1:** Source Field Name (Optional) - Field containing item codes (default: "remarks")

The field should contain item codes separated by line breaks, for example:
```
ITEM001  
ITEM002
ITEM003
```

## Database Tables Affected

- **Document Lines** - Replaces existing lines with new lines based on item codes
- **InvItem** - Reads item master records using business codes (read-only)

## Important Warnings

### ⚠️ Document Line Replacement
- Completely replaces existing document lines with new ones
- Previous line data (quantities, prices, etc.) is lost
- Action cannot be undone - existing lines are permanently removed
- Consider saving document before running this action

### ⚠️ Item Code Validation
- Item codes must exist as business codes in InvItem master data
- Invalid item codes cause processing failures with error messages
- Processing stops on first invalid code - remaining codes are not processed
- Verify all codes exist before execution

### ⚠️ Text Format Requirements
- Item codes must be separated by line breaks (\n)
- Empty lines and whitespace are ignored
- No support for other delimiters (commas, semicolons, etc.)
- Ensure proper text formatting in source field

### ⚠️ Quantity and UOM Defaults
- All imported items get quantity 1 in primary unit of measure
- No support for specifying different quantities during import
- Manual adjustment needed after import for correct quantities
- UOM defaults to item's primary base unit

### ⚠️ Duplicate Item Handling
- If same item code appears multiple times, quantities are accumulated
- Final quantity equals number of occurrences in the text
- No validation of reasonable quantity limits
- Consider deduplicating source text if needed

### ⚠️ Field Access Requirements
- Source field must exist and be accessible on the document
- Field access uses direct reflection - field name must be exact
- Invalid field names cause processing failures
- Ensure field contains text data type

### ⚠️ Document State Impact
- Changes document structure immediately
- May affect document validation and business rules
- Consider document workflow state before execution
- Some document types may restrict line modifications

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EAImportItemsFromLongTextField`


</div>

