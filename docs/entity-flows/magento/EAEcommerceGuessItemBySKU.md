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

**Module:** magento

**Full Class Name:** `com.namasoft.modules.magento.utils.EAEcommerceGuessItemBySKU`


</div>

