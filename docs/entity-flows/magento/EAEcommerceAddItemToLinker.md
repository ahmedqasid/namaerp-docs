---
title: EAEcommerceAddItemToLinker
module: magento
---


<div class='entity-flows'>

# EAEcommerceAddItemToLinker

**This document was generated using Claude.ai**

## Overview

Adds inventory items to Magento e-commerce integration linkers. Creates or updates MagentoItemLinker documents to establish connections between ERP inventory items and Magento site configurations, enabling product synchronization between systems.

## When This Action Runs

Manual execution on inventory items that need to be linked to Magento e-commerce sites. Typically used during product setup or when adding existing items to e-commerce integration workflows.

## How It Works

1. **Validates site code** - Finds the Magento site using the provided site code
2. **Searches existing linkers** - Looks for committed MagentoItemLinker documents for the site
3. **Checks for existing item** - Searches for the current item in existing linker documents
4. **Creates or updates linker** - Either creates new linker or uses the most recent one
5. **Adds item line** - Creates new MagentoItemLinkerLine with item and SKU information
6. **Applies field mappings** - Copies additional fields using the field mapping parameter
7. **Sets current line** - Marks the new/existing line as the current line for processing
8. **Commits changes** - Saves the linker document with the new item association

## Parameters

**Parameter 1:** Site Code (Required) - Code of the MagentoSite to link the item to
**Parameter 2:** Linker Line Fields Map (Optional) - Field mappings for additional data copying
**Parameter 3:** Linker File Code Template (Required) - Template for generating linker document codes

## Example Field Mapping

```
line.dimensions.box=name2
line.description=description
line.weight=weight
```

## Database Tables Affected

- **MagentoItemLinker** - Creates new or updates existing linker documents
- **MagentoItemLinkerLine** - Creates new line entries for items
- **MAGMagentoSite** - References the target Magento site (read-only)
- **InvItem** - Source inventory item being linked (read-only)

## Important Warnings

### ⚠️ Site Code Validation
- Site code must exist in MAGMagentoSite table
- Invalid site codes cause action failure with exception
- Verify site configuration before running

### ⚠️ Linker Document Management
- Uses the most recent (last) linker document for the site
- Creates new linker if none exist
- All items for a site may be grouped in same linker document

### ⚠️ Duplicate Item Handling
- Checks for existing item in all linkers for the site
- Updates existing line rather than creating duplicates
- Same item can only exist once per site

### ⚠️ SKU Assignment
- Automatically sets SKU to item code
- SKU is used for Magento product identification
- Ensure item codes are suitable as Magento SKUs

### ⚠️ Field Mapping Syntax
- Uses dot notation for nested field access
- Mapping format: target=source
- Invalid field names cause runtime errors

### ⚠️ Code Template Processing
- Uses template engine for dynamic code generation
- Common template: `{magentoSite.code}`
- Invalid templates may cause generation errors

### ⚠️ Current Line Setting
- Sets processed line as "current line" on linker
- May affect other processes that depend on current line
- Consider impact on existing workflows

### ⚠️ Document State Management
- Automatically starts editing mode on existing documents
- Commits changes after processing
- Failed edits prevent item addition

### ⚠️ Parameter Requirements
- Parameters 1 and 3 are required and validated
- Missing required parameters cause validation failure
- Parameter 2 is optional for field mapping

### ⚠️ Committed Documents Only
- Only searches committed linker documents
- Draft linkers are ignored in searches
- Ensure proper document state management

### ⚠️ Business Integration Impact
- Links items for e-commerce synchronization
- May trigger product exports to Magento
- Consider timing with e-commerce operations

**Module:** magento

**Full Class Name:** `com.namasoft.modules.magento.utils.EAEcommerceAddItemToLinker`


</div>

