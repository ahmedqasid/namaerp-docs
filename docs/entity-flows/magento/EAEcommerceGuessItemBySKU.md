---
title: EAEcommerceGuessItemBySKU
module: magento
---


<div class='entity-flows'>

# EAEcommerceGuessItemBySKU

**This document was generated using Claude.ai**

## Overview

Automatically resolves inventory items in sales documents using SKU lookups from Magento integration. Matches SKU codes from sales document lines to items configured in Magento item linkers, filling in missing item references and copying related properties.

## When This Action Runs

Manual execution on sales documents with incomplete item information. Typically used when processing e-commerce orders where only SKU codes are available and need to be resolved to actual inventory items.

## How It Works

1. **Validates site code** - Finds the Magento site using the provided site code
2. **Checks document type** - Ensures the document is a sales document
3. **Processes each line** - Iterates through all document lines
4. **Skips resolved items** - Ignores lines that already have valid item references
5. **Extracts SKU** - Gets the SKU from the line's item code field
6. **Searches item dimensions** - Uses Magento linker utility to find matching items
7. **Updates item reference** - Sets the resolved item on the document line
8. **Copies properties** - Transfers additional item properties from dimensions to line

## Parameters

**Parameter 1:** Site Code (Required) - Code of the MagentoSite to search for SKU mappings

## Database Tables Affected

- **SalesDocument** - Reads and updates sales document lines (specific type varies)
- **BasicSCDocumentLine** - Updates item references and properties
- **MAGMagentoSite** - References the Magento site configuration (read-only)
- **MagentoItemLinker** - Searches for SKU to item mappings (read-only)

## Important Warnings

### ⚠️ Site Code Validation
- Site code must exist in MAGMagentoSite table
- Invalid site codes cause action to exit with failure result
- Verify site configuration before running

### ⚠️ Document Type Limitation
- Only works with SalesDocument types
- Other document types are silently ignored
- Check document type compatibility before use

### ⚠️ SKU Resolution Dependencies
- Requires properly configured MagentoItemLinker documents
- SKUs must be mapped to valid inventory items
- Missing mappings result in unresolved items with log messages

### ⚠️ Existing Item Preservation
- Skips lines that already have valid item references
- Uses fetchItem() to check for existing items
- Will not override existing item assignments

### ⚠️ SKU Source Field
- Reads SKU from line.item.itemCode field
- Empty or null item codes are skipped
- Ensure item codes contain valid SKU values

### ⚠️ Item Dimensions Lookup
- Uses MagentoItemLinkerUtil.findItemDimensionBySku()
- Searches across all configured item linkers for the site
- Performance depends on number of configured items

### ⚠️ Property Copying
- Automatically copies additional properties from item dimensions
- Uses EcommerceReaderUtils.copyItemPropertiesFromDimsToLine()
- May override existing line properties

### ⚠️ Logging Behavior
- Logs informational messages for unfound SKUs
- Does not fail the action for missing items
- Check logs to identify unresolved SKUs

### ⚠️ Quantity Context
- Uses line's prime quantity value in property copying
- Quantity may affect copied properties (e.g., pricing)
- Ensure quantity is properly set before running

### ⚠️ Batch Processing
- Processes all lines in the document
- Partial success possible if some SKUs resolve and others don't
- Review all lines after processing

### ⚠️ Integration Dependencies
- Requires Magento module and integration utilities
- Depends on proper linker configuration
- May not work if integration is not properly set up

**Module:** magento

**Full Class Name:** `com.namasoft.modules.magento.utils.EAEcommerceGuessItemBySKU`


</div>

